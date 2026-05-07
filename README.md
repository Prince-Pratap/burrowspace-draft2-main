# BurrowSpace

This is the BurrowSpace frontend project built with TanStack React Start, Vite, and Tailwind.

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the dev server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Notes

- This app is currently set up as a Cloudflare Worker / SSR project using `wrangler.jsonc`.
- The contact and FAQ pages include fake backend behavior in the frontend.

## GitHub repository

Push this project to GitHub with:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/amanhospitaldev-ux/BurrowSpace.git
git push -u origin main
```

## Hosting

Use Cloudflare Workers for deployment, not the static Pages drag-and-drop uploader.

If you need help deploying, I can provide exact Cloudflare Worker deploy steps.
