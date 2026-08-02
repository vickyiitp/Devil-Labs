# Devil Labs AI Website OS — Admin Panel Access & Management Guide

The Devil Labs application is equipped with an integrated **Client CMS / Admin Panel** accessible directly from the browser. It allows you to create, modify, publish, and delete projects, digital products, and technical articles without writing code.

---

## 1. Accessing the Admin Panel

1. **Local Server URL**: [http://localhost:3000/admin](http://localhost:3000/admin) (or `/admin` on your production domain).
2. **Authentication Gate**: 
   - Access to the panel is restricted via **Google OAuth**.
   - Ensure the Google Client ID environment variable `VITE_GOOGLE_CLIENT_ID` is set inside your `.env` file (local development) or inside your **Vercel Project Dashboard** (for production deployments).
   - Only authorized developer Google Accounts (configured in the Google Cloud credentials dashboard and allowed within `AdminPage.tsx` checks) can log in successfully.

---

## 2. Managing Website Content

Once logged in, you can manage the following sections:

### ✦ Projects & Deployments
- Add active work deployments.
- Fields include: Title, Client Name, Technology Stack, Project Domain (AI / Web / Infrastructure), Case Study description, GitHub/Drive source link, and Likes/Views telemetry.
- Check the **Featured on Homepage** toggle to showcase the project in the homepage carousel.

### ✦ Digital Products
- Edit templates, plugins, and boilerplates listed in the Products Store.
- Fields include: Name, USD Price, INR Price, Category (AI, Boilerplates, UI, DevTools), Description, Core Features array, and direct license download link.
- Check the **Featured on Homepage** toggle to showcase the product in the homepage grid.

### ✦ Tech Logs & Insights (Blogs)
- Publish engineering whitepapers, guides, and updates.
- Fields include: Title, Read Time (e.g., `5 min read`), Category, Author, Cover image URL, and markdown Content.
- Check the **Featured on Homepage** toggle to display the article in the homepage insights log.

---

## 3. GitHub Auto-Sync Integration

To persist all edits made in the Admin Panel back to your GitHub repository (triggering automatic Vercel redeployments with updated content):

1. **Generate a GitHub Personal Access Token (PAT)**:
   - Go to your GitHub account settings > **Developer settings** > **Personal access tokens** > **Tokens (classic)**.
   - Click **Generate new token (classic)**.
   - Give it a name (e.g., `Devil Labs CMS Sync`) and select the **`repo`** scope (allows commits to private/public repositories).
   - Click **Generate** and copy the token immediately.

2. **Configure in the Admin Panel**:
   - Navigate to the **GitHub Sync** tab (labeled with a GitHub icon in the left sidebar of the Admin Panel).
   - Paste the token into the **GitHub Access Token** input field.
   - Enter your repository target in the format `username/repository` (e.g., `vickyiitp/Devil-Labs`).
   - Enter the target branch (e.g., `main`).
   - Click **Save Config**.

3. **How Syncing Works**:
   - When you create or update any project, product, blog, or testimonial, the Admin Panel automatically writes the updated data state into a local memory structure.
   - It then issues a `PUT` request to the GitHub API, committing and pushing the updated state directly to a file named `devil_labs_data.json` in your repository root.
   - Once pushed, Vercel detects the commit on the specified branch and automatically starts a new production deployment, rendering the updated content on your live website within minutes.
