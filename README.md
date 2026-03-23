# 🚀 LaunchifyX — React Frontend

Component-based React app. **Zero extra dependencies** — only `react`, `react-dom`, `react-scripts`.

---

## 📁 Structure

```
src/
├── App.jsx
├── index.js
├── styles/global.css
└── components/
    ├── Navbar.jsx
    ├── Hero.jsx
    ├── Ticker.jsx
    ├── Services.jsx
    ├── Pricing.jsx
    ├── Testimonials.jsx
    ├── Contact.jsx
    ├── Footer.jsx
    └── useReveal.js
```

---

## 🖥️ Run Locally

```bash
npm install
npm start
```

---

## 🐙 GitHub Upload (No node_modules needed!)

`node_modules` is in `.gitignore` — **never upload it**.

```bash
git init
git add .
git commit -m "Initial LaunchifyX commit"
git remote add origin https://github.com/YOUR_USERNAME/launchifyx.git
git push -u origin main
```

---

## ▲ Deploy on Vercel (Free)

1. Go to https://vercel.com → Sign in with GitHub
2. Click **"Add New Project"**
3. Import your **launchifyx** GitHub repo
4. Vercel auto-detects React → settings will be:
   - **Framework:** Create React App
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
5. Click **Deploy** ✅

Vercel runs `npm install` + `npm run build` automatically.
**You never need to upload node_modules.**

---

## ⚠️ Common Vercel Error Fixes

| Error | Fix |
|-------|-----|
| `Module not found` | Make sure all import paths use correct case |
| `react-scripts not found` | Vercel must install deps — check package.json has `react-scripts` in `dependencies` (not `devDependencies`) |
| Build fails | Check Vercel logs → Environment → set Node version to **18.x** |
