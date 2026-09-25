import React, { useState } from 'react';
import { 
  Crown, 
  X, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Code, 
  Layers, 
  ArrowRight, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  BookOpen, 
  TrendingUp, 
  Compass, 
  Briefcase,
  Award,
  Terminal,
  Cpu
} from 'lucide-react';
import { MatchAnalysisResult, ExtractedJobData, CandidateProfile } from '../types';

interface ExecutiveDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  jobData: ExtractedJobData;
  matchResult: MatchAnalysisResult;
  candidate: CandidateProfile;
  isBuggyMode: boolean;
  onToggleBuggyMode: () => void;
}

export const ExecutiveDashboard: React.FC<ExecutiveDashboardProps> = ({
  isOpen,
  onClose,
  activeTab,
  onTabChange,
  jobData,
  matchResult,
  candidate,
  isBuggyMode,
  onToggleBuggyMode,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const navItems = [
    { id: 'diagnostics', label: '抓取底层诊断 (153 vs 3000)', icon: Terminal },
    { id: 'matrix', label: '真实验证矩阵 (Skill Gap)', icon: CheckCircle2 },
    { id: 'pivot', label: '跨赛道深度分析 (Career Pivot)', icon: Compass },
    { id: 'bullets', label: '简历重构与优化 (Rewrites)', icon: Sparkles },
    { id: 'letters', label: '高定求职信 (3-Tier & 4-Tier)', icon: FileText },
    { id: 'profile', label: '候选人画像 (15年架构师)', icon: Briefcase },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-950/80 backdrop-blur-md font-sans">
      <div className="w-full max-w-6xl h-[92vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Crown className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-black tracking-tight text-white">
                  SUPERJOBGENIE EXECUTIVE DASHBOARD
                </h2>
                <span className="bg-amber-500/20 text-amber-300 text-xs font-bold px-2 py-0.5 rounded-full border border-amber-500/30">
                  PRO SUITE
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Indeed 全量无损抓取引擎 • 真实技能多维比对 • 跨赛道转型导航
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick Toggle Buggy vs Fixed */}
            <button
              onClick={onToggleBuggyMode}
              className={`text-xs px-3 py-1.5 rounded-lg font-semibold border transition flex items-center gap-1.5 ${
                isBuggyMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}
            >
              <span>模式: {isBuggyMode ? '⚠️ 153字残缺 (模拟Bug)' : '✅ 3000+字全量抓取 (已修复)'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-6 bg-slate-950/60 border-b border-slate-800 flex space-x-1 overflow-x-auto scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (activeTab === 'cover-letter' && item.id === 'letters') || (activeTab === 'cover-letter-pro' && item.id === 'letters');
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
                  isActive
                    ? 'border-cyan-400 text-cyan-300 bg-cyan-950/30'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6 text-sm">
          {/* TAB 1: DIAGNOSTICS (153 vs 3000 Chars) */}
          {activeTab === 'diagnostics' && (
            <div className="space-y-6">
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-base mb-2">
                  <Terminal className="w-5 h-5" />
                  <h3>Indeed 抓取底层机理透视：为什么此前会截断成 153 个字？</h3>
                </div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  在现代 Indeed 页面中，岗位正文不仅由客户端微前端动态渲染，而且在 DOM 树中包含多层嵌套结构：
                  首段问候语刚好是 <code className="bg-slate-950 text-amber-300 px-1.5 py-0.5 rounded font-mono">153 个字符</code>。
                  旧脚本使用 <code className="bg-slate-950 text-cyan-300 px-1.5 py-0.5 rounded font-mono">.jobsearch-JobComponent-description p</code> 或列表概览选择器 <code className="bg-slate-950 text-cyan-300 px-1.5 py-0.5 rounded font-mono">.job-snippet</code>，直接在第一个子节点返回了文本，导致后续的 <strong>Benefits</strong>、<strong>Responsibilities</strong> 以及最核心的 <strong>Qualifications（A/B测试、时间序列、预测建模、Kaggle）</strong> 全部被截断丢弃！
                </p>
              </div>

              {/* Side-by-side comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: The 153 Chars Bug */}
                <div className="bg-slate-950/80 border border-rose-500/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold text-rose-400 text-sm">
                      <AlertTriangle className="w-4 h-4" />
                      修复前: 153 字截断残缺 (Bug 状态)
                    </span>
                    <span className="bg-rose-500/20 text-rose-300 text-xs font-mono px-2 py-0.5 rounded-full border border-rose-500/30">
                      153 字符 / 1 项技能
                    </span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-rose-200/90 leading-relaxed">
                    {matchResult.diagnosticComparison.buggy153CharResult.falsityReason}
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="text-slate-400">捕获的残缺片段:</div>
                    <blockquote className="p-2.5 bg-rose-950/30 border-l-2 border-rose-500 text-slate-300 italic text-[11px]">
                      "{jobData.rawTruncatedSnippet153}"
                    </blockquote>
                  </div>

                  <div className="p-3 bg-amber-950/30 border border-amber-500/30 rounded-lg text-xs space-y-1">
                    <div className="font-bold text-amber-300">造成后果:</div>
                    <p className="text-slate-300">
                      • JD 里仅扫描到单词 "AI"（1 项技能）。<br />
                      • 候选人标签恰好含 "AI"，系统算出 1/1 = 100% (虚假 98% 满配)。<br />
                      • 真实的统计学、量化科学、A/B测试要求彻底隐形！
                    </p>
                  </div>
                </div>

                {/* Right: The 3000+ Chars Full Traversal Fix */}
                <div className="bg-slate-950/80 border border-emerald-500/40 rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-bold text-emerald-400 text-sm">
                      <CheckCircle2 className="w-4 h-4" />
                      修复后: 3000+ 字全量深层抓取 (SuperJobGenie 2.0)
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 text-xs font-mono px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {jobData.characterCount} 字符 / 14+ 项技能
                    </span>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-emerald-200/90 leading-relaxed">
                    {matchResult.diagnosticComparison.fixed3000CharResult.truthSummary}
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="text-slate-400">完整提取源与选择器:</div>
                    <div className="p-2.5 bg-emerald-950/30 border-l-2 border-emerald-500 text-slate-300 text-[11px] space-y-1">
                      <div>• <strong>主通道:</strong> <code className="text-cyan-300">div#jobDescriptionText</code> 递归子节点遍历 (ul, li, p, h3)</div>
                      <div>• <strong>备用通道:</strong> <code className="text-amber-300">&lt;script type="application/ld+json"&gt;</code> Schema.org 原生 JobPosting 解析</div>
                      <div>• <strong>真实评分:</strong> 54% 跨赛道高潜力转移 (客观真实，杜绝虚假98%)</div>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-950/30 border border-emerald-500/30 rounded-lg text-xs space-y-1">
                    <div className="font-bold text-emerald-300">赋能价值:</div>
                    <p className="text-slate-300">
                      • 准确捕获候选人具备的代码评审(Python/SQL/AWS)优势。<br />
                      • 诚实指出缺失的 A/B Testing 与统计假设检验短板。<br />
                      • 自动激活「跨赛道分析」与「高定求职信」，指导如何以15年架构师的工程严谨度说服面试官！
                    </p>
                  </div>
                </div>
              </div>

              {/* Code Solution snippet */}
              <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-400 font-bold flex items-center gap-1.5">
                    <Code className="w-4 h-4" />
                    核心解析修复方案 (DOM递归 + Schema.org 双重冗余):
                  </span>
                  <button
                    onClick={() => handleCopy(`// SuperJobGenie Indeed 深度提取修复代码
function extractIndeedFullDescription(doc) {
  // 1. 优先读取 Schema.org JSON-LD (包含 100% 原始完整未截断描述)
  const ldJsonScripts = doc.querySelectorAll('script[type="application/ld+json"]');
  for (const s of ldJsonScripts) {
    try {
      const data = JSON.parse(s.textContent);
      const posting = Array.isArray(data) ? data.find(i => i['@type'] === 'JobPosting') : (data['@type'] === 'JobPosting' ? data : null);
      if (posting && posting.description) return cleanHtml(posting.description);
    } catch (e) {}
  }
  // 2. 深度提取 #jobDescriptionText 所有子节点，保留段落与列表，告别 153 字
  const container = doc.querySelector('#jobDescriptionText') || doc.querySelector('[data-testid="jobDescriptionText"]');
  if (container) {
    return Array.from(container.children).map(el => el.innerText.trim()).filter(Boolean).join('\\n\\n');
  }
  return '';
}`, 'fix-code')}
                    className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded transition"
                  >
                    {copiedKey === 'fix-code' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>复制代码</span>
                  </button>
                </div>
                <pre className="p-3 bg-slate-900 rounded-lg text-slate-300 font-mono text-[11px] overflow-x-auto leading-relaxed">
{`// 1. 解决 153 字被截断的关键：Indeed 的微前端正文在 #jobDescriptionText
const container = document.querySelector('#jobDescriptionText') 
               || document.querySelector('[data-testid="jobDescriptionText"]');

// 2. 递归遍历所有段落与列表项，而非仅仅抓取 firstElementChild 或 .job-snippet
const fullText = Array.from(container.querySelectorAll('p, li, h1, h2, h3, div'))
  .map(el => el.innerText.trim())
  .filter(Boolean)
  .join('\\n'); // 恢复完整 3000+ 字正文！`}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 2: SKILL MATRIX */}
          {activeTab === 'matrix' && (
            <div className="space-y-6">
              {/* Score Breakdown Bar Charts */}
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    多维评分模型拆解 (真实综合得分: {matchResult.overallMatchScore}分)
                  </h3>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-950 px-2.5 py-1 rounded border border-cyan-500/30">
                    {matchResult.matchTier}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Item 1 */}
                  <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 space-y-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-300">核心硬技术能力 (Python/SQL/算法)</span>
                      <span className="text-cyan-400 font-mono">
                        {matchResult.scoreBreakdown.coreTechnicalSkills.score} / {matchResult.scoreBreakdown.coreTechnicalSkills.max}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-cyan-500 h-full rounded-full transition-all"
                        style={{ width: `${(matchResult.scoreBreakdown.coreTechnicalSkills.score / matchResult.scoreBreakdown.coreTechnicalSkills.max) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-slate-400 text-[11px]">{matchResult.scoreBreakdown.coreTechnicalSkills.details}</p>
                  </div>

                  {/* Item 2 */}
                  <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 space-y-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-300">领域研究与量化方法 (统计/A-B测试/预测)</span>
                      <span className="text-amber-400 font-mono">
                        {matchResult.scoreBreakdown.domainAndMethodology.score} / {matchResult.scoreBreakdown.domainAndMethodology.max}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-amber-500 h-full rounded-full transition-all"
                        style={{ width: `${(matchResult.scoreBreakdown.domainAndMethodology.score / matchResult.scoreBreakdown.domainAndMethodology.max) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-slate-400 text-[11px]">{matchResult.scoreBreakdown.domainAndMethodology.details}</p>
                  </div>

                  {/* Item 3 */}
                  <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 space-y-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-300">资历年限与架构把控 (15年工程严谨度)</span>
                      <span className="text-emerald-400 font-mono">
                        {matchResult.scoreBreakdown.seniorityAndArchitecture.score} / {matchResult.scoreBreakdown.seniorityAndArchitecture.max}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full transition-all"
                        style={{ width: `${(matchResult.scoreBreakdown.seniorityAndArchitecture.score / matchResult.scoreBreakdown.seniorityAndArchitecture.max) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-slate-400 text-[11px]">{matchResult.scoreBreakdown.seniorityAndArchitecture.details}</p>
                  </div>

                  {/* Item 4 */}
                  <div className="bg-slate-900/80 p-3.5 rounded-lg border border-slate-800 space-y-2">
                    <div className="flex justify-between font-semibold">
                      <span className="text-slate-300">学历背景与资质加分 (CS学位/AWS/Kaggle)</span>
                      <span className="text-purple-400 font-mono">
                        {matchResult.scoreBreakdown.educationAndCredentials.score} / {matchResult.scoreBreakdown.educationAndCredentials.max}
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-purple-500 h-full rounded-full transition-all"
                        style={{ width: `${(matchResult.scoreBreakdown.educationAndCredentials.score / matchResult.scoreBreakdown.educationAndCredentials.max) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-slate-400 text-[11px]">{matchResult.scoreBreakdown.educationAndCredentials.details}</p>
                  </div>
                </div>
              </div>

              {/* Verified vs Gaps List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Verified Skills */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-emerald-400 text-xs flex items-center gap-1.5 uppercase">
                      <CheckCircle2 className="w-4 h-4" />
                      已验证能力 (Verified Skills - 共 {matchResult.verifiedSkills.length} 项)
                    </h4>
                  </div>
                  <div className="space-y-2.5">
                    {matchResult.verifiedSkills.map((skill, idx) => (
                      <div key={idx} className="p-3 bg-slate-950/70 border border-emerald-500/20 rounded-lg space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                            {skill.name}
                          </span>
                          <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-500/30">
                            {skill.category}
                          </span>
                        </div>
                        <p className="text-slate-300 text-[11px]">
                          <strong className="text-slate-400">简历实证:</strong> {skill.resumeEvidence}
                        </p>
                        <p className="text-slate-400 text-[11px] italic">
                          <strong className="text-slate-400 not-italic">JD 需求:</strong> {skill.jdContext}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Missing Skill Gaps */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-amber-400 text-xs flex items-center gap-1.5 uppercase">
                      <AlertTriangle className="w-4 h-4" />
                      技能缺口与弥补建议 (Skill Gaps - 共 {matchResult.missingSkillGaps.length} 项)
                    </h4>
                  </div>
                  <div className="space-y-2.5">
                    {matchResult.missingSkillGaps.map((gap, idx) => (
                      <div key={idx} className="p-3 bg-slate-950/70 border border-amber-500/20 rounded-lg space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                            {gap.name}
                          </span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                            gap.importance === 'Crucial' ? 'bg-rose-950 text-rose-300 border border-rose-500/30' : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                          }`}>
                            {gap.importance === 'Crucial' ? '核心必备' : '推荐加分'}
                          </span>
                        </div>
                        <p className="text-cyan-300 text-[11px]">
                          <strong className="text-slate-400">弥补策略:</strong> {gap.howToBridge}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CAREER PIVOT ENGINE */}
          {activeTab === 'pivot' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-indigo-950/80 border border-indigo-500/40 rounded-xl p-5 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      跨赛道转型可行性深度诊断 (Career Pivot Blueprint)
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">
                      {matchResult.careerPivot.fromTrack} <ArrowRight className="inline w-4 h-4 mx-1 text-cyan-400" /> {matchResult.careerPivot.toTrack}
                    </h3>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">转型可行性指数:</div>
                    <div className="text-xl font-black text-emerald-400">
                      {matchResult.careerPivot.pivotFeasibilityScore}/100 ({matchResult.careerPivot.pivotFeasibility})
                    </div>
                  </div>
                </div>

                <div className="p-3.5 bg-slate-950/70 border border-indigo-500/20 rounded-lg text-xs text-slate-200 leading-relaxed">
                  <strong className="text-cyan-300">核心转型叙事 (The Pivot Narrative): </strong>
                  {matchResult.careerPivot.keyPivotNarrative}
                </div>
              </div>

              {/* Transferable Superpowers */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  你作为 15 年软件架构师的「不可替代降维优势」 (Transferable Superpowers)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {matchResult.careerPivot.transferableSuperpowers.map((power, idx) => (
                    <div key={idx} className="p-4 bg-slate-950/70 border border-slate-800 rounded-xl space-y-2 text-xs">
                      <div className="w-7 h-7 rounded-lg bg-cyan-950 text-cyan-400 flex items-center justify-center font-bold text-xs border border-cyan-500/30">
                        0{idx + 1}
                      </div>
                      <p className="text-slate-200 font-medium leading-relaxed">{power}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3-Phase Roadmap */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Compass className="w-4 h-4 text-amber-400" />
                  三阶段应聘与通关路线图 (Phase-by-Phase Roadmap)
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {matchResult.careerPivot.gapBridgingRoadmap.map((step, idx) => (
                    <div key={idx} className="p-4 bg-slate-950/70 border border-amber-500/20 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-300">{step.phase}</span>
                        <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded font-mono">
                          {step.timeframe}
                        </span>
                      </div>
                      <p className="text-slate-300 text-xs leading-relaxed">{step.action}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview Talking Points */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  面试问答高分金句 (Interview Talking Points)
                </h4>
                <div className="space-y-2.5">
                  {matchResult.careerPivot.interviewTalkingPoints.map((point, idx) => (
                    <div key={idx} className="p-3 bg-slate-950/70 border border-slate-800 rounded-lg flex items-start gap-3 text-xs">
                      <span className="text-cyan-400 font-black text-sm shrink-0">“</span>
                      <p className="text-slate-200 leading-relaxed">{point}</p>
                      <button
                        onClick={() => handleCopy(point, `talking-${idx}`)}
                        className="ml-auto text-slate-400 hover:text-white shrink-0 p-1"
                        title="复制金句"
                      >
                        {copiedKey === `talking-${idx}` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BULLET REWRITES */}
          {activeTab === 'bullets' && (
            <div className="space-y-6">
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <h3>简历针对性重构 (Resume Bullets Optimizer)</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  将原本纯粹的“后端开发与微服务运维”经历，针对该 JD 进行<strong>量化分析、代码审校与算法评测</strong>视角的精修重构。直接复制替换到简历中，可显著提升通过率！
                </p>
              </div>

              <div className="space-y-4">
                {matchResult.resumeRewrites.map((rewrite, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-400">重构案例 #{idx + 1}</span>
                      <button
                        onClick={() => handleCopy(rewrite.optimizedBullet, `bullet-${idx}`)}
                        className="flex items-center gap-1 px-2.5 py-1 bg-cyan-600 hover:bg-cyan-500 text-white rounded font-medium text-[11px] transition shadow"
                      >
                        {copiedKey === `bullet-${idx}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        <span>复制精修经历</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div className="p-3 bg-rose-950/20 border border-rose-500/20 rounded-lg space-y-1">
                        <div className="text-rose-400 font-bold text-[11px]">原简历表述 (侧重传统后端):</div>
                        <p className="text-slate-300 leading-relaxed">{rewrite.originalExperience}</p>
                      </div>

                      <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded-lg space-y-1">
                        <div className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          精修重构 (针对 AI Trainer / 量化分析):
                        </div>
                        <p className="text-emerald-200 font-medium leading-relaxed">{rewrite.optimizedBullet}</p>
                      </div>
                    </div>

                    <div className="text-[11px] text-cyan-300 bg-slate-900 px-3 py-1.5 rounded border border-slate-800">
                      <strong>💡 赋能效果:</strong> {rewrite.pivotImpact}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: COVER LETTERS */}
          {(activeTab === 'letters' || activeTab === 'cover-letter' || activeTab === 'cover-letter-pro') && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 3-Tier Standard */}
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white text-xs flex items-center gap-1.5">
                        <FileText className="w-4 h-4 text-indigo-400" />
                        3-Tier Standard Letter (标准求职信)
                      </span>
                      <button
                        onClick={() => handleCopy(matchResult.coverLetters.tier3Free, 'letter-free')}
                        className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded transition"
                      >
                        {copiedKey === 'letter-free' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>复制</span>
                      </button>
                    </div>
                    <textarea
                      readOnly
                      rows={14}
                      value={matchResult.coverLetters.tier3Free}
                      className="w-full p-3 bg-slate-900 border border-slate-800 rounded-lg text-slate-300 font-sans text-xs leading-relaxed resize-none focus:outline-none"
                    />
                  </div>
                  <div className="text-[11px] text-slate-400">适合直接邮件发送或作为基础申请文书。</div>
                </div>

                {/* 4-Tier FAANG Pro */}
                <div className="bg-slate-950 border border-purple-500/30 rounded-xl p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-amber-300 text-xs flex items-center gap-1.5">
                        <Crown className="w-4 h-4 text-amber-400" />
                        4-Tier FAANG Pro Letter (高阶架构师视角)
                      </span>
                      <button
                        onClick={() => handleCopy(matchResult.coverLetters.tier4Pro, 'letter-pro')}
                        className="flex items-center gap-1 text-[11px] text-amber-200 hover:text-white bg-purple-900/60 border border-purple-500/40 px-2 py-1 rounded transition"
                      >
                        {copiedKey === 'letter-pro' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>复制</span>
                      </button>
                    </div>
                    <textarea
                      readOnly
                      rows={14}
                      value={matchResult.coverLetters.tier4Pro}
                      className="w-full p-3 bg-slate-900 border border-purple-500/20 rounded-lg text-purple-100 font-sans text-xs leading-relaxed resize-none focus:outline-none"
                    />
                  </div>
                  <div className="text-[11px] text-purple-300/80">强调工程防御、复杂并发边界与代码严谨度，专为高薪量化AI评估岗打造。</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: PROFILE */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-slate-800/60 border border-slate-700/80 rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                    <Briefcase className="w-4 h-4" />
                    <h3>当前载入的候选人档案 (用户真实 15年 资深架构师简历)</h3>
                  </div>
                  <span className="text-xs bg-emerald-950 text-emerald-300 border border-emerald-500/30 px-2.5 py-0.5 rounded-full font-bold">
                    15+ YOE Senior Software Engineer
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {candidate.skills.map((s, i) => (
                    <span key={i} className="text-[11px] bg-slate-900 text-slate-300 px-2 py-1 rounded border border-slate-700">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-slate-950 rounded-xl p-5 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>完整履历原文预览 ({candidate.rawResumeText.length} 字符):</span>
                  <button
                    onClick={() => handleCopy(candidate.rawResumeText, 'resume-raw')}
                    className="flex items-center gap-1 text-slate-300 hover:text-white bg-slate-800 px-2 py-1 rounded transition"
                  >
                    {copiedKey === 'resume-raw' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>复制简历原文</span>
                  </button>
                </div>
                <pre className="p-4 bg-slate-900 rounded-lg text-slate-300 font-mono text-xs max-h-96 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {candidate.rawResumeText}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
