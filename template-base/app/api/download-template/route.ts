import JSZip from "jszip";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { layout } = await req.json();

    const zip = new JSZip();
    /* const baseDir = path.join(process.cwd(), "template-base");

    function addFolderToZip(folderPath: string, zipFolder: JSZip) {
      const files = fs.readdirSync(folderPath);
      files.forEach((file) => {
        const fullPath = path.join(folderPath, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          const subFolder = zipFolder.folder(file)!;
          addFolderToZip(fullPath, subFolder);
        } else {
          zipFolder.file(file, fs.readFileSync(fullPath));
        }
      });
    }

    addFolderToZip(baseDir, zip); */

    zip.file("config/layout.json", JSON.stringify(layout, null, 2));

    // Professional README in Markdown style
    const readmeContent = `
# 🚀 NextFolio - Portfolio Deployment Guide

Congratulations on purchasing NextFolio! This guide will help you deploy your portfolio site.

---

## Option 1: Git Repository (Recommended for Tech-Savvy Users)

1. Create a new repository on GitHub, GitLab, or Bitbucket.
2. Extract the downloaded ZIP locally.
3. Open a terminal in the project folder and run:
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <YOUR_REPO_URL>
   git push -u origin main
   \`\`\`
4. Go to [Vercel](https://vercel.com), click **New Project → Import Git Repository → Select your repo**.
5. Vercel will detect Next.js automatically and deploy your site.

---

## Option 2: Vercel CLI (Beginner-Friendly Deployment)

If you don’t want to use Git, you can deploy directly using the Vercel CLI. Follow these steps:

1. **Install Node.js**  
   - Go to https://nodejs.org/ and download the **LTS (Long Term Support)** version.  
   - Install Node.js on your computer (this also installs npm automatically).

2. **Install Vercel CLI**  
   - Open your terminal/command prompt and run:
     bash
     npm i -g vercel

3. **Extract the ZIP**  
   - Unzip the downloaded NextFolio ZIP to a folder on your computer.

4. **Deploy the site**  
   - Open terminal in the extracted folder.
   - Run:
     bash
     vercel
   - Follow the prompts to deploy your portfolio.

5. Done! Your portfolio is live on Vercel.


---

## Optional Environment Variables (Vercel Dashboard → Settings → Environment Variables)

| Variable | Description |
|----------|-------------|
| NEXT_PUBLIC_ENV | Set to \`production\` |
| SITE_URL | Your site URL (e.g., https://yourdomain.com) |
| MAILGUN_API_KEY | Mailgun API key (for contact forms) |
| MAILGUN_DOMAIN | Mailgun domain |

---

## Optional Deployment Assistance ($30)

If you prefer, we can deploy this portfolio for you, including connecting your Vercel account and verifying the site.  
Contact us at: **nextask24@gmail.com**

---

## Need Help?

For any questions or issues, contact: **nextask24@gmail.com**

Happy deploying! 🎉
`;

    zip.file("README.md", readmeContent.trim());

    // Generate ZIP as Node Buffer
    const buffer = await zip.generateAsync({ type: "nodebuffer" });
    const uint8Array = new Uint8Array(buffer);
    const blob = new Blob([uint8Array], { type: "application/zip" });

    return new Response(blob, {
      status: 200,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": "attachment; filename=nextfolio.zip",
      },
    });
  } catch (err) {
    console.error("Error generating ZIP:", err);
    return new Response(JSON.stringify({ error: "Failed to generate ZIP" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
