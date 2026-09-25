# Export Extension Button - Plug-and-Play Patch for Workstations

> **Overview**: This patch allows you to drop the exact **"Export Extension"** button into **any other React / Vite / Next.js workbench**.
> It includes an automatic dual-engine: if a backend zip endpoint is available, it downloads from the server; if not, it automatically builds and packages the Chrome Extension (Manifest V3) **completely in the browser using client-side JSZip** with zero server dependencies!

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install Peer Dependencies
In your destination workbench project root, run:
```bash
npm install jszip lucide-react
# or
yarn add jszip lucide-react
# or
pnpm add jszip lucide-react
```

### Step 2: Copy Component to Your Project
Create file `src/components/ExportExtensionButton.tsx` and paste the component code below (or use the patch file).

### Step 3: Render Anywhere in Your Header or Toolbar
```tsx
import { ExportExtensionButton } from './components/ExportExtensionButton';

export function YourHeader() {
  return (
    <header className="flex items-center justify-between p-4 bg-slate-900 text-white">
      <h1 className="font-bold">My Custom Workbench</h1>
      
      {/* Plug-and-play Export Extension button in English */}
      <ExportExtensionButton 
        variant="gradient" 
        label="Export Extension" 
        extensionName="SuperJobGenie"
      />
    </header>
  );
}
```

---

## 🎨 Available Button Variants & Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | `'Export Extension'` | Text displayed on the primary button |
| `variant` | `'gradient' \| 'primary' \| 'outline' \| 'compact' \| 'subtle'` | `'gradient'` | Visual styling preset |
| `apiEndpoint` | `string` | `'/api/download-extension-zip'` | Server endpoint (optional; auto-falls back to client-side JSZip) |
| `extensionName`| `string` | `'SuperJobGenie'` | Name used in generated Manifest and ZIP filename |
| `className` | `string` | `''` | Extra CSS class overrides |
| `onExportSuccess`| `(filename: string) => void` | `undefined` | Callback fired when ZIP generation completes |

---

## 🛠️ (Optional) Server-Side Express Route
If you also want your backend Node/Express server to serve pre-bundled files from a local `/extension` directory:

```ts
import JSZip from 'jszip';
import fs from 'fs';
import path from 'path';

function addDirectoryToZip(zip: JSZip, localDirPath: string, zipPrefix: string = '') {
  if (!fs.existsSync(localDirPath)) return;
  const items = fs.readdirSync(localDirPath);
  for (const item of items) {
    const itemPath = path.join(localDirPath, item);
    const stat = fs.statSync(itemPath);
    const zipPath = zipPrefix ? `${zipPrefix}/${item}` : item;
    if (stat.isDirectory()) {
      addDirectoryToZip(zip, itemPath, zipPath);
    } else {
      zip.file(zipPath, fs.readFileSync(itemPath));
    }
  }
}

app.get('/api/download-extension-zip', async (_req, res) => {
  try {
    const zip = new JSZip();
    addDirectoryToZip(zip, path.join(__dirname, 'extension'), '');
    const content = await zip.generateAsync({ type: 'nodebuffer' });
    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename="chrome-extension.zip"');
    return res.send(content);
  } catch (err) {
    res.status(500).send('Zip generation failed');
  }
});
```

---

## 🧩 Chrome Extension Loading Guide (for End-Users)
1. Unzip the downloaded `.zip` file.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer mode** (top-right switch).
4. Click **Load unpacked** (top-left) and select the unzipped directory.
5. The extension will activate automatically on target job boards.
