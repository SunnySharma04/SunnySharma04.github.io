# Sunny Sharma Portfolio

A production-ready static portfolio for Sunny Sharma focused on software engineering, intelligent automation, cybersecurity, and DSA.

## Why this version is easy to use

- No npm install required.
- No framework or third-party runtime dependency.
- Works by opening `index.html` directly.
- Deploys to GitHub Pages, Netlify, Cloudflare Pages, or Vercel as a static site.
- Responsive navigation, project filters, project details dialog, active section highlighting, scroll animations, resume download, contact validation, copy-email, and accessibility support are included.

## Run locally

Option 1: double-click `index.html`.

Option 2 (recommended for browser security parity):

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy to GitHub Pages

1. Create a new GitHub repository, for example `sunny-portfolio`.
2. Upload all files from this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your main branch and `/ (root)`.
6. Save.

## Deploy to Vercel

1. Push this folder to GitHub.
2. In Vercel, choose **Add New → Project**.
3. Import the repository.
4. Framework preset: **Other**.
5. No build command is required.
6. Output directory: leave blank/root.
7. Deploy.

## Deploy to Netlify

Drag this folder into Netlify Drop, or import the GitHub repository. No build command is required.

## Resume

The working resume file is:

`resume/Sunny-Sharma-Resume.pdf`

All Download Resume buttons point to this file.

## Contact form

The contact form intentionally has no fake backend. It validates the fields and opens the visitor's email client with the subject and message pre-filled for `sunnysharma112004@gmail.com`.

If you later want silent form submission, replace this with Formspree, EmailJS, Netlify Forms, or a serverless endpoint.

## Before public launch

- Replace the placeholder domain in `sitemap.xml` after deployment.
- If you buy a custom domain, add a canonical URL and update Open Graph URLs.
- Keep project metrics factual and update only when verified.
