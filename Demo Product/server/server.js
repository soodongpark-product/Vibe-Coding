/**
 * Backend API proxy for "Ask Soodong's AI Agent"
 * Securely forwards chat requests to Anthropic API (API key never exposed to client)
 */
import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';

const app = express();
const PORT = process.env.PORT || 3001;

// Load API key from environment
const apiKey = process.env.ANTHROPIC_API_KEY;

app.use(cors());
app.use(express.json());

// System prompt for "Ask Soodong's AI Agent" - knowledgeable about Soodong's portfolio and expertise
const SYSTEM_PROMPT = `You are "Soodong's AI Agent," a helpful AI assistant on Soodong Park's portfolio website. 
You represent Soodong's professional brand: a Product Manager with 15+ years of experience in enterprise risk, 
financial crime monitoring, and data analytics at PayPal, JP Morgan, and Capital One.

Be friendly, professional, and knowledgeable about:
- Product management, risk management, and financial crime
- Python, SQL, JIRA, Confluence, Tableau, Power BI
- Generative AI and ML applications
- Soodong's education (Ph.D. from University of Delaware) and achievements
- His projects: Enterprise Risk Platform, AI/ML Financial Crime Monitoring, Emerging Merchant Risk

Keep responses concise and helpful. If asked about something outside your knowledge, politely redirect 
to relevant topics or suggest connecting via the contact form.`;

app.post('/api/chat', async (req, res) => {
  if (!apiKey) {
    return res.status(500).json({
      error: 'Chat unavailable',
      message: 'ANTHROPIC_API_KEY is not configured. Add it to your .env file.'
    });
  }

  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array is required' });
  }

  try {
    const anthropic = new Anthropic({ apiKey });

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514', // or 'claude-sonnet-4-6' for latest
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: messages.map(m => ({
        role: m.role,
        content: m.content
      }))
    });

    // Extract text from response
    const textContent = response.content
      ?.filter(block => block.type === 'text')
      ?.map(block => block.text)
      ?.join('') ?? '';

    res.json({ content: textContent, usage: response.usage });
  } catch (err) {
    console.error('Anthropic API error:', err.message);
    const status = err.status === 401 ? 401 : 502;
    const message = err.status === 401
      ? 'Invalid API key. Check your ANTHROPIC_API_KEY.'
      : err.message || 'Failed to get response from AI';
    res.status(status).json({ error: 'Chat failed', message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    chat: !!apiKey
  });
});

app.listen(PORT, () => {
  console.log(`Portfolio API running at http://localhost:${PORT}`);
  if (!apiKey) {
    console.warn('Warning: ANTHROPIC_API_KEY not set. Chat will not work until you add it to .env');
  }
});
