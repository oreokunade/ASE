# 🏁 Handover Documentation: Abuja Startup Expo 2026

Welcome to the official technical handover for the Abuja Startup Expo (ASE) 2026 landing page. This document outlines everything you need to manage, update, and maintain the platform.

---

## 🚀 1. Deployment & Workflow
The website is built using **React + Vite** and is hosted on **Namecheap**.

### **Automated Deployment (CI/CD)**
The project is configured with **GitHub Actions**. 
*   **The Workflow:** Every time a change is "Pushed" to the `main` branch on GitHub, the site automatically builds and deploys to Namecheap.
*   **How to use:** Simply update the code and push to GitHub. The site will update live within 2-3 minutes.

---

## 🛠 2. How to Update Content
The site content is primarily located in `src/App.tsx`.

### **Updating Application Links**
To change the links for Speakers or Volunteers, locate the following lines in `App.tsx`:
*   **Volunteer Form:** Update the URL in the `href` attributes of the "Volunteer" buttons.
*   **Speaker Form:** Update the URL in the `href` attributes of the "Apply to Speak" buttons.

### **Short URLs (Redirects)**
We have set up "Short Links" for easier sharing:
*   `abujastartupexpo.com/volunteers` -> Automatically points to the Volunteer Google Form.
*   `abujastartupexpo.com/speakers` -> Automatically points to the Speaker Google Form.
*   *To edit these, modify the `.htaccess` file in the `public/` folder.*

---

## 📦 3. Hosting & Server Management
*   **Hosting Provider:** Namecheap
*   **cPanel URL:** [https://server404.web-hosting.com:2083](https://server404.web-hosting.com:2083) (Check credentials in your secure handover sheet).
*   **FTP Account:** `deploy@abujastartupexpo.com` (Used for automated deployments).
*   **Primary Directory:** All live files are located in the `public_html/` folder.

---

## 🔍 4. SEO & Social Media
The site is optimized for high-impact social sharing.
*   **Favicon:** Managed via `public/favicon.png`.
*   **Social Preview Image:** Located at `public/og-image.png`. When you share the link on WhatsApp, Twitter, or LinkedIn, this image and the event description will appear automatically.
*   **Metadata:** Controlled in `index.html`.

---

## 🔐 5. SSL & Security
*   **SSL Certificate:** A **PositiveSSL** certificate is installed and active.
*   **Force HTTPS:** The server is configured to automatically redirect all visitors to the secure `https://` version of the site.

---

## 📅 6. Maintenance Checklist
*   **Domain Renewal:** Ensure `abujastartupexpo.com` is set to auto-renew in Namecheap.
*   **Hosting Renewal:** Ensure the Stellar/Stellar Plus hosting plan is active.
*   **SSL Renewal:** The PositiveSSL certificate must be renewed once a year.

---

**Prepared by:** Antigravity (Advanced AI Coding Assistant)  
**Date:** May 5, 2026
