# How to Publish Your Portfolio to the Web

Choose one of these **free** options (no installation required):

---

## Option 1: Netlify Drop (Easiest – ~2 minutes)

1. Go to **[https://app.netlify.com/drop](https://app.netlify.com/drop)**
2. Drag and drop your **entire "Demo Product" folder** onto the page
3. Netlify will upload and give you a live URL (e.g., `random-name-123.netlify.app`)
4. (Optional) Create a free Netlify account to claim the site and get a custom URL like `soodong-park.netlify.app`

---

## Option 2: Vercel

1. Go to **[https://vercel.com](https://vercel.com)** and sign up (free)
2. Click **"Add New"** → **"Project"**
3. You can drag your **Demo Product** folder, or connect a GitHub repo after you push your code
4. Vercel will give you a live URL (e.g., `demo-product-xxx.vercel.app`)

---

## Option 3: GitHub Pages (if you use GitHub)

1. Install [Git](https://git-scm.com/download/win) and [Node.js](https://nodejs.org/)
2. Create a GitHub account and a new repository
3. Push your project folder to the repo
4. In repo **Settings** → **Pages** → set source to main branch
5. Your site will be at `yourusername.github.io/repo-name`

---

## Important: Your Images Folder

Before publishing, ensure the **images** folder (with `Soodong_Pic.JPG`) is inside the **Demo Product** folder you upload. The folder structure should be:

```
Demo Product/
├── index.html
├── styles.css
├── script.js
├── images/
│   └── Soodong_Pic.JPG
└── ...
```
