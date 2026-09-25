import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  Upload, 
  Edit3, 
  RotateCw, 
  ExternalLink, 
  Sparkles, 
  Briefcase, 
  MapPin, 
  Target, 
  Check, 
  ChevronRight,
  Database,
  Building,
  DollarSign,
  Crown,
  Layers,
  Code
} from 'lucide-react';
import { ExtractedJobData, CandidateProfile, MatchAnalysisResult } from '../types';
import { 
  STRIPE_FRONTEND_ARCHITECT_JD, 
  FULL_INDEED_AI_TRAINER_JD, 
  FULL_INDEED_SENIOR_BACKEND_JD,
  LINKEDIN_STAFF_INFRA_JD,
  GLASSDOOR_FINTECH_LEAD_JD,
  GREENHOUSE_AI_RESEARCH_JD
} from '../data/sampleData';

interface ResumeJobIngestionViewProps {
  candidate: CandidateProfile;
  jobData: ExtractedJobData;
  matchResult: MatchAnalysisResult;
  isBuggyMode: boolean;
  onToggleBuggyMode: () => void;
  onOpenEditCandidate: () => void;
  onSelectCandidatePreset: (preset: CandidateProfile) => void;
  onSelectJobPreset: (job: ExtractedJobData) => void;
  onReanalyze: () => void;
  onOpenModal: () => void;
  isLoading: boolean;
}

export const ResumeJobIngestionView: React.FC<ResumeJobIngestionViewProps> = ({
  candidate,
  jobData,
  matchResult,
  isBuggyMode,
  onToggleBuggyMode,
  onOpenEditCandidate,
  onSelectCandidatePreset,
  onSelectJobPreset,
  onReanalyze,
  onOpenModal,
  isLoading,
}) => {
  const [activeSourceTab, setActiveSourceTab] = useState<'indeed' | 'linkedin' | 'glassdoor' | 'ats' | 'manual'>('indeed');
  const [isAnonymousActive, setIsAnonymousActive] = useState<boolean>(candidate.isAnonymousMode ?? true);
  const [customPasteText, setCustomPasteText] = useState('');
  const [showPasteBox, setShowPasteBox] = useState(false);

  const displayChars = isBuggyMode ? 153 : jobData.characterCount;
  const displayScore = isBuggyMode ? 98 : matchResult.overallMatchScore;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Solution Banner */}
      <div className="p-4 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border border-indigo-500/30 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-lg shadow-indigo-950/30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">Indeed 3,000+ 字全量解析引擎已激活</span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-500/30">
                153字截断缺陷彻底根除
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              支持在招聘网站内嵌弹窗与右下角 <strong className="text-indigo-300">SuperJobGenie 🚀</strong> 一键唤起，融合真实简历技能多维比对与跨赛道分析。
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleBuggyMode}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition flex items-center gap-1.5 ${
              isBuggyMode
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
          >
            {isBuggyMode ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
            <span>{isBuggyMode ? '当前: 153字残缺模式' : '当前: 3000+字全量解析'}</span>
          </button>

          <button
            onClick={onOpenModal}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>唤起 SuperJobGenie 弹窗</span>
          </button>
        </div>
      </div>

      {/* STEP 1: Candidate Resume Ingestion & Privacy Shield */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 flex items-center justify-center font-black text-xs">
              1
            </span>
            <div>
              <h2 className="text-sm font-black text-white tracking-wide uppercase">
                STEP 1: Candidate Resume Ingestion & Privacy Shield
              </h2>
              <p className="text-[11px] text-slate-400">
                候选人简历解析与隐私脱敏防护盾 (PII Scrubbed)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenEditCandidate}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>编辑简历与参数</span>
            </button>
            <button
              onClick={onReanalyze}
              disabled={isLoading}
              className="text-xs bg-indigo-950 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/30 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5"
            >
              <RotateCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>重新分析简历</span>
            </button>
          </div>
        </div>

        {/* Configuration Row: Location, Target Role, Privacy Shield */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
              <MapPin className="w-3 h-3 text-cyan-400" />
              Candidate Location
            </span>
            <div className="font-semibold text-xs text-white">
              {candidate.location || 'San Francisco, CA / London / Remote'}
            </div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
              <Target className="w-3 h-3 text-indigo-400" />
              Target Role / Level Focus
            </span>
            <div className="font-semibold text-xs text-indigo-300">
              {candidate.targetRole || candidate.title}
            </div>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                Privacy & ATS Scrubbing
              </span>
              <div className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                {isAnonymousActive ? 'Anonymous Mode Active' : 'Real Name Mode'}
              </div>
            </div>
            <button
              onClick={() => setIsAnonymousActive(!isAnonymousActive)}
              className={`text-[10px] font-bold px-2.5 py-1 rounded-full border transition ${
                isAnonymousActive
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              {isAnonymousActive ? '✓ 隐私盾开启' : '关闭隐私盾'}
            </button>
          </div>
        </div>

        {/* Uploaded Resume Card & Parsed Skills */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-indigo-950 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-white text-xs flex items-center gap-2">
                  <span>{candidate.uploadedFileName || 'tang-resume-eng-lead.pdf'}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({candidate.uploadedFileSize || '84 KB'})</span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[9px] px-1.5 py-0.5 rounded font-bold">
                    ✓ Parsed & Ready
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {candidate.yearsOfExperience}+ 年技术经验 • CS 本科学历 • 持有 AWS / K8s 权威架构认证
                </p>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 font-mono">
              PII Scrubbed: Tang / Krishna / AI Technician
            </div>
          </div>

          {/* Resume Snippet */}
          <div className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800/60 leading-relaxed font-sans">
            {candidate.rawResumeText.slice(0, 260)}...
          </div>

          {/* Extracted Core Skills */}
          <div className="space-y-1.5">
            <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
              提取的核心技能 ({candidate.skills.length} 项):
            </div>
            <div className="flex flex-wrap gap-1.5">
              {candidate.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-indigo-950/80 text-indigo-300 border border-indigo-500/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STEP 2: Target Job Requirements (JD Deep Scraper) */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/40 text-purple-300 flex items-center justify-center font-black text-xs">
              2
            </span>
            <div>
              <h2 className="text-sm font-black text-white tracking-wide uppercase">
                STEP 2: Target Job Requirements (JD Deep Scraper)
              </h2>
              <p className="text-[11px] text-slate-400">
                实时抓取目标职位 • 突破 153 字截断 • 捕获 3,000+ 字完整职责与资格要求
              </p>
            </div>
          </div>

          {/* Platform Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => {
                setActiveSourceTab('indeed');
                setShowPasteBox(false);
                onSelectJobPreset(FULL_INDEED_AI_TRAINER_JD);
              }}
              className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                activeSourceTab === 'indeed'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Indeed (US/UK/EU)</span>
            </button>
            <button
              onClick={() => {
                setActiveSourceTab('linkedin');
                setShowPasteBox(false);
                onSelectJobPreset(LINKEDIN_STAFF_INFRA_JD);
              }}
              className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                activeSourceTab === 'linkedin'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>LinkedIn (Jobs)</span>
            </button>
            <button
              onClick={() => {
                setActiveSourceTab('glassdoor');
                setShowPasteBox(false);
                onSelectJobPreset(GLASSDOOR_FINTECH_LEAD_JD);
              }}
              className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                activeSourceTab === 'glassdoor'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Glassdoor</span>
            </button>
            <button
              onClick={() => {
                setActiveSourceTab('ats');
                setShowPasteBox(false);
                onSelectJobPreset(GREENHOUSE_AI_RESEARCH_JD);
              }}
              className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                activeSourceTab === 'ats'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>Greenhouse / Lever ATS</span>
            </button>
            <button
              onClick={() => {
                setActiveSourceTab('manual');
                setShowPasteBox(!showPasteBox);
              }}
              className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                activeSourceTab === 'manual'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code className="w-3 h-3" />
              <span>Manual Paste</span>
            </button>
          </div>
        </div>

        {/* Preset Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <span className="text-slate-400 font-semibold">欧美主流平台职位范例:</span>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onSelectJobPreset(STRIPE_FRONTEND_ARCHITECT_JD)}
              className={`px-3 py-1 rounded-lg font-semibold border transition ${
                jobData.title.includes('Staff Frontend')
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              Stripe (Staff Frontend)
            </button>
            <button
              onClick={() => onSelectJobPreset(LINKEDIN_STAFF_INFRA_JD)}
              className={`px-3 py-1 rounded-lg font-semibold border transition ${
                jobData.title.includes('Staff Infrastructure')
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              LinkedIn: Datadog (Staff Infra)
            </button>
            <button
              onClick={() => onSelectJobPreset(GLASSDOOR_FINTECH_LEAD_JD)}
              className={`px-3 py-1 rounded-lg font-semibold border transition ${
                jobData.title.includes('Lead Architect - Core Banking')
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              Glassdoor: Revolut (Fintech Lead)
            </button>
            <button
              onClick={() => onSelectJobPreset(GREENHOUSE_AI_RESEARCH_JD)}
              className={`px-3 py-1 rounded-lg font-semibold border transition ${
                jobData.title.includes('Senior AI Systems')
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              Greenhouse: Anthropic (AI Systems)
            </button>
            <button
              onClick={() => onSelectJobPreset(FULL_INDEED_AI_TRAINER_JD)}
              className={`px-3 py-1 rounded-lg font-semibold border transition ${
                jobData.title.includes('AI Trainer')
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              Indeed: DataAnnotation (AI Trainer)
            </button>
            <button
              onClick={() => onSelectJobPreset(FULL_INDEED_SENIOR_BACKEND_JD)}
              className={`px-3 py-1 rounded-lg font-semibold border transition ${
                jobData.title.includes('Staff / Senior Backend')
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
              }`}
            >
              Indeed: CloudScale (Backend Lead)
            </button>
          </div>
        </div>

        {/* Target Job Main Card */}
        <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-slate-800/80 pb-4">
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                <Building className="w-3 h-3 text-purple-400" />
                Target Company / Platform
              </span>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <span>{jobData.company}</span>
                <span className="bg-indigo-500/20 text-indigo-300 text-[10px] px-2 py-0.5 rounded font-mono">
                  {jobData.location}
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                <Briefcase className="w-3 h-3 text-indigo-400" />
                Job Title
              </span>
              <div className="text-sm font-bold text-indigo-300">
                {jobData.title}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider flex items-center gap-1">
                <DollarSign className="w-3 h-3 text-emerald-400" />
                Compensation / Salary Range
              </span>
              <div className="text-sm font-bold text-emerald-400">
                {jobData.salary || 'Competitive / Not Disclosed'}
              </div>
            </div>
          </div>

          {/* Character Capture Diagnostics Banner */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-slate-300 font-semibold">抓取深度:</span>
              <span className="text-emerald-400 font-bold font-mono">
                {displayChars.toLocaleString()} 字符全量捕获
              </span>
              <span className="text-slate-500">|</span>
              <span className="text-slate-400">
                来源: {jobData.extractionSource}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">综合匹配得分:</span>
              <span className={`font-black font-mono text-sm ${isBuggyMode ? 'text-amber-400' : 'text-emerald-400'}`}>
                {displayScore}%
              </span>
            </div>
          </div>

          {/* Job Content Body */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3 font-sans text-xs leading-relaxed text-slate-300 max-h-[380px] overflow-y-auto">
            <div className="font-bold text-white text-xs border-b border-slate-800 pb-2">
              职位描述详情与核心要求 (Unabridged Job Requirements)
            </div>
            <div className="whitespace-pre-wrap font-sans text-xs text-slate-200 space-y-2">
              {isBuggyMode ? jobData.rawTruncatedSnippet153 : jobData.fullBodyText}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
