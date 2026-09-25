import React, { useState } from 'react';
import { 
  Sparkles, 
  Target, 
  CheckCircle2, 
  AlertTriangle, 
  Crown, 
  RotateCw, 
  X, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  ExternalLink,
  Edit3,
  Trash2,
  Bug,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { MatchAnalysisResult, ExtractedJobData, CandidateProfile } from '../types';

interface HudWidgetProps {
  jobData: ExtractedJobData;
  matchResult: MatchAnalysisResult;
  candidate: CandidateProfile;
  isBuggyMode: boolean;
  onToggleBuggyMode: () => void;
  onRescan: () => void;
  onOpenDashboard: (tab?: string) => void;
  onOpenEditCandidate: () => void;
  onClearCandidate: () => void;
  isLoading: boolean;
}

export const HudWidget: React.FC<HudWidgetProps> = ({
  jobData,
  matchResult,
  candidate,
  isBuggyMode,
  onToggleBuggyMode,
  onRescan,
  onOpenDashboard,
  onOpenEditCandidate,
  onClearCandidate,
  isLoading,
}) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isCandidateExpanded, setIsCandidateExpanded] = useState(false);

  // If in buggy mode, simulate the exact broken state from user's screenshot
  const displayChars = isBuggyMode ? 153 : matchResult.charCountCaptured;
  const displayScore = isBuggyMode ? 98 : matchResult.overallMatchScore;
  const displayJdSkillsCount = isBuggyMode ? 1 : (matchResult.verifiedSkills.length + matchResult.missingSkillGaps.length);
  const displayHaveCount = isBuggyMode ? 1 : matchResult.verifiedSkills.length;
  const displayMissingCount = isBuggyMode ? 0 : matchResult.missingSkillGaps.length;

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-slate-950/95 text-cyan-400 border border-cyan-500/40 rounded-full shadow-[0_0_25px_rgba(6,182,212,0.35)] backdrop-blur-md hover:scale-105 transition-all duration-200"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
        </span>
        <span className="font-semibold tracking-wider text-xs uppercase text-white">SuperJobGenie HUD</span>
        <span className="bg-cyan-500/20 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded-full border border-cyan-500/30">
          {displayScore}% {isBuggyMode ? '(153字残缺)' : '(3000字全量)'}
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[380px] sm:w-[410px] max-h-[92vh] flex flex-col bg-slate-950/95 text-slate-100 rounded-2xl border border-slate-800 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_25px_rgba(59,130,246,0.25)] backdrop-blur-xl overflow-hidden font-sans">
      {/* HUD Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isBuggyMode ? 'bg-amber-400' : 'bg-cyan-400'}`}></span>
            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${isBuggyMode ? 'bg-amber-500' : 'bg-cyan-400'}`}></span>
          </span>
          <span className="font-black text-xs tracking-wider text-white uppercase">SUPERJOBGENIE HUD</span>
          <span className="flex items-center gap-1 bg-amber-500/20 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/30">
            <Crown className="w-2.5 h-2.5 text-amber-400" />
            PRO (3/3)
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onRescan}
            disabled={isLoading}
            className="flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 px-2 py-1 rounded-md border border-slate-700 transition"
            title="重新抓取并分析"
          >
            <RotateCw className={`w-3 h-3 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
            <span>Rescan</span>
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-slate-400 hover:text-white p-1 hover:bg-slate-800 rounded-md transition"
            title="最小化 HUD"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mode Switcher Banner: 153 chars (Bug) vs 3000+ chars (Fixed) */}
      <div className="px-3.5 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-[11px]">
        <span className="text-slate-400 font-medium">抓取模式对照:</span>
        <button
          onClick={onToggleBuggyMode}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold transition shadow-sm ${
            isBuggyMode
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
              : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
          }`}
        >
          {isBuggyMode ? (
            <>
              <Bug className="w-3 h-3 text-amber-400" />
              <span>当前: 153字残缺 (点击修复)</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>已修复: 3000+字全量抓取</span>
            </>
          )}
        </button>
      </div>

      {/* Main HUD Body */}
      <div className="p-3.5 space-y-3 overflow-y-auto max-h-[calc(92vh-150px)] text-xs">
        {/* Live Job Target Section */}
        <div className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
              Live Job Target (Indeed / Web):
            </span>
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                isBuggyMode
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              ⚡ Captured {displayChars} chars body
            </span>
          </div>
          <div>
            <h4 className="font-bold text-sm text-white leading-tight">{jobData.title}</h4>
            <div className="flex items-center gap-2 mt-0.5 text-slate-400 text-[11px]">
              <span className="text-cyan-400 font-medium">🏢 {jobData.company}</span>
              <span>•</span>
              <span>{jobData.location}</span>
            </div>
          </div>
        </div>

        {/* Candidate Profile Section */}
        <div className="bg-slate-900/70 border border-slate-800/90 rounded-xl p-3 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              <span>Candidate Profile</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={onClearCandidate}
                className="text-slate-400 hover:text-rose-400 flex items-center gap-0.5 px-1.5 py-0.5 rounded hover:bg-slate-800 transition"
              >
                <Trash2 className="w-2.5 h-2.5" />
                <span>Clear</span>
              </button>
              <button
                onClick={onOpenEditCandidate}
                className="text-slate-400 hover:text-cyan-400 flex items-center gap-0.5 px-1.5 py-0.5 rounded hover:bg-slate-800 transition"
              >
                <Edit3 className="w-2.5 h-2.5" />
                <span>Edit</span>
              </button>
              <button
                onClick={() => setIsCandidateExpanded(!isCandidateExpanded)}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-0.5 px-1.5 py-0.5 rounded hover:bg-slate-800 transition"
              >
                <span>{isCandidateExpanded ? 'Collapse' : 'Expand'}</span>
                {isCandidateExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
            </div>
          </div>

          <div className="text-[11px] text-slate-300">
            <span className="font-medium text-slate-400">Identified Skills ({candidate.skills.length}): </span>
            <span className="text-slate-200">
              {candidate.skills.slice(0, 7).join(', ')}
              {candidate.skills.length > 7 && '...'}
            </span>
          </div>

          {isCandidateExpanded && (
            <div className="pt-2 border-t border-slate-800/80 space-y-2 text-[11px] text-slate-300">
              <div>
                <span className="text-slate-400">Title: </span>
                <span className="text-white font-medium">{candidate.title}</span>
              </div>
              <div>
                <span className="text-slate-400">Experience: </span>
                <span className="text-emerald-400 font-bold">{candidate.yearsOfExperience} Years Full-Stack / Backend</span>
              </div>
              <div>
                <span className="text-slate-400">Certifications: </span>
                <span className="text-cyan-300">{candidate.certifications.join(' • ')}</span>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {candidate.skills.map((skill, idx) => (
                  <span key={idx} className="bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded text-[10px] border border-slate-700">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Match Card: High-Impact Matching Overview */}
        <div
          className={`rounded-xl p-3.5 border relative overflow-hidden transition-all duration-300 ${
            isBuggyMode
              ? 'bg-gradient-to-br from-amber-950/30 to-slate-900 border-amber-500/30'
              : 'bg-gradient-to-br from-indigo-950/40 to-slate-900 border-indigo-500/30'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className={`w-4 h-4 ${isBuggyMode ? 'text-amber-400' : 'text-cyan-400'}`} />
              <span className="font-bold text-xs text-white">
                {isBuggyMode ? '98% Exceptional Match · Strong Fit! (TOP 1%)' : `${matchResult.overallMatchScore}% ${matchResult.matchTier}`}
              </span>
            </div>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                isBuggyMode
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30'
              }`}
            >
              {isBuggyMode ? 'TOP 1% (虚假)' : '真实多维加权'}
            </span>
          </div>

          <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
            {isBuggyMode ? (
              <span className="text-amber-200">
                ✨ Core technical skills fully aligned · Highly recommended to apply now! (⚠️ 警告: 仅扫描153字导致假匹配!)
              </span>
            ) : (
              <span className="text-cyan-200">{matchResult.matchHeadline}</span>
            )}
          </p>

          {/* Match Ring & Stats */}
          <div className="bg-slate-950/70 rounded-lg p-2.5 border border-slate-800 flex items-center gap-3">
            <div className="relative flex items-center justify-center w-14 h-14 shrink-0">
              <svg className="w-14 h-14 -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="22"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="text-slate-800"
                  fill="transparent"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="22"
                  stroke="currentColor"
                  strokeWidth="4"
                  className={isBuggyMode ? 'text-amber-400' : 'text-cyan-400'}
                  fill="transparent"
                  strokeDasharray={138}
                  strokeDashoffset={138 - (138 * displayScore) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xs font-black text-white leading-none">{displayScore}%</span>
                <span className="text-[8px] font-mono text-slate-400 uppercase">MATCH</span>
              </div>
            </div>

            <div className="space-y-1 text-[11px]">
              <div className="font-semibold text-white flex items-center gap-1">
                <span>{isBuggyMode ? '🌟 Exceptional Match · Strong Fit (Top 1%)' : '跨赛道转移高潜力评估'}</span>
              </div>
              <div className="text-slate-400 font-mono text-[10px]">
                JD Skills: <strong className="text-white">{displayJdSkillsCount}</strong> detected | Have:{' '}
                <strong className="text-emerald-400">{displayHaveCount}</strong> | Missing:{' '}
                <strong className={displayMissingCount > 0 ? 'text-amber-400' : 'text-emerald-400'}>{displayMissingCount}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Skills (Have it) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
            <span className="flex items-center gap-1 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Skills (Have it)
            </span>
            <span className="text-slate-400 font-mono">Total {displayHaveCount}</span>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {isBuggyMode ? (
              <span className="bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 text-[10px] font-medium px-2 py-0.5 rounded">
                AI
              </span>
            ) : (
              matchResult.verifiedSkills.slice(0, 5).map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1"
                >
                  <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                  {skill.name}
                </span>
              ))
            )}
            {!isBuggyMode && matchResult.verifiedSkills.length > 5 && (
              <span className="text-slate-400 text-[10px] self-center">
                +{matchResult.verifiedSkills.length - 5} more
              </span>
            )}
          </div>
        </div>

        {/* Skill Gaps (Missing) */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
            <span className="flex items-center gap-1 text-amber-400">
              <AlertTriangle className="w-3.5 h-3.5" />
              Skill Gaps (Missing)
            </span>
            <span className="text-slate-400 font-mono">Total {displayMissingCount}</span>
          </div>

          {isBuggyMode ? (
            <div className="p-2 bg-emerald-950/30 border border-emerald-500/20 rounded text-[11px] text-emerald-300 flex items-center gap-1.5">
              <span className="text-base">🎉</span>
              <span>All 1 required skills verified! Zero technical gaps. (虚假结论)</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-1.5">
              {matchResult.missingSkillGaps.slice(0, 4).map((gap, idx) => (
                <span
                  key={idx}
                  className="bg-rose-950/60 text-rose-300 border border-rose-500/30 text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1"
                >
                  <span className="w-1 h-1 rounded-full bg-rose-400"></span>
                  {gap.name}
                </span>
              ))}
              {matchResult.missingSkillGaps.length > 4 && (
                <span className="text-slate-400 text-[10px] self-center">
                  +{matchResult.missingSkillGaps.length - 4} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* HUD Quick Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={() => onOpenDashboard('diagnostics')}
            className="w-full py-2 px-3 rounded-lg font-bold text-xs bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-500 hover:to-orange-500 text-white shadow-[0_0_20px_rgba(245,158,11,0.3)] flex items-center justify-center gap-2 transition"
          >
            <Crown className="w-3.5 h-3.5 text-amber-200" />
            <span>Open in Executive Dashboard (PRO)</span>
          </button>

          <button
            onClick={() => onOpenDashboard('pivot')}
            className="w-full py-2 px-3 rounded-lg font-bold text-xs bg-indigo-950 hover:bg-indigo-900 text-indigo-200 border border-indigo-500/40 flex items-center justify-center gap-2 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>✨ Smart Career Pivot Discovery (跨赛道分析)</span>
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenDashboard('cover-letter')}
              className="py-1.5 px-2 rounded-lg font-semibold text-[11px] bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center justify-center gap-1 transition"
            >
              <span>📨 3-Tier Letter (Free)</span>
            </button>
            <button
              onClick={() => onOpenDashboard('cover-letter-pro')}
              className="py-1.5 px-2 rounded-lg font-semibold text-[11px] bg-purple-950/80 hover:bg-purple-900 text-purple-200 border border-purple-500/40 flex items-center justify-center gap-1 transition"
            >
              <Crown className="w-3 h-3 text-amber-300" />
              <span>👑 4-Tier FAANG (Pro)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
