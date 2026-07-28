# Devil Labs Portfolio - Setup & Deployment Guide

This guide covers the complete setup process for your Devil Labs portfolio application, including Google Authentication for the Admin Panel, GitHub Auto-Sync, and deploying to Vercel.

## 1. Google Authentication Setup (Admin Panel)

Access to the Admin Panel is strictly restricted to `themvaplatform@gmail.com` via Google OAuth. To enable this, you need a Google Client ID.

### Steps to get the Google Client ID:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (or select an existing one).
3. Navigate to **APIs & Services > OAuth consent screen**.
   - Choose **External** (or Internal if you have a Google Workspace).
   - Fill in the required app information (App name, User support email, Developer contact).
   - Save and continue through the Scopes and Test Users screens (add `themvaplatform@gmail.com` as a test user if the app remains in "Testing" mode).
4. Navigate to **APIs & Services > Credentials**.
5. Click **+ CREATE CREDENTIALS** > **OAuth client ID**.
6. Select **Web application** as the Application type.
7. Add your **Authorized JavaScript origins**:
   - For local development: `http://localhost:3000` (or whatever port you use)
   - For Vercel production: `https://your-vercel-domain.vercel.app`
8. Click **Create**.
9. Copy the generated **Client ID**. You will add this to your Environment Variables as `VITE_GOOGLE_CLIENT_ID`.

---

## 2. GitHub Auto-Sync Setup

The Admin Panel includes a feature to automatically push CMS changes (Projects, Products, Blogs) directly to your GitHub repository.

### Steps to get a GitHub Personal Access Token (PAT):
1. Go to your GitHub account settings.
2. Scroll down to **Developer settings** (bottom of the left sidebar).
3. Select **Personal access tokens** > **Tokens (classic)**.
4. Click **Generate new token (classic)**.
5. Give it a note (e.g., "Devil Labs Admin Sync").
6. Check the **`repo`** scope (Full control of private repositories).
7. Scroll down and click **Generate token**.
8. **Copy the token immediately** (it will only be shown once).

### Configuring in the Admin Panel:
1. Log into your Admin Panel.
2. Navigate to the **GitHub Sync** tab (the Github Icon).
3. Enter your copied PAT in the **GitHub Access Token** field.
4. Enter your target repository in the format `username/repository` (e.g., `Devil-Labs/portfolio`).
5. Enter the target branch (e.g., `main`).
6. Click **Save Config**. The platform will now automatically sync changes to this repository.

---

## 3. Environment Variables

Before deploying, ensure you have the following environment variables ready. Locally, create a `.env` file in the root directory:

```env
# Google OAuth Client ID for Admin Login
VITE_GOOGLE_CLIENT_ID="your_google_client_id_here"

# (Optional) Gemini API Key if using AI features
GEMINI_API_KEY="your_gemini_api_key_here"

# (Optional) Application URL
APP_URL="https://your-vercel-domain.vercel.app"
```

---

## 4. Vercel Deployment

The application is fully configured as a Single Page Application (SPA) and is ready for Vercel deployment. A `vercel.json` file is already included in the root directory to handle client-side routing (rewriting all traffic to `index.html`).

### Deployment Steps:
1. **Push your code to GitHub:** Make sure your entire repository is pushed to your GitHub account.
2. **Log into Vercel:** Go to [vercel.com](https://vercel.com/) and sign in with your GitHub account.
3. **Add New Project:** Click **Add New...** > **Project**.
4. **Import Repository:** Select the GitHub repository containing your Devil Labs portfolio and click **Import**.
5. **Configure Project:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. **Environment Variables:** Expand the "Environment Variables" section and add the variables listed in Section 3 (specifically `VITE_GOOGLE_CLIENT_ID`).
7. **Deploy:** Click **Deploy**.

Vercel will build and publish your application. Once finished, ensure you add the generated Vercel production URL to your Google Cloud Console's **Authorized JavaScript origins** so the admin login works in production!
