# Ask Soodong's AI Agent — Setup

Ask Soodong's AI Agent uses the **Anthropic API** (Claude) to answer questions about Soodong's portfolio, product management, risk, and related topics.

## Quick Start

1. **Get an Anthropic API key**  
   Sign up at [console.anthropic.com](https://console.anthropic.com/) and create an API key.

2. **Configure the server**
   ```bash
   cd server
   npm install
   ```
   Copy `.env.example` to `.env` and add your API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-your-key-here
   ```

3. **Run the backend**
   ```bash
   npm start
   ```
   The API runs at `http://localhost:3001`.

4. **Open the portfolio**  
   Open `index.html` in a browser (or serve it with a local server). Click the "Ask Soodong's AI Agent" button in the bottom-right corner to start chatting.

## Project Structure

```
Demo Product/
├── index.html       # Portfolio + chatbot UI
├── script.js        # Chat logic & API calls
├── styles.css       # Chat styles
└── server/
    ├── server.js    # Express proxy for Anthropic API
    ├── package.json
    └── .env.example # Template for ANTHROPIC_API_KEY
```

## Security

The API key is never sent to the browser. All chat requests go through your local `server/` backend, which calls Anthropic on your behalf.

**Important:** Do not commit `.env` or your API key to version control.
