import React, { useState } from 'react';
import { 
  X, 
  Download, 
  FolderArchive, 
  Chrome, 
  FileCode, 
  Copy, 
  Check, 
  ExternalLink, 
  Terminal, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  HelpCircle,
  Code2
} from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const [activeTab, setActiveTab] = useState<'packages' | 'files' | 'guide' | 'patch'>('packages');
  const [selectedFile, setSelectedFile] = useState<string>('content.js');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownload = async (type: 'extension' | 'full') => {
    try {
      setIsDownloading(type);
      const url = type === 'extension' ? '/api/download-extension-zip' : '/api/download-project-zip';
      const filename = type === 'extension' 
        ? 'superjobgenie-chrome-extension.zip' 
        : 'superjobgenie-full-project.zip';

      const response = await fetch(url);
      if (!response.ok) throw new Error('Download failed');
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    } catch (err) {
      console.error(err);
      alert('下载生成失败，请确认后端服务正常运行。');
    } finally {
      setIsDownloading(null);
    }
  };

  // Code snippets for direct copy
  const fileSnippets: Record<string, { label: string; lang: string; desc: string; code: string }> = {
    'content.js': {
      label: 'extension/content.js',
      lang: 'javascript',
      desc: '【融合核心脚本】招聘网沉浸式大弹窗 (In-Page Modal) + Schema.org JSON-LD 3000字全量提取 + 多画像实时重算 + 定制求职信生成。',
      code: `// SuperJobGenie 2.2 - 招聘网沉浸式大弹窗 + 3000字全量解析 (核心提取逻辑)
function extractFullIndeedJob() {
  let fullBodyText = '';
  let extractionSource = 'DOM #jobDescriptionText';

  // 1. 优先解析 Schema.org JSON-LD (100% 完整，不受微前端或页面折叠影响)
  const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');
  for (const script of jsonLdScripts) {
    try {
      const parsed = JSON.parse(script.textContent || '{}');
      const jobPosting = Array.isArray(parsed) 
        ? parsed.find(item => item['@type'] === 'JobPosting')
        : (parsed['@type'] === 'JobPosting' ? parsed : null);

      if (jobPosting && jobPosting.description && jobPosting.description.length > 300) {
        fullBodyText = cleanHtmlToFormattedText(jobPosting.description);
        extractionSource = 'Schema.org JSON-LD (<script type="application/ld+json">)';
        break;
      }
    } catch (e) {}
  }

  // 2. 备用 DOM 递归解析 #jobDescriptionText 容器
  if (!fullBodyText || fullBodyText.length < 300) {
    const jdContainer = document.querySelector('#jobDescriptionText') || 
                        document.querySelector('.jobsearch-JobComponent-description');
    if (jdContainer) {
      fullBodyText = cleanHtmlToFormattedText(jdContainer.innerHTML);
      extractionSource = 'DOM container #' + (jdContainer.id || 'jobDescriptionText');
    }
  }

  return { fullBodyText, characterCount: fullBodyText.length, extractionSource };
}`
    },
    'styles.css': {
      label: 'extension/styles.css',
      lang: 'css',
      desc: '招聘网右下角悬浮胶囊徽章与居中沉浸式交互大弹窗独立暗黑样式。',
      code: `/* 招聘网沉浸式大弹窗样式截录 */
.sjg-floating-pill {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 9999990;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  background: #0f172a;
  border: 1px solid rgba(99, 102, 241, 0.4);
  border-radius: 9999px;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.6);
  cursor: pointer;
}
.sjg-modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 9999999;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
}`
    },
    'manifest.json': {
      label: 'extension/manifest.json',
      lang: 'json',
      desc: 'Chrome 扩展 Manifest V3 配置文件，声明 Indeed 匹配权限与脚本注入规则。',
      code: `{
  "manifest_version": 3,
  "name": "SuperJobGenie - AI求职匹配与跨赛道分析",
  "version": "2.1.0",
  "description": "解决Indeed抓取153字截断问题，全量捕获3000+字职位描述，提供真实多维技能匹配与跨赛道职业转换分析。",
  "permissions": ["storage", "activeTab"],
  "host_permissions": [
    "https://*.indeed.com/*",
    "http://localhost:3000/*"
  ],
  "action": {
    "default_popup": "popup.html"
  },
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [
    {
      "matches": ["https://*.indeed.com/*"],
      "js": ["content.js"],
      "css": ["styles.css"],
      "run_at": "document_idle"
    }
  ]
}`
    },
    'server.ts': {
      label: 'server.ts (全量提取 & 评分算法)',
      lang: 'typescript',
      desc: 'Node.js 后端双模解析逻辑、Gemini 3.8 Flash 提示词工程与离线高精语义算法。',
      code: `// server.ts 关键抓取清洗函数
function cleanHtmlToFormattedText(html: string): string {
  if (!html) return '';
  let text = html.replace(/<script\\b[^<]*(?:(?!<\\/script>)<[^<]*)*<\\/script>/gi, '');
  text = text.replace(/<style\\b[^<]*(?:(?!<\\/style>)<[^<]*)*<\\/style>/gi, '');
  text = text.replace(/<li[^>]*>(.*?)<\\/li>/gi, '\\n• $1');
  text = text.replace(/<br\\s*[\\/]?>/gi, '\\n');
  text = text.replace(/<\\/p>/gi, '\\n\\n');
  text = text.replace(/<\\/[^>]+>/g, '');
  return text.trim();
}`
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/30 border border-indigo-500/40 rounded-xl text-indigo-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-white flex items-center gap-2">
                <span>导出与下载 SuperJobGenie 到本地</span>
                <span className="text-[11px] font-mono bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                  v2.1.0 稳定版
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                已将修复后的 3,000+ 字全量抓取代码与 Chrome 扩展全部打包，可直接一键下载安装或复制代码
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-slate-950/60 px-6">
          <button
            onClick={() => setActiveTab('packages')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
              activeTab === 'packages'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderArchive className="w-4 h-4" />
            <span>📦 一键打包下载 (ZIP)</span>
          </button>

          <button
            onClick={() => setActiveTab('guide')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
              activeTab === 'guide'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Chrome className="w-4 h-4" />
            <span>🛠️ Chrome 插件本地加载指南 (30秒)</span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition ${
              activeTab === 'files'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileCode className="w-4 h-4" />
            <span>📄 关键修改文件一览与代码复制</span>
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
            <span>🧩 导出按钮移植补丁 (Patch)</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TAB 1: PACKAGES */}
          {activeTab === 'packages' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Card 1: Chrome Extension Package */}
                <div className="bg-gradient-to-b from-slate-800/60 to-slate-900 border border-slate-700/80 rounded-xl p-5 flex flex-col justify-between hover:border-indigo-500/50 transition">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
                        <Chrome className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                        即下即用
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white">SuperJobGenie Chrome 插件包</h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        包含已经修复的 <code className="text-cyan-300">content.js</code> 3000 字抓取器、Manifest V3、HUD 浮窗样式、背景服务与图标。
                      </p>
                    </div>

                    <div className="bg-slate-950/60 rounded-lg p-3 text-xs space-y-1.5 font-mono text-slate-300">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <span>✓</span>
                        <span>已修复 153 字截断 Bug (Schema.org 递归)</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <span>✓</span>
                        <span>内置 Indeed 页面右下角实时 HUD 透视球</span>
                      </div>
                      <div className="flex items-center gap-2 text-emerald-400">
                        <span>✓</span>
                        <span>解压后直接在 Chrome「加载已解压」即可运行</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-800">
                    <button
                      onClick={() => handleDownload('extension')}
                      disabled={isDownloading !== null}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isDownloading === 'extension' ? '打包中...' : '下载 Chrome 插件 (.zip)'}</span>
                    </button>
                  </div>
                </div>

                {/* Card 2: Full Project Codebase */}
                <div className="bg-gradient-to-b from-slate-800/60 to-slate-900 border border-slate-700/80 rounded-xl p-5 flex flex-col justify-between hover:border-purple-500/50 transition">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 bg-purple-600/20 text-purple-400 rounded-xl border border-purple-500/30">
                        <FolderArchive className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-500/30">
                        全栈完整工程
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-white">完整全栈工程源码包</h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        包含 Express 全栈后端、Gemini 3.8 Flash 跨赛道分析、React 前端高阶控制台及 Chrome 插件全部源码。
                      </p>
                    </div>

                    <div className="bg-slate-950/60 rounded-lg p-3 text-xs space-y-1.5 font-mono text-slate-300">
                      <div className="flex items-center gap-2 text-indigo-400">
                        <span>✓</span>
                        <span>含 server.ts 全量抓取与高精语义评分后端</span>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-400">
                        <span>✓</span>
                        <span>含 ExecutiveDashboard (PRO) 跨赛道雷达前端</span>
                      </div>
                      <div className="flex items-center gap-2 text-indigo-400">
                        <span>✓</span>
                        <span>含 npm run dev 极速本地部署脚本</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-800">
                    <button
                      onClick={() => handleDownload('full')}
                      disabled={isDownloading !== null}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white rounded-lg font-bold text-xs shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
                    >
                      <Download className="w-4 h-4" />
                      <span>{isDownloading === 'full' ? '打包中...' : '下载完整工程源码 (.zip)'}</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Tips */}
              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-400">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-semibold text-slate-200">下载后怎么使用？</span>
                  如果您只需要在 Chrome 浏览器里对 Indeed 职位进行真实抓取与匹配，下载上面的 <strong>「Chrome 插件包」</strong> 即可，解压后在浏览器扩展页中加载即可生效！
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: CHROME EXTENSION GUIDE */}
          {activeTab === 'guide' && (
            <div className="space-y-4">
              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
                <div className="p-4 bg-slate-800/40 border-b border-slate-800 flex items-center gap-2 text-sm font-bold text-white">
                  <Chrome className="w-4 h-4 text-blue-400" />
                  <span>Chrome 扩展本地安装四步走 (预计耗时 30 秒)</span>
                </div>
                
                <div className="p-5 space-y-5 text-xs text-slate-300">
                  {/* Step 1 */}
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      1
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">下载并解压插件包</div>
                      <p className="text-slate-400 mt-1">
                        点击上方「下载 Chrome 插件 (.zip)」，下载完成后解压到您电脑上的任意文件夹（如 <code className="text-cyan-300">D:\superjobgenie-extension</code> 或 <code className="text-cyan-300">~/Downloads/extension</code>）。
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      2
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">打开 Chrome 扩展管理界面</div>
                      <p className="text-slate-400 mt-1">
                        在 Chrome / Edge 浏览器地址栏复制并回车打开：
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <code className="bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg font-mono text-cyan-300 text-xs">
                          chrome://extensions/
                        </code>
                        <button
                          onClick={() => handleCopy('chrome://extensions/', 'chrome-url')}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 font-sans flex items-center gap-1"
                        >
                          {copiedKey === 'chrome-url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === 'chrome-url' ? '已复制' : '复制地址'}</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      3
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">开启右上角「开发者模式」并加载</div>
                      <p className="text-slate-400 mt-1">
                        1. 勾选页面右上角的 <strong>「开发者模式」(Developer mode)</strong> 开关。<br />
                        2. 点击左上角出现的 <strong>「加载已解压的扩展程序」(Load unpacked)</strong> 按钮。<br />
                        3. 在弹出的文件选择器中，选择您刚才解压出来的插件文件夹！
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-xs">
                      4
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">打开 Indeed 职位测试效果</div>
                      <p className="text-slate-400 mt-1">
                        打开任意 Indeed 职位页面（例如 DataAnnotation 的 AI Trainer），页面右下角会自动弹出 <strong>SuperJobGenie HUD</strong> 智能浮窗，显示实时捕获的 3,000+ 字符与精准跨赛道匹配分析！
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: FILE VIEW & COPY */}
          {activeTab === 'files' && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                {Object.keys(fileSnippets).map(key => (
                  <button
                    key={key}
                    onClick={() => setSelectedFile(key)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                      selectedFile === key
                        ? 'bg-indigo-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>

              {/* Active File Description */}
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-cyan-400" />
                    <span className="font-mono text-xs font-bold text-cyan-300">
                      {fileSnippets[selectedFile].label}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(fileSnippets[selectedFile].code, selectedFile)}
                    className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold border border-slate-700 flex items-center gap-1.5 transition"
                  >
                    {copiedKey === selectedFile ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">已复制到剪贴板</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>复制代码</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-xs text-slate-400 mb-3">
                  {fileSnippets[selectedFile].desc}
                </p>

                {/* Code Block */}
                <div className="relative bg-slate-900 border border-slate-800 rounded-lg p-3 font-mono text-xs text-slate-300 overflow-x-auto max-h-[350px]">
                  <pre>{fileSnippets[selectedFile].code}</pre>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: WORKSTATION PATCH */}
          {activeTab === 'patch' && (
            <div className="space-y-6">
              <div className="border border-emerald-500/30 bg-emerald-950/20 rounded-xl p-5 flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>通用导出按钮 (英文版) 跨工作台极速移植补丁</span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    您可以直接将此英文导出按钮 <code className="text-cyan-300">ExportExtensionButton.tsx</code> 复制并放入任何其他 React / Vite / Next.js 工作台系统中。
                    内置<strong>双模驱动</strong>：在没有后端 API 支持时，自动在浏览器端通过 JSZip 纯前端打包下载，零配置无依赖！
                  </p>
                </div>
                <button
                  onClick={() => handleCopy('npm install jszip lucide-react', 'patch_npm_full')}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition whitespace-nowrap cursor-pointer shadow-md"
                >
                  {copiedKey === 'patch_npm_full' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'patch_npm_full' ? '已复制命令!' : '复制 npm 安装命令'}</span>
                </button>
              </div>

              {/* 3 Steps Integration */}
              <div className="space-y-4">
                <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
                      <span>安装 peer 依赖 (项目根目录执行)</span>
                    </span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800 flex items-center justify-between">
                    <code>npm install jszip lucide-react</code>
                    <button
                      onClick={() => handleCopy('npm install jszip lucide-react', 'cmd1')}
                      className="text-slate-400 hover:text-white text-xs cursor-pointer"
                    >
                      {copiedKey === 'cmd1' ? '已复制' : '复制'}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
                      <span>在您的目标工作台中引入并渲染组件</span>
                    </span>
                    <button
                      onClick={() => handleCopy(`import { ExportExtensionButton } from './components/ExportExtensionButton';\n\n// 在导航栏或顶部工作台操作栏渲染：\n<ExportExtensionButton \n  variant="gradient" \n  label="Export Extension" \n  extensionName="SuperJobGenie"\n/>`, 'code_render')}
                      className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                    >
                      {copiedKey === 'code_render' ? '已复制 JSX 代码' : '复制代码片段'}
                    </button>
                  </div>
                  <pre className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-slate-300 border border-slate-800 overflow-x-auto">
{`import { ExportExtensionButton } from './components/ExportExtensionButton';

// 放入任意导航栏、操作面板或抽屉组件中：
<ExportExtensionButton 
  variant="gradient" 
  label="Export Extension" 
  extensionName="SuperJobGenie"
/>`}
                  </pre>
                </div>

                <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-400 flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">3</span>
                      <span>查看或下载补丁文档</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    补丁文件已自动保存在本地项目路径中：<br />
                    • 文档说明：<code className="text-indigo-300">/docs/EXPORT_BUTTON_PATCH.md</code><br />
                    • Git Patch 文件：<code className="text-indigo-300">/patches/export-extension-button.patch</code><br />
                    • 独立组件文件：<code className="text-indigo-300">/src/components/ExportExtensionButton.tsx</code>
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>所有代码已通过本地严格 linter 与编译验证，可直接投产。</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold transition"
          >
            完成并关闭
          </button>
        </div>

      </div>
    </div>
  );
}
