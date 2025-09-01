"use client";

import { useState, useRef } from "react";
import { SectionConfig, layout as defaultLayout } from "@/config/layout";
import { theme as defaultTheme } from "@/config/layout";

export default function LayoutSettings({
  onChange,
  onThemeChange,
  onClose,
}: {
  onChange: (newLayout: SectionConfig[]) => void;
  onThemeChange: (theme: typeof defaultTheme) => void;
  onClose: () => void;
}) {
  const [sections, setSections] = useState([...defaultLayout]);
  const [theme, setTheme] = useState(defaultTheme);
  const [activeTab, setActiveTab] = useState<string>("header");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [showLicensePrompt, setShowLicensePrompt] = useState(false);
  const [licenseKey, setLicenseKey] = useState("");
  const [loading, setLoading] = useState(false);

  const fileHandleRef = useRef<FileSystemFileHandle | null>(null);

  type SectionUpdate<T extends SectionConfig["id"]> = Partial<Extract<SectionConfig, { id: T }>>;

  const updateSection = <T extends SectionConfig["id"]>(id: T, updates: SectionUpdate<T>) => {
    const updated = sections.map((s) =>
      s.id === id ? { ...s, ...updates } : s
    ) as SectionConfig[];
    setSections(updated);
    onChange(updated);
  };

  
  const updateTheme = (updates: Partial<typeof defaultTheme>) => {
    const updated = { ...theme, ...updates };
    setTheme(updated);
    onThemeChange(updated);
  };

  if (process.env.NEXT_PUBLIC_ENV !== "development") return null;

  const activeSection = sections.find((s) => s.id === activeTab);

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSaveJSON = async () => {
    setShowLicensePrompt(true);
  };

  const verifyAndDownload = async () => {
    setLoading(true);
    try {
      // 1️⃣ Verify license
      /* const res = await fetch("/api/verify-license", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ licenseKey }),
      });
      const data = await res.json();
      if (!data.valid) {
        alert("❌ Invalid or expired license key.");
        setLoading(false);
        return;
      } */

      // 2️⃣ Call API to generate ZIP
      const zipRes = await fetch("/api/download-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ layout: { sections, theme } }),
      });

      const blob = await zipRes.blob();

      // 3️⃣ Download the ZIP
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "nextfolio.zip";
      document.body.appendChild(a);
      a.click();
      a.remove();

      setShowLicensePrompt(false);
      setLoading(false);
      alert("✅ Download ready! Your ZIP is ready to upload to Vercel.");
    } catch (err) {
      console.error(err);
      alert("Failed to download ZIP. Please try again.");
      setLoading(false);
    }
  };


  type ArrayKeys = "nav" | "projects" | "skills" | "services" | "testimonials" | "socialMedia" | "socials";

  const renderArrayField = (
  s: SectionConfig,
  arrKey: ArrayKeys,
  itemFields: { key: string; label: string; multiline?: boolean }[],
  allowFileUpload = false
) => {
  const arr = [...((s as any)[arrKey] || [])];

  return (
    <div className="space-y-1">
      {arr.map((item, i) => (
        <div key={i} className="border p-2 rounded flex flex-col gap-1">
          {itemFields.map((f) => (
            <div key={f.key}>
              <span className="text-xs">{f.label}</span>

              {/* ✅ Text or textarea */}
              {f.key === "size" ? (
                <select
                  value={item[f.key] || "medium"}
                  onChange={(e) => {
                    const updated = [...arr];
                    updated[i][f.key] = e.target.value;
                    updateSection(s.id, { [arrKey]: updated });
                  }}
                  className="w-full border px-2 py-1 rounded text-sm"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              ) : (
                <input
                  type={f.multiline ? "textarea" : "text"}
                  value={typeof item === "string" ? item : item[f.key]}
                  onChange={(e) => {
                    const updated = [...arr];
                    if (typeof item === "string") updated[i] = e.target.value;
                    else updated[i][f.key] = e.target.value;
                    updateSection(s.id, { [arrKey]: updated });
                  }}
                  className="w-full border px-2 py-1 rounded text-sm mb-1"
                />
              )}

              {/* ✅ File upload for image/icon */}
              {allowFileUpload && (f.key === "image" || f.key === "icon") && (
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-xs"
                  onChange={async (e) => {
                    if (!e.target.files?.length) return;
                    const file = e.target.files[0];

                    if (file.size > 2 * 1024 * 1024) {
                      return alert("File too large (max 2MB)");
                    }

                    const formData = new FormData();
                    formData.append("file", file);

                    try {
                      const res = await fetch("/api/upload", {
                        method: "POST",
                        body: formData,
                      });
                      const data = await res.json();

                      if (data.url) {
                        const updated = [...arr];
                        if (typeof item === "string") updated[i] = data.url;
                        else updated[i][f.key] = data.url;
                        updateSection(s.id, { [arrKey]: updated });
                      } else {
                        alert("Upload failed");
                      }
                    } catch (err) {
                      console.error(err);
                      alert("Upload failed");
                    }
                  }}
                />
              )}
            </div>
          ))}

          <button
            onClick={() => {
              const updated = [...arr];
              updated.splice(i, 1);
              updateSection(s.id, { [arrKey]: updated });
            }}
            className="px-2 py-1 bg-red-200 dark:bg-red-800 rounded text-xs mt-1"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={() => {
          const updated = [
            ...arr,
            itemFields.length === 1 && !itemFields[0].multiline ? "" : {},
          ];
          updateSection(s.id, { [arrKey]: updated });
        }}
        className="mt-2 px-2 py-1 bg-neutral-200 dark:bg-neutral-800 rounded text-xs"
      >
        + Add
      </button>
    </div>
  );
};





  const renderSectionFields = (s: SectionConfig) => {
    if (collapsed[s.id]) return null;

    return (
      <div className="space-y-2 overflow-y-auto max-h-[60vh] pr-2">
        {/* Show/Hide toggle except header/footer */}
        {!["header", "footer"].includes(s.id) && (
          <label className="flex items-center gap-2 mb-2">
            <input
              type="checkbox"
              checked={s.enabled}
              onChange={(e) => updateSection(s.id, { enabled: e.target.checked })}
            />
            <span className="text-sm font-medium">Show {s.id}</span>
          </label>
        )}

        {/* Section-specific fields */}
        {s.id === "header" && (
          <>
            <label className="block">
              <span className="text-xs">Site Name</span>
              <input
                type="text"
                value={s.siteName || ""}
                onChange={(e) => updateSection(s.id, { siteName: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>

            {/* <div>
              <span className="text-xs block mb-1">Navigation Links</span>
              {renderArrayField(s, "nav", [
                { key: "label", label: "Label" },
                { key: "href", label: "Href" },
              ])}
            </div> */}

            <label className="block">
              <span className="text-xs">CTA Label</span>
              <input
                type="text"
                value={s.ctaLabel || ""}
                onChange={(e) => updateSection(s.id, { ctaLabel: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>

            <label className="block">
              <span className="text-xs">CTA Href</span>
              <input
                type="text"
                value={s.ctaHref || ""}
                onChange={(e) => updateSection(s.id, { ctaHref: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>
          </>
        )}

        {s.id === "hero" && (
          <>
            <label className="block">
              <span className="text-xs">Role</span>
              <input
                type="text"
                value={s.role || ""}
                onChange={(e) => updateSection(s.id, { role: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>

            <label className="block">
              <span className="text-xs">Headline</span>
              <input
                type="text"
                value={s.headline || ""}
                onChange={(e) => updateSection(s.id, { headline: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>

            <label className="block">
              <span className="text-xs">Tagline</span>
              <textarea
                value={s.tagline || ""}
                onChange={(e) => updateSection(s.id, { tagline: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>

            <label className="block">
              <span className="text-xs">Variant</span>
              <select
                value={s.variant || "split"}
                onChange={(e) => updateSection(s.id, { variant: e.target.value as any })}
                className="w-full border px-2 py-1 rounded text-sm"
              >
                <option value="split">Split</option>
                <option value="centered">Centered</option>
                <option value="image-left">Image Left</option>
              </select>
            </label>

            <label className="block">
              <span className="text-xs">Profile Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  if (file.size > 2 * 1024 * 1024) {
                    alert("File size must be less than 2MB");
                    return;
                  }

                  const reader = new FileReader();
                  reader.onloadend = () => {
                    if (typeof reader.result === "string") {
                      updateSection(s.id, { image: reader.result });
                    }
                  };
                  reader.readAsDataURL(file);
                }}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>


            {/* Image Shape */}
            <label className="block mt-2">
              <span className="text-xs">Image Shape</span>
              <select
                value={s.imageShape || "circle"}
                onChange={(e) => updateSection(s.id, { imageShape: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              >
                <option value="circle">Circle</option>
                <option value="square">Square</option>
              </select>
            </label>

            {/* Image Size */}
            <label className="block mt-2">
              <span className="text-xs">Image Size</span>
              <select
                value={s.imageSize || "medium"}
                onChange={(e) => updateSection(s.id, { imageSize: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </label>


          </>
        )}

        {s.id === "about" && (
          <>
            <label className="block">
              <span className="text-xs">Headline</span>
              <input
                type="text"
                value={s.headline || ""}
                onChange={(e) => updateSection(s.id, { headline: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs">Text</span>
              <textarea
                value={s.text || ""}
                onChange={(e) => updateSection(s.id, { text: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs">Skills Title</span>
              <input
                type="text"
                value={s.skillsTitle || "Skills"}
                onChange={(e) => updateSection(s.id, { skillsTitle: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs">Variant</span>
              <select
                value={s.variant || "split"}
                onChange={(e) => updateSection(s.id, { variant: e.target.value as any })}
                className="w-full border px-2 py-1 rounded text-sm"
              >
                <option value="split">Split</option>
                <option value="centered">Centered</option>
                {/* <option value="skills-left">Skills Left</option> */}
              </select>
            </label>
            {renderArrayField(s, "skills", [{ key: "name", label: "Skill" }])}
          </>
        )}

        {s.id === "projects" && (
          <>
            {/* Grid selection */}
            <label className="block mb-2">
              <span className="text-xs">Grid</span>
              <select
                value={s.grid || "3-col"}
                onChange={(e) => updateSection(s.id, { grid: e.target.value as "2-col" | "3-col" })}
                className="w-full border px-2 py-1 rounded text-sm"
              >
                <option value="2-col">2 Columns</option>
                <option value="3-col">3 Columns</option>
              </select>
            </label>

           {renderArrayField(
              s,
              "projects",
              [
                { key: "title", label: "Title" },
                { key: "description", label: "Description" },
                { key: "image", label: "Image URL" },
                { key: "liveUrl", label: "Live URL" },
              ],
              true 
            )}

          </>
        )}

        {s.id === "services" && (
          <>
            <label className="block">
              <span className="text-xs">Subtitle</span>
              <textarea
                value={s.subtitle || ""}
                onChange={(e) => updateSection(s.id, { subtitle: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>

            {/* Grid selection */}
            <label className="block mb-2">
              <span className="text-xs">Grid</span>
              <select
                value={s.grid || "3-col"}
                onChange={(e) => updateSection(s.id, { grid: e.target.value as "3-col" | "4-col" })}
                className="w-full border px-2 py-1 rounded text-sm"
              >
                <option value="3-col">3 Columns</option>
                <option value="4-col">4 Columns</option>
              </select>
            </label>

              {/* Services items */}
              {renderArrayField(
                s,
                "services",
                [
                  { key: "title", label: "Title" },
                  { key: "description", label: "Description" },
                  { key: "icon", label: "Icon (paste emoji or upload image)" },
                ],
                true // enable file upload
              )}
          </>
        )}

        {s.id === "testimonials" && (
          <>
            <label className="block">
              <span className="text-xs">Headline</span>
              <input
                type="text"
                value={s.headline || ""}
                onChange={(e) => updateSection(s.id, { headline: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>
            <label className="block">
              <span className="text-xs">Subtitle</span>
              <textarea
                value={s.subtitle || ""}
                onChange={(e) => updateSection(s.id, { subtitle: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>
            <label className="block mb-2">
              <span className="text-xs">Design Variant</span>
              <select
                value={s.variant || "carousel"}
                onChange={(e) => updateSection(s.id, { variant: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              >
                <option value="carousel">Carousel</option>
                <option value="grid">Grid</option>
                <option value="card-list">Card List</option>
              </select>
            </label>

              {renderArrayField(
                s,
                "testimonials",
                [
                  { key: "quote", label: "Quote" },
                  { key: "author", label: "Author" },
                  { key: "role", label: "Role" },
                  { key: "image", label: "Image URL / Upload" },
                  { key: "size", label: "Size" },
                ],
                true // enable file upload
              )}
          </>
        )}


        {s.id === "contact" && (
          <>
            {/* Global Fields */}
            <label className="block mb-2">
              <span className="text-xs">Headline</span>
              <input
                type="text"
                value={s.headline || ""}
                onChange={(e) => updateSection(s.id, { headline: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>

            <label className="block mb-2">
              <span className="text-xs">Subtitle</span>
              <input
                type="text"
                value={s.subtitle || ""}
                onChange={(e) => updateSection(s.id, { subtitle: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>

            {/* Variant selection */}
            <label className="block mb-2">
              <span className="text-xs">Design / Layout</span>
              <select
                value={s.variant || "default"}
                onChange={(e) => updateSection(s.id, { variant: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              >
                <option value="default">Default</option>
                <option value="stacked">Stacked</option>
              </select>
            </label>

            {s.variant === "card-bg" && (
              <label className="block mb-2">
                <span className="text-xs">Background Color</span>
                <input
                  type="color"
                  value={s.bgColor || "#f0f9ff"} // default light-blue
                  onChange={(e) => updateSection(s.id, { bgColor: e.target.value })}
                  className="w-full h-8 border rounded"
                />
              </label>
            )}


            {/* Location field */}
            <label className="block mb-2">
              <span className="text-xs">Location (text, map URL, or iframe)</span>
              <textarea
                value={s.location || ""}
                onChange={(e) => updateSection(s.id, { location: e.target.value })}
                placeholder="Enter a text, Google Maps embed URL, or paste full iframe code"
                rows={3}
                className="w-full border px-2 py-1 rounded text-sm"
              />
              <p className="text-[10px] text-neutral-500 mt-1">
                Example:
                <br />- Plain text: <code>Open to remote work worldwide</code>
                <br />- Map URL: <code>https://www.google.com/maps/embed?... </code>
                <br />- Full iframe: <code>{`<iframe src="https://..." ...></iframe>`}</code>
              </p>
            </label>


            {/* Social Media Array */}
            <div className="">Socials</div>
            {renderArrayField(s, "socialMedia", [
              { key: "platform", label: "Platform" },
              { key: "url", label: "URL" },
            ])}
          </>
        )}


        {s.id === "footer" && (
          <div className="space-y-3">
            {/* Footer text */}
            <label className="block">
              <span className="text-xs">Text</span>
              <input
                type="text"
                value={s.text || ""}
                onChange={(e) => updateSection(s.id, { text: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>

            {/* Footer note */}
            <label className="block">
              <span className="text-xs">Note</span>
              <input
                type="text"
                value={s.note || ""}
                onChange={(e) => updateSection(s.id, { note: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </label>

            {/* Layout variant */}
            <label className="block">
              <span className="text-xs">Layout Variant</span>
              <select
                value={s.variant || "default"}
                onChange={(e) => updateSection(s.id, { variant: e.target.value })}
                className="w-full border px-2 py-1 rounded text-sm"
              >
                <option value="default">Default (Left + Right)</option>
                <option value="centered">Centered</option>
                <option value="social">With Social Links</option>
              </select>
            </label>

            {/* Social Links (only for social variant) */}
            {s.variant === "social" && (
              <div className="space-y-2">
                <span className="text-xs">Social Links</span>
                {(s.socials || []).map((sm: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="text"
                      placeholder="Platform (e.g. Twitter)"
                      value={sm.platform || ""}
                      onChange={(e) => {
                        const updated = [...(s.socials || [])]
                        updated[idx] = { ...updated[idx], platform: e.target.value }
                        updateSection(s.id, { socials: updated })
                      }}
                      className="flex-1 border px-2 py-1 rounded text-sm"
                    />
                    <input
                      type="text"
                      placeholder="URL"
                      value={sm.url || ""}
                      onChange={(e) => {
                        const updated = [...(s.socials || [])]
                        updated[idx] = { ...updated[idx], url: e.target.value }
                        updateSection(s.id, { socials: updated })
                      }}
                      className="flex-1 border px-2 py-1 rounded text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const updated = (s.socials || []).filter((_: any, i: number) => i !== idx)
                        updateSection(s.id, { socials: updated })
                      }}
                      className="text-red-500 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    updateSection(s.id, {
                      socials: [...(s.socials || []), { platform: "", url: "" }],
                    })
                  }
                  className="text-xs underline"
                >
                  + Add Social Link
                </button>
              </div>
            )}
          </div>
        )}


      </div>
    );
  };

  return (
    <div className="fixed top-4 right-4 z-50 w-96 p-4 bg-white dark:bg-neutral-900 border rounded shadow-lg text-sm overflow-hidden">
      {/* Header with Close button */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold">Layout Settings ⚙️</h2>
        <button
          onClick={onClose}
          className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
        >
          ✖
        </button>
      </div>

      {/* Global Settings */}
      <div className="mb-4 border-b pb-3">
        <h3 className="font-semibold text-sm mb-2">Global Settings</h3>
        {/* Font Family */}
        <label className="block mb-2">
          <span className="text-xs">Font Family</span>
          <select
            value={theme.font.heading.split(',')[0]} // Only use the first font name
            onChange={(e) =>
              updateTheme({
                font: {
                  heading: `${e.target.value}, ui-sans-serif, system-ui, sans-serif`,
                  body: `${e.target.value}, ui-sans-serif, system-ui, sans-serif`,
                },
              })
            }
            className="w-full border px-2 py-1 rounded text-sm"
          >
            <option value="Inter">Inter</option>
            <option value="Poppins">Poppins</option>
            <option value="Montserrat">Montserrat</option>
            <option value="Arial">Arial</option>
            <option value="Roboto">Roboto</option>
            <option value="Helvetica">Helvetica</option>
          </select>
        </label>

        {/* Color Settings */}
        <div className="">
          <h3 className="font-semibold text-xs mb-2">Colors</h3>

          <div className="flex gap-2">
            {Object.entries(theme.colors)
              .filter(([key]) => key !== 'background' && key !== 'backgroundDark' && key !== 'text' && key !== 'textDark')
              .map(([key, value]) => (
                <div key={key} className="flex flex-col items-center">
                  <span className="text-xs mb-1">{key}</span>
                  <input
                    type="color"
                    value={value}
                    onChange={(e) =>
                      updateTheme({
                        colors: {
                          ...theme.colors,
                          [key]: e.target.value,
                        },
                      })
                    }
                    className="w-8 h-8 border rounded"
                  />
                </div>
              ))}
          </div>
        </div>


      </div>


      {/* Tabs */}
      <div className="flex gap-1 mb-4 overflow-x-auto">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap ${
              activeTab === s.id
                ? "bg-blue-500 text-white"
                : "bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
            }`}
          >
            {s.id}
          </button>
        ))}
      </div>

      {/* Active Section Fields */}
      {activeSection && renderSectionFields(activeSection)}

      {/* Save button */}
      <div className="mt-4">
        <button
          onClick={handleSaveJSON}
          className="px-3 py-2 bg-green-500 text-white rounded text-sm w-full"
        >
          💾 Save
        </button>
      </div>


      {/* License Modal */}
      {showLicensePrompt && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-96">
            <h2 className="text-lg font-bold mb-3">🔑 Enter License Key</h2>
            <input
              type="text"
              placeholder="Enter Gumroad license key"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              className="border p-2 rounded w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowLicensePrompt(false)}
                className="px-3 py-2 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                onClick={verifyAndDownload}
                disabled={loading}
                className="px-3 py-2 bg-green-600 text-white rounded"
              >
                {loading ? "Verifying..." : "Verify & Download"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
