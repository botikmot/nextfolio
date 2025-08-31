import JSZip from "jszip";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { layout } = await req.json();

    const zip = new JSZip();
    const baseDir = path.join(process.cwd(), "template-base");

    // Recursively add folder to ZIP
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

    // Add all files from template-base
    addFolderToZip(baseDir, zip);

    // Overwrite layout.json with buyer’s customized layout
    zip.file("config/layout.json", JSON.stringify(layout, null, 2));

    // Generate ZIP as Node Buffer
    const buffer = await zip.generateAsync({ type: "nodebuffer" });

    // Convert to Uint8Array then Blob for Next.js Response
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
