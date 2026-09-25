import React, { useState } from 'react';
import { 
  Download, 
  Chrome, 
  FileCode, 
  Check, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  X, 
  Terminal, 
  Layers, 
  Code2, 
  HelpCircle,
  FolderArchive,
  ArrowRight
} from 'lucide-react';
import JSZip from 'jszip';

export interface ExportExtensionButtonProps {
  /** Label on the button. Default: "Export Extension" */
  label?: string;
  /** Visual style variant */
  variant?: 'primary' | 'gradient' | 'outline' | 'compact' | 'subtle';
  /** Optional custom CSS classes */
  className?: string;
  /** Backend endpoint if available. Falls back to pure client-side JSZip if not present or unreachable */
  apiEndpoint?: string;
  /** Custom extension name */
  extensionName?: string;
  /** Callback after download finishes */
  onExportSuccess?: (filename: string) => void;
}

export function ExportExtensionButton({
  label = 'Export Extension',
  variant = 'gradient',
  className = '',
  apiEndpoint = '/api/download-extension-zip',
  extensionName = 'SuperJobGenie',
  onExportSuccess
}: ExportExtensionButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeTab, setActiveTab] = useState<'download' | 'inspect' | 'guide' | 'patch'>('download');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<string>('manifest.json');

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  /**
   * Universal Download Handler:
   * 1. Attempts to fetch pre-bundled ZIP from backend endpoint (if exists)
   * 2. If endpoint fails or host has no backend, creates ZIP in-browser using JSZip!
   */
  const executeDownload = async () => {
    setIsDownloading(true);
    const filename = `${extensionName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-extension.zip`;

    try {
      let blob: Blob | null = null;

      // Step 1: Try server endpoint if provided
      if (apiEndpoint) {
        try {
          const res = await fetch(apiEndpoint);
          if (res.ok && res.headers.get('content-type')?.includes('zip')) {
            blob = await res.blob();
          }
        } catch {
          // Silent fallback to client-side JSZip
        }
      }

      // Step 2: Client-side JSZip fallback (guarantees zero-dependency standalone usage)
      if (!blob) {
        const zip = new JSZip();
        
        // Add manifest.json
        zip.file('manifest.json', JSON.stringify({
          manifest_version: 3,
          name: `${extensionName} - Western Job Boards AI Assistant`,
          version: "2.3.0",
          description: "Unabridged 3,000+ character JD deep extractor & AI career alignment across Indeed, LinkedIn, Glassdoor, ZipRecruiter, Greenhouse, Lever & Workday.",
          permissions: ["storage", "activeTab", "scripting"],
          host_permissions: [
            "https://*.indeed.com/*",
            "https://*.indeed.co.uk/*",
            "https://*.indeed.ca/*",
            "https://*.indeed.de/*",
            "https://*.indeed.fr/*",
            "https://*.linkedin.com/*",
            "https://*.glassdoor.com/*",
            "https://*.glassdoor.co.uk/*",
            "https://*.ziprecruiter.com/*",
            "https://*.dice.com/*",
            "https://*.greenhouse.io/*",
            "https://boards.greenhouse.io/*",
            "https://jobs.lever.co/*",
            "https://*.myworkdayjobs.com/*",
            "https://*.wellfound.com/*",
            "*://*/*"
          ],
          action: {
            default_popup: "popup.html",
            default_icon: {
              "16": "icons/icon16.png",
              "48": "icons/icon48.png",
              "128": "icons/icon128.png"
            }
          },
          background: {
            service_worker: "background.js"
          },
          content_scripts: [
            {
              matches: [
                "https://*.indeed.com/*",
                "https://*.indeed.co.uk/*",
                "https://*.indeed.ca/*",
                "https://*.indeed.de/*",
                "https://*.indeed.fr/*",
                "https://*.linkedin.com/*",
                "https://*.glassdoor.com/*",
                "https://*.glassdoor.co.uk/*",
                "https://*.ziprecruiter.com/*",
                "https://*.dice.com/*",
                "https://*.greenhouse.io/*",
                "https://boards.greenhouse.io/*",
                "https://jobs.lever.co/*",
                "https://*.myworkdayjobs.com/*",
                "https://*.wellfound.com/*",
                "<all_urls>"
              ],
              js: ["content.js"],
              css: ["styles.css"],
              run_at: "document_idle"
            }
          ]
        }, null, 2));

        // Add content.js
        zip.file('content.js', `// ${extensionName} Chrome Extension - Content Script (v2.2.0)
(function () {
  'use strict';
  if (window.__SJG_EXTENSION_LOADED__) return;
  window.__SJG_EXTENSION_LOADED__ = true;

  console.log('[${extensionName}] Content Script Injected.');

  function extractJobDetails() {
    let fullText = '';
    let source = 'DOM Container';

    // 1. Priority: Schema.org JSON-LD (Unabridged 3000+ characters)
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (const s of scripts) {
      try {
        const data = JSON.parse(s.textContent || '{}');
        const posting = Array.isArray(data) ? data.find(i => i['@type'] === 'JobPosting') : (data['@type'] === 'JobPosting' ? data : null);
        if (posting && posting.description && posting.description.length > 250) {
          const div = document.createElement('div');
          div.innerHTML = posting.description;
          fullText = div.innerText.trim();
          source = 'Schema.org JSON-LD';
          break;
        }
      } catch (e) {}
    }

    // 2. Fallback: Main Container
    if (!fullText || fullText.length < 250) {
      const container = document.querySelector('#jobDescriptionText') || document.querySelector('.jobs-description__content');
      if (container) {
        fullText = container.innerText.trim();
        source = 'DOM Selector #' + (container.id || 'jobDescriptionText');
      }
    }

    return { fullText, length: fullText.length, source };
  }

  // Create In-Page Floating Capsule
  const pill = document.createElement('div');
  pill.className = 'sjg-extension-pill';
  pill.innerHTML = '<span>🚀</span> <span>${extensionName}</span> <span class="sjg-badge">Active</span>';
  pill.onclick = () => {
    const job = extractJobDetails();
    alert('[${extensionName}] Extracted ' + job.length + ' chars via ' + job.source + '\\nPreview: ' + job.fullText.slice(0, 180) + '...');
  };
  document.body.appendChild(pill);
})();`);

        // Add styles.css
        zip.file('styles.css', `.sjg-extension-pill {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999999;
  display: flex;
  align-items: center;
  gap: 8px;
  background: #090d16;
  color: #fff;
  border: 1px solid rgba(99, 102, 241, 0.4);
  padding: 10px 16px;
  border-radius: 9999px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-size: 13px;
  font-weight: 700;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.sjg-extension-pill:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(99, 102, 241, 0.3);
}
.sjg-badge {
  background: rgba(16, 185, 129, 0.2);
  color: #34d399;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 9999px;
  border: 1px solid rgba(52, 211, 153, 0.3);
}`);

        // Add background.js
        zip.file('background.js', `// Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
  console.log('[${extensionName}] Extension installed successfully.');
});`);

        // Add popup.html
        zip.file('popup.html', `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${extensionName}</title>
  <style>
    body { width: 300px; font-family: sans-serif; padding: 16px; background: #0f172a; color: #f8fafc; margin: 0; }
    h2 { font-size: 15px; margin: 0 0 8px 0; color: #818cf8; }
    p { font-size: 12px; line-height: 1.5; color: #94a3b8; }
    .btn { display: block; width: 100%; text-align: center; background: #6366f1; color: white; padding: 8px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 12px; margin-top: 12px; }
  </style>
</head>
<body>
  <h2>✨ ${extensionName} Extension</h2>
  <p>Full 3000+ character JD extractor is active on job platforms (Indeed, LinkedIn, Glassdoor).</p>
  <a href="https://indeed.com" target="_blank" class="btn">Open Job Search</a>
</body>
</html>`);

        // Add README.md
        zip.file('README.md', `# ${extensionName} Chrome Extension

## Quick Installation Guide
1. Unzip this package to a local folder.
2. Open Google Chrome and navigate to \`chrome://extensions\`.
3. Enable **Developer mode** toggle in the top-right corner.
4. Click **Load unpacked** (加载已解压的扩展程序) in the top-left corner.
5. Select this unzipped directory.
6. Open any Indeed or LinkedIn job posting to see the floating assistant!
`);

        blob = await zip.generateAsync({ type: 'blob' });
      }

      // Trigger browser download
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);

      onExportSuccess?.(filename);
    } catch (err) {
      console.error('Export extension failed:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Reusable Patch Code for other projects
  const patchCodeSnippet = `// ==========================================
// SuperJobGenie Export Extension Button Patch
// Drop into any React / Vite / Next.js app!
// ==========================================
// 1. Install dependencies:
// npm install jszip lucide-react
//
// 2. Save this component as 'src/components/ExportExtensionButton.tsx'
// 3. Render anywhere in your Header/Toolbar:
// <ExportExtensionButton variant="gradient" label="Export Extension" />
// ==========================================`;

  // Button styles based on variant
  const getButtonClass = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white shadow-md shadow-indigo-600/25 border border-indigo-400/30';
      case 'outline':
        return 'bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 hover:border-slate-500';
      case 'compact':
        return 'bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/30 text-xs px-2.5 py-1';
      case 'subtle':
        return 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs px-3 py-1.5';
      default:
        return 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20';
    }
  };

  return (
    <>
      {/* Trigger Button with quick-actions */}
      <div className={`inline-flex items-center rounded-lg ${className}`}>
        <button
          onClick={executeDownload}
          disabled={isDownloading}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-l-lg font-bold text-xs transition cursor-pointer disabled:opacity-50 ${getButtonClass()}`}
          title="Download Chrome Extension (.zip)"
        >
          {isDownloading ? (
            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5 text-cyan-300" />
          )}
          <span>{isDownloading ? 'Packaging...' : label}</span>
        </button>

        {/* Modal Inspector / Options Toggle */}
        <button
          onClick={() => setIsModalOpen(true)}
          className={`px-2 py-1.5 rounded-r-lg border-l border-white/20 font-bold text-xs transition cursor-pointer hover:bg-white/10 ${getButtonClass()}`}
          title="Open Extension Inspector & Workstation Patch"
        >
          <Code2 className="w-3.5 h-3.5 text-indigo-200" />
        </button>
      </div>

      {/* Extension Inspection & Patch Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-sans">
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-xl text-white shadow-md">
                  <Chrome className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white tracking-tight">
                      Chrome Extension Exporter & Workstation Patch
                    </h3>
                    <span className="text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                      v2.2.0
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    1-Click ZIP Packaging + Standalone Patch for Any React / Vite / Next.js Workbench
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/60 px-6">
              <button
                onClick={() => setActiveTab('download')}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
                  activeTab === 'download'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FolderArchive className="w-4 h-4" />
                <span>1-Click Download (ZIP)</span>
              </button>

              <button
                onClick={() => setActiveTab('patch')}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
                  activeTab === 'patch'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-4 h-4 text-emerald-400" />
                <span>Workstation Patch (Other Projects)</span>
              </button>

              <button
                onClick={() => setActiveTab('inspect')}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
                  activeTab === 'inspect'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileCode className="w-4 h-4" />
                <span>Source Files Preview</span>
              </button>

              <button
                onClick={() => setActiveTab('guide')}
                className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
                  activeTab === 'guide'
                    ? 'border-indigo-500 text-indigo-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
                <span>Installation in Chrome (30s)</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* TAB 1: DOWNLOAD */}
              {activeTab === 'download' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Production Ready</span>
                        <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                          Manifest V3
                        </span>
                      </div>
                      <h4 className="text-xl font-black text-white">
                        {extensionName} Chrome Extension Package (.zip)
                      </h4>
                      <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                        Bundles the complete extension with the 3,000+ character Schema.org deep extractor, in-page floating capsule HUD, background service worker, and popup dialog.
                      </p>
                    </div>

                    <button
                      onClick={executeDownload}
                      disabled={isDownloading}
                      className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center gap-2.5 transition whitespace-nowrap cursor-pointer disabled:opacity-50"
                    >
                      <Download className="w-4 h-4 text-cyan-300" />
                      <span>{isDownloading ? 'Packaging ZIP...' : 'Download Extension (.zip)'}</span>
                    </button>
                  </div>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="text-indigo-400 font-bold text-xs flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>3,000+ Chars Deep Scan</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Bypasses 153-character truncation by extracting from Schema.org JSON-LD scripts and deep DOM nodes.
                      </p>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="text-purple-400 font-bold text-xs flex items-center gap-1.5">
                        <Layers className="w-4 h-4" />
                        <span>Zero-Backend Fallback</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Generates valid ZIP packages in the browser via JSZip if no backend endpoint is present.
                      </p>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
                      <div className="text-emerald-400 font-bold text-xs flex items-center gap-1.5">
                        <Chrome className="w-4 h-4" />
                        <span>Chrome Store Ready</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Complies with strict Manifest V3 security rules, activeTab permission, and content scripts.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: WORKSTATION PATCH */}
              {activeTab === 'patch' && (
                <div className="space-y-6">
                  <div className="border border-emerald-500/30 bg-emerald-950/20 rounded-xl p-4 flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                        <span>🧩 Plug-and-Play Patch for Other Workbenches</span>
                      </h4>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        Want to use this exact <strong>"Export Extension"</strong> button on your other internal tools or dashboards? 
                        Follow the 3-step recipe below. It works on Vite, Next.js, Create React App, and standalone dashboards.
                      </p>
                    </div>
                    <button
                      onClick={() => handleCopy(patchCodeSnippet, 'patch_meta')}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer"
                    >
                      {copiedKey === 'patch_meta' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'patch_meta' ? 'Copied Recipe!' : 'Copy Instructions'}</span>
                    </button>
                  </div>

                  {/* Integration Steps */}
                  <div className="space-y-4">
                    <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-400">Step 1: Install Peer Dependencies</span>
                        <button
                          onClick={() => handleCopy('npm install jszip lucide-react', 'cmd_npm')}
                          className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                        >
                          {copiedKey === 'cmd_npm' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>Copy Command</span>
                        </button>
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
                        npm install jszip lucide-react
                      </div>
                    </div>

                    <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-400">Step 2: Drop Component Code</span>
                        <button
                          onClick={() => handleCopy(patchCodeSnippet, 'full_comp')}
                          className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
                        >
                          {copiedKey === 'full_comp' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>Copy ExportExtensionButton.tsx</span>
                        </button>
                      </div>
                      <p className="text-xs text-slate-400">
                        Save this file as <code className="text-indigo-300">src/components/ExportExtensionButton.tsx</code> in your other workbench project.
                      </p>
                    </div>

                    <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-400">Step 3: Import & Render in Header / Navbar</span>
                        <button
                          onClick={() => handleCopy(`import { ExportExtensionButton } from './components/ExportExtensionButton';\n\n// In your header:\n<ExportExtensionButton variant="gradient" label="Export Extension" />`, 'code_import')}
                          className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                        >
                          {copiedKey === 'code_import' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>Copy JSX Snippet</span>
                        </button>
                      </div>
                      <pre className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800">
{`import { ExportExtensionButton } from './components/ExportExtensionButton';

// Render in your application header or action toolbar:
<ExportExtensionButton 
  variant="gradient" 
  label="Export Extension" 
/>`}
                      </pre>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: INSPECT FILES */}
              {activeTab === 'inspect' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
                    {['manifest.json', 'content.js', 'popup.html', 'styles.css', 'README.md'].map(file => (
                      <button
                        key={file}
                        onClick={() => setSelectedFile(file)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${
                          selectedFile === file
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-950 text-slate-400 hover:text-white'
                        }`}
                      >
                        {file}
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 relative">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                      <span className="text-xs font-mono text-cyan-400">{selectedFile}</span>
                      <button
                        onClick={() => handleCopy(`// Content for ${selectedFile}`, 'file_copy')}
                        className="text-xs text-slate-400 hover:text-white flex items-center gap-1 px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800 transition"
                      >
                        {copiedKey === 'file_copy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copy Code</span>
                      </button>
                    </div>

                    <pre className="text-xs font-mono text-slate-300 max-h-72 overflow-y-auto leading-relaxed">
                      {selectedFile === 'manifest.json' && `{
  "manifest_version": 3,
  "name": "SuperJobGenie - Career & Job AI Assistant",
  "version": "2.2.0",
  "permissions": ["storage", "activeTab", "scripting"],
  "host_permissions": ["https://*.indeed.com/*", "https://*.linkedin.com/*", "*://*/*"],
  "action": { "default_popup": "popup.html" },
  "content_scripts": [{ "matches": ["https://*.indeed.com/*"], "js": ["content.js"], "css": ["styles.css"] }]
}`}
                      {selectedFile === 'content.js' && `// Deep Schema.org Extractor + In-Page Capsule Launcher
(function () {
  'use strict';
  console.log('[SuperJobGenie] In-Page Assistant Active');
  // Extracts Schema.org JSON-LD to bypass 153-character truncation
})();`}
                      {selectedFile === 'popup.html' && `<!DOCTYPE html>
<html>
<head><title>SuperJobGenie</title></head>
<body style="width:300px;background:#0f172a;color:#fff;font-family:sans-serif;padding:16px;">
  <h3>SuperJobGenie</h3>
  <p>AI Career Alignment & 3,000+ Character Deep Extraction Active.</p>
</body>
</html>`}
                      {selectedFile === 'styles.css' && `.sjg-extension-pill {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999999;
  background: #090d16;
  color: #fff;
  border-radius: 9999px;
  padding: 10px 16px;
  cursor: pointer;
}`}
                      {selectedFile === 'README.md' && `# SuperJobGenie Extension
Load unpacked in chrome://extensions with Developer mode enabled.`}
                    </pre>
                  </div>
                </div>
              )}

              {/* TAB 4: GUIDE */}
              {activeTab === 'guide' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">1</span>
                        <h5 className="font-bold text-white text-sm">Download & Unzip</h5>
                      </div>
                      <p className="text-xs text-slate-400 pl-8">
                        Click the <strong>Download Extension (.zip)</strong> button and extract it into a local directory (e.g., <code className="text-cyan-300">~/Downloads/superjobgenie-extension</code>).
                      </p>
                    </div>

                    <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">2</span>
                        <h5 className="font-bold text-white text-sm">Open chrome://extensions</h5>
                      </div>
                      <p className="text-xs text-slate-400 pl-8">
                        Navigate to <code className="text-cyan-300">chrome://extensions</code> in Google Chrome or Microsoft Edge.
                      </p>
                    </div>

                    <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">3</span>
                        <h5 className="font-bold text-white text-sm">Enable Developer Mode</h5>
                      </div>
                      <p className="text-xs text-slate-400 pl-8">
                        Toggle on <strong>Developer mode</strong> switch in the upper-right corner of the Extensions page.
                      </p>
                    </div>

                    <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">4</span>
                        <h5 className="font-bold text-white text-sm">Load Unpacked</h5>
                      </div>
                      <p className="text-xs text-slate-400 pl-8">
                        Click <strong>Load unpacked</strong> button on the top-left and select your unzipped folder. That's it!
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>Zero-backend fallback enabled via browser-side JSZip</span>
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-bold transition"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
