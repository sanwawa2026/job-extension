import React, { useState } from 'react';
import { 
  Bookmark, 
  ThumbsDown, 
  Share2, 
  Check, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Code, 
  ExternalLink,
  Layers,
  ArrowRight,
  Database
} from 'lucide-react';
import { ExtractedJobData } from '../types';
import { FULL_INDEED_AI_TRAINER_JD, FULL_INDEED_SENIOR_BACKEND_JD } from '../data/sampleData';

interface IndeedSimulatorProps {
  currentJob: ExtractedJobData;
  isBuggyMode: boolean;
  onSelectPreset: (preset: ExtractedJobData) => void;
  onCustomExtract: (input: string) => void;
  isLoading: boolean;
}

export const IndeedSimulator: React.FC<IndeedSimulatorProps> = ({
  currentJob,
  isBuggyMode,
  onSelectPreset,
  onCustomExtract,
  isLoading,
}) => {
  const [activeTab, setActiveTab] = useState<'job' | 'diagnostics' | 'custom'>('job');
  const [customInput, setCustomInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [highlightMode, setHighlightMode] = useState<'none' | '153snippet' | 'fullTree'>('none');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    onCustomExtract(customInput.trim());
  };

  return (
    <div className="w-full bg-white text-slate-900 rounded-xl shadow-xl border border-slate-200 overflow-hidden flex flex-col font-sans min-h-[850px]">
      {/* Indeed Browser Navigation / Simulator Bar */}
      <div className="bg-slate-100 px-4 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-black text-blue-700 text-sm tracking-tight flex items-center gap-1">
            indeed
            <span className="text-[10px] font-normal text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded">Live Page View</span>
          </span>
          <span className="text-slate-300">|</span>
          <div className="flex items-center gap-1.5 bg-white border border-slate-300 rounded-md px-2 py-1 text-slate-600 font-mono text-[11px] max-w-md truncate">
            <Search className="w-3 h-3 text-slate-400 shrink-0" />
            <span className="truncate">indeed.com/viewjob?jk=7249c5e&q=Product+Analyst+AI+Trainer</span>
          </div>
        </div>

        {/* Preset Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-slate-500 font-medium">快速切换职位:</span>
          <button
            onClick={() => onSelectPreset(FULL_INDEED_AI_TRAINER_JD)}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
              currentJob.title.includes('AI Trainer')
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            AI Trainer (截图原题)
          </button>
          <button
            onClick={() => onSelectPreset(FULL_INDEED_SENIOR_BACKEND_JD)}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition ${
              currentJob.title.includes('Staff / Senior Backend')
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            Senior Backend (直通对照)
          </button>
          <button
            onClick={() => setActiveTab(activeTab === 'custom' ? 'job' : 'custom')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition flex items-center gap-1 ${
              activeTab === 'custom'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Code className="w-3 h-3" />
            <span>自定义抓取</span>
          </button>
        </div>
      </div>

      {/* Scraper Inspection Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white px-4 py-2 flex flex-wrap items-center justify-between text-xs gap-2">
        <div className="flex items-center gap-2">
          <span className="font-bold text-cyan-400 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" />
            抓取诊断透视器:
          </span>
          <span className="text-slate-300">
            抓取源: <code className="text-amber-300 bg-slate-800 px-1 py-0.5 rounded font-mono text-[11px]">{currentJob.extractionSource}</code>
          </span>
          <span className="text-slate-400">|</span>
          <span className="text-slate-300">
            捕获统计: <strong className="text-emerald-400">{currentJob.characterCount}</strong> 字符 / <strong className="text-emerald-400">{currentJob.wordCount}</strong> 单词
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setHighlightMode(highlightMode === '153snippet' ? 'none' : '153snippet')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition ${
              highlightMode === '153snippet'
                ? 'bg-amber-500 text-slate-950 border-amber-400'
                : 'bg-slate-800 text-amber-300 border-amber-500/40 hover:bg-slate-700'
            }`}
          >
            {highlightMode === '153snippet' ? '✓ 正在高亮 153字残缺区域' : '高亮 153字残缺区域'}
          </button>

          <button
            onClick={() => setHighlightMode(highlightMode === 'fullTree' ? 'none' : 'fullTree')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold border transition ${
              highlightMode === 'fullTree'
                ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                : 'bg-slate-800 text-emerald-300 border-emerald-500/40 hover:bg-slate-700'
            }`}
          >
            {highlightMode === 'fullTree' ? '✓ 正在高亮 3000字全量DOM' : '高亮 3000字全量DOM'}
          </button>
        </div>
      </div>

      {/* Custom Scraper Input Panel (Collapsible) */}
      {activeTab === 'custom' && (
        <div className="p-4 bg-indigo-50 border-b border-indigo-200">
          <form onSubmit={handleCustomSubmit} className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="font-bold text-xs text-indigo-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                输入任何 Indeed 职位链接、完整 HTML 源码或职位描述文本进行全量提取:
              </label>
              <button
                type="button"
                onClick={() => setActiveTab('job')}
                className="text-xs text-slate-500 hover:text-slate-800"
              >
                收起
              </button>
            </div>
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="粘贴 Indeed 网页链接 (例如 https://www.indeed.com/viewjob?jk=...) 或粘贴完整的岗位 HTML / 纯文本..."
              rows={4}
              className="w-full p-2.5 text-xs font-mono bg-white border border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setCustomInput(FULL_INDEED_AI_TRAINER_JD.fullBodyText)}
                className="px-3 py-1 text-xs bg-slate-200 hover:bg-slate-300 rounded text-slate-700"
              >
                填入 AI Trainer 3000字
              </button>
              <button
                type="submit"
                disabled={isLoading || !customInput.trim()}
                className="px-4 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow disabled:opacity-50"
              >
                {isLoading ? '正在深度解析...' : '执行 3000字 深度抓取'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Indeed Job Page View (Exact visual replica of user's screenshot) */}
      <div className="p-6 md:p-8 flex-1 overflow-y-auto max-w-4xl">
        {/* Job Header */}
        <div className="space-y-2 pb-6 border-b border-slate-200">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
            {currentJob.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-700">
            <span className="font-semibold text-blue-700 hover:underline cursor-pointer">
              {currentJob.company}
            </span>
            <span>•</span>
            <span>{currentJob.location}</span>
            <span>•</span>
            <span className="font-semibold text-slate-900">{currentJob.salary}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-3">
            <button className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-lg shadow-sm transition flex items-center gap-1.5">
              <span>Apply with Indeed</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setIsSaved(!isSaved)}
              className={`p-2.5 border rounded-lg transition ${
                isSaved ? 'bg-blue-50 border-blue-300 text-blue-600' : 'border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
              title="Save Job"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button className="p-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition" title="Not Interested">
              <ThumbsDown className="w-4 h-4" />
            </button>
            <button className="p-2.5 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition" title="Share Job">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Job Description Body */}
        <div className="pt-6 space-y-6 text-sm text-slate-800 leading-relaxed">
          {/* Section 1: Intro paragraph (Where the 153 chars cut off) */}
          <div 
            className={`p-3 rounded-lg transition-all ${
              highlightMode === '153snippet' 
                ? 'bg-amber-100 border-2 border-amber-500 shadow-md' 
                : highlightMode === 'fullTree'
                ? 'bg-emerald-50/50 border border-emerald-300'
                : ''
            }`}
          >
            {highlightMode === '153snippet' && (
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>⚠️ [原Bug诊断] 旧抓取器仅捕获了这前 153 个字符，其余关键技能全部丢弃！</span>
              </div>
            )}
            <p className="text-slate-700">
              We are looking for a Product Analyst - AI Trainer to evaluate and improve cutting-edge AI models for quantitative reasoning and software analysis. (This initial assessment is our version of an interview). If you pass, you'll receive an email confirmation, and paid work will become available on our platform.
            </p>
          </div>

          {/* Section 2: Benefits */}
          <div className={highlightMode === 'fullTree' ? 'p-3 bg-emerald-50/50 border border-emerald-300 rounded-lg' : ''}>
            <h3 className="text-base font-bold text-slate-900 mb-2">Benefits:</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>
                <strong className="text-slate-900">Fully remote:</strong> work from anywhere in the US, Canada, UK, Ireland, Australia, and New Zealand.
              </li>
              <li>
                <strong className="text-slate-900">Flexible schedule:</strong> choose which projects you take on and when you work.
              </li>
              <li>
                <strong className="text-slate-900">Competitive pay:</strong> projects are paid hourly, up to $60 USD per hour. Opportunities for higher-paying projects are available with strong performance ($50 - $100/hr).
              </li>
              <li>
                <strong className="text-slate-900">Impact:</strong> help shape the future of AI systems built to reason about data and analytics.
              </li>
            </ul>
          </div>

          {/* Section 3: Responsibilities */}
          <div className={highlightMode === 'fullTree' ? 'p-3 bg-emerald-50/50 border border-emerald-300 rounded-lg' : ''}>
            <h3 className="text-base font-bold text-slate-900 mb-2">Responsibilities:</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>
                Evaluate AI-generated quantitative work, including statistical analysis, predictive modeling, scientific reasoning, and data-driven insights, for technical accuracy and real-world validity.
              </li>
              <li>
                Design and solve quantitative problems used to train and benchmark AI systems, spanning areas like forecasting, experimental analysis, optimization, and statistical inference.
              </li>
              <li>
                Write clear technical explanations and well-documented analytical code.
              </li>
              <li>
                Provide feedback that directly shapes the next generation of AI models built for quantitative reasoning.
              </li>
              <li>
                Benchmark code and algorithm generation in Python, SQL, and mathematical computation pipelines.
              </li>
            </ul>
          </div>

          {/* Section 4: Qualifications */}
          <div className={highlightMode === 'fullTree' ? 'p-3 bg-emerald-50/50 border border-emerald-300 rounded-lg' : ''}>
            <h3 className="text-base font-bold text-slate-900 mb-2">Qualifications:</h3>
            <ul className="list-disc pl-5 space-y-2 text-slate-700">
              <li>
                2+ years of hands-on experience in a quantitative role or research environment — such as data science, statistics, economics, finance, physics, biology, epidemiology, operations research, or any adjacent field.
              </li>
              <li>
                Some coding experience required, with comfort writing and reviewing analytical code end-to-end (Python, R, SQL, or algorithmic script).
              </li>
              <li>
                Practical experience with statistical methods, predictive modeling, and experiment design (e.g., A/B testing, hypothesis testing, regression, classification, time-series forecasting).
              </li>
              <li>
                Fluency in English (native or bilingual level) with strong writing skills.
              </li>
              <li>
                A bachelor's degree in a quantitative field is preferred (Statistics, Computer Science, Mathematics, Engineering, or similar); a master's or PhD is a plus.
              </li>
              <li>
                Relevant credentials are a plus (e.g., Kaggle Competition ranking, AWS/GCP ML certifications, or equivalent demonstrated expertise).
              </li>
            </ul>
          </div>

          {/* Section 5: Note */}
          <div className="pt-2 text-xs text-slate-500 border-t border-slate-200">
            <p>
              <strong className="text-slate-700">Note:</strong> Payment is made via PayPal. We will never ask for any money from you. This job is only available to those in the US, Canada, UK, Ireland, Australia, and New Zealand.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
