import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Crown, 
  ShieldCheck, 
  Terminal, 
  Layers, 
  ExternalLink,
  BookOpen,
  Compass,
  FileText,
  AlertTriangle,
  RotateCw,
  Eye,
  Sliders,
  CheckCircle2,
  Download,
  LayoutDashboard,
  Globe
} from 'lucide-react';
import { HudWidget } from './components/HudWidget';
import { IndeedSimulator } from './components/IndeedSimulator';
import { ExecutiveDashboard } from './components/ExecutiveDashboard';
import { CandidateModal } from './components/CandidateModal';
import { ExportModal } from './components/ExportModal';
import { ExportExtensionButton } from './components/ExportExtensionButton';
import { InPageModalDialog } from './components/InPageModalDialog';
import { ResumeJobIngestionView } from './components/ResumeJobIngestionView';
import { 
  DEFAULT_CANDIDATE, 
  TANG_CANDIDATE_PROFILE,
  STRIPE_FRONTEND_ARCHITECT_JD,
  FULL_INDEED_AI_TRAINER_JD, 
  FULL_INDEED_SENIOR_BACKEND_JD 
} from './data/sampleData';
import { ExtractedJobData, MatchAnalysisResult, CandidateProfile } from './types';
import { analyzeJobMatch, extractJobContent } from './services/api';

export default function App() {
  const [candidate, setCandidate] = useState<CandidateProfile>(TANG_CANDIDATE_PROFILE);
  const [currentJob, setCurrentJob] = useState<ExtractedJobData>(STRIPE_FRONTEND_ARCHITECT_JD);
  const [activeViewMode, setActiveViewMode] = useState<'ingestion' | 'simulator'>('ingestion');
  const [isBuggyMode, setIsBuggyMode] = useState<boolean>(false); // default to fixed 3000+ chars
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [dashboardTab, setDashboardTab] = useState<string>('diagnostics');
  const [isCandidateModalOpen, setIsCandidateModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [isInPageModalOpen, setIsInPageModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showHud, setShowHud] = useState<boolean>(true);

  // Match analysis state
  const [matchResult, setMatchResult] = useState<MatchAnalysisResult>({
    jobTitle: STRIPE_FRONTEND_ARCHITECT_JD.title,
    company: STRIPE_FRONTEND_ARCHITECT_JD.company,
    location: STRIPE_FRONTEND_ARCHITECT_JD.location,
    salary: STRIPE_FRONTEND_ARCHITECT_JD.salary,
    charCountCaptured: STRIPE_FRONTEND_ARCHITECT_JD.characterCount,
    wordCountCaptured: STRIPE_FRONTEND_ARCHITECT_JD.wordCount,
    isTruncatedWarning: false,
    extractionMethod: STRIPE_FRONTEND_ARCHITECT_JD.extractionSource,
    overallMatchScore: 92,
    matchTier: 'Top 1% Exceptional',
    matchHeadline: '92% 卓越架构师匹配 (15年资深前端与高性能分布式系统架构)',
    diagnosticComparison: {
      buggy153CharResult: {
        charsCaptured: 153,
        skillsFoundInJd: 1,
        apparentScore: 98,
        falsityReason:
          '旧抓取器仅捕获页面顶部153字问候语，未能提取到微前端拆分、亚100ms延迟、Web Vitals规范等刚性诉求，导致盲目给出假满分。'
      },
      fixed3000CharResult: {
        charsCaptured: STRIPE_FRONTEND_ARCHITECT_JD.characterCount,
        skillsFoundInJd: 12,
        realScore: 92,
        truthSummary:
          '完整抓取3,000+字后，系统深度识别出TypeScript/React微前端、设计系统跨40+团队治理、端到端类型安全与亚100ms性能优化，与候选人15年资深经验形成高精度无缝印证。'
      }
    },
    scoreBreakdown: {
      coreTechnicalSkills: {
        score: 38,
        max: 40,
        details: 'TypeScript、React、Next.js、Node.js、微前端架构及端到端类型安全完全对齐。'
      },
      domainAndMethodology: {
        score: 23,
        max: 25,
        details: '大规模支付结算系统构建、设计系统多团队规模化管理与严格的 Core Web Vitals 治理。'
      },
      seniorityAndArchitecture: {
        score: 19,
        max: 20,
        details: '15+年深厚资历，主持过多项跨团队重大架构重构，指导培养多名资深工程师。'
      },
      educationAndCredentials: {
        score: 12,
        max: 15,
        details: '计算机科学专业学士，持 AWS Solutions Architect 等高阶认证。'
      }
    },
    verifiedSkills: [
      {
        name: 'TypeScript & React Architecture',
        category: 'Technical',
        resumeEvidence: '15+年经验主导构建高性能 React/TypeScript 应用及微前端基础设施',
        jdContext: 'Architect, build, and maintain performance-critical UI components and design systems'
      },
      {
        name: 'Microfrontends & Modular Systems',
        category: 'Technical',
        resumeEvidence: '成功主导微前端解耦与独立部署流水线，99.99% 高可用运行',
        jdContext: 'Drive microfrontend decoupling, isolated builds, code-splitting strategies'
      },
      {
        name: 'Web Vitals & Performance Optimization',
        category: 'Technical',
        resumeEvidence: '优化 Core Web Vitals LCP < 1.2s，推动打包体积缩减 42%',
        jdContext: 'Ensuring sub-100ms interaction latencies and strict Web Vitals compliance'
      },
      {
        name: 'System Design & Distributed Scalability',
        category: 'Methodology',
        resumeEvidence: '扎实的分布式架构与高并发系统演进经验，支持日均海量流量',
        jdContext: 'Large-scale distributed web applications processing millions of daily transactions'
      },
      {
        name: 'CI/CD & Automated Quality Gates',
        category: 'Tool',
        resumeEvidence: '建立自动化测试 (Jest, Playwright) 与多阶段 CI/CD 流水线',
        jdContext: 'Establishing high-standard automated testing (Jest, Playwright) and CI/CD'
      }
    ],
    missingSkillGaps: [
      {
        name: 'GraphQL & gRPC Federation Tuning',
        category: 'Technical',
        importance: 'Nice-to-have',
        howToBridge: '候选人具备扎实的 REST/Node/Python API 契约经验，可在自荐信中着重强调架构层级协议抽象与类型生成能力。'
      }
    ],
    careerPivot: {
      isCrossTrack: false,
      fromTrack: '资深全栈 / 前端架构师',
      toTrack: 'Staff Frontend Architect',
      pivotFeasibility: 'High',
      pivotFeasibilityScore: 92,
      transferableSuperpowers: [
        '15年复杂企业级前端基础设施与微前端解耦实战经验',
        '极致性能把控能力 (LCP < 1.2s, 42% 瘦身经验，亚100ms响应指标)',
        '兼具前端组件化与后端高并发底蕴的端到端架构视野'
      ],
      gapBridgingRoadmap: [
        {
          phase: 'Phase 1: 契约对齐',
          action: '在求职信中突出在跨团队 API 契约治理 (GraphQL/REST) 与 TypeScript 端到端强类型化方面的成熟实践。',
          timeframe: '立即'
        },
        {
          phase: 'Phase 2: 影响力展现',
          action: '阐述如何跨 40+ 个 Squad 推行统一 Design System 并建立质量门禁体系。',
          timeframe: '面试环节'
        }
      ],
      interviewTalkingPoints: [
        '讲述如何将大型单体前端平滑解耦为微前端并保障线上 99.99% 可用性的真实案例。',
        '分享在复杂异步结算交易流中进行包体积裁剪与 Web Vitals 优化的具体工程度量。'
      ],
      keyPivotNarrative:
        '凭借 15 年企业级前端基础设施与高并发系统架构实战，候选人不仅能直接满足 Stripe 对代码与组件严谨性的苛刻要求，更能站在全局工程效能角度引领 40+ 团队的设计系统规模化落地。'
    },
    resumeRewrites: [
      {
        originalExperience: '带领团队开发前端页面与组件，负责日常代码审核与上线部署。',
        optimizedBullet:
          '主导微前端架构演进与统一设计系统工程化，横向赋能 40+ 业务研发单元；推行严格的自动化质量门禁 (Jest / Playwright)，将 Core Web Vitals LCP 压降至 1.2s 以内，保障核心支付结算流 99.99% 稳定运行。',
        pivotImpact: '直击 Stripe JD 对亚 100ms 延迟要求与大型设计系统规模化落地的核心诉求。'
      }
    ],
    coverLetters: {
      tier3Free: `Dear Stripe Hiring Team,\n\nI am writing to express my strong enthusiasm for the Staff Frontend Architect position at Stripe. With over 15 years of engineering experience architecting scalable frontend systems and resilient web infrastructures, I have dedicated my career to building high-performance, developer-friendly interfaces that process millions of critical transactions daily.\n\nThroughout my career, I have spearheaded the evolution of decoupled microfrontends, reduced bundle sizes by 42%, and driven Core Web Vitals (LCP < 1.2s) across large-scale commercial platforms. What excites me most about Stripe is your relentless commitment to developer ergonomics and rock-solid payment reliability.\n\nI look forward to discussing how my experience scaling design systems across dozens of squads and enforcing type-safe client-server contracts can contribute to Stripe's ongoing mission.\n\nSincerely,\nCandidate (PII Scrubbed)`,
      tier4Pro: `Dear Stripe Engineering Leadership Team,\n\nI am thrilled to apply for the Staff Frontend Architect role at Stripe. Having spent 15+ years architecting mission-critical web applications and frontend infrastructure, I resonate deeply with Stripe's craft-driven approach to developer tools, payment elements, and global financial infrastructure.\n\nKey alignments with your requirements include:\n• Performance-Critical Architecture: Proven track record driving web vitals and sub-100ms interaction latencies across high-concurrency transaction flows, slashing bundle overhead by 42%.\n• Scale & System Governance: Successfully unified design systems and UI component pipelines across 40+ squads with TypeScript strict typing and robust Jest/Playwright coverage.\n• End-to-End Type Safety: Deep expertise bridging distributed backend services with client applications via schema-first architectures.\n\nI would welcome the opportunity to connect and share detailed architectural case studies on building scalable frontend platforms at Stripe.\n\nSincerely,\nCandidate (PII Scrubbed: Tang / Krishna / AI Technician)`
    }
  });

  const candidatePresets = [
    TANG_CANDIDATE_PROFILE,
    DEFAULT_CANDIDATE,
    {
      id: 'ai-quant-engineer',
      name: '量化数据 / AI 算法工程师',
      title: 'Senior Quantitative Data Engineer',
      location: 'New York, NY / Remote',
      targetRole: 'AI Trainer / Product Analyst',
      yearsOfExperience: 8,
      education: 'Master of Applied Statistics',
      certifications: ['AWS Machine Learning Specialty'],
      isAnonymousMode: true,
      anonymizedLabel: 'Anonymous Mode Active (PII Scrubbed)',
      uploadedFileName: 'quant-data-engineer.pdf',
      uploadedFileSize: '76 KB',
      rawResumeText: '8年量化分析与AI算法落地经验。精通Python/SQL与统计推断，主导数十次大规模A/B实验与预测模型搭建，深度参与LLM指令微调与强化学习标注流水线。',
      skills: ['Python', 'SQL', 'PyTorch', 'A/B Testing', 'Hypothesis Testing', 'Statistical Modeling', 'Predictive Modeling', 'Pandas', 'Scikit-learn', 'AWS']
    }
  ];

  const runAnalysis = async (job: ExtractedJobData, cand: CandidateProfile) => {
    setIsLoading(true);
    try {
      const jdText = isBuggyMode ? job.rawTruncatedSnippet153 : job.fullBodyText;
      const result = await analyzeJobMatch({
        jobDescription: jdText,
        resumeText: cand.rawResumeText,
        candidateSkills: cand.skills,
      });
      setMatchResult(result);
    } catch (err) {
      console.error('Analysis failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectJobPreset = (preset: ExtractedJobData) => {
    setCurrentJob(preset);
    runAnalysis(preset, candidate);
  };

  const handleSelectCandidatePreset = (preset: CandidateProfile) => {
    setCandidate(preset);
    runAnalysis(currentJob, preset);
  };

  const handleCustomExtract = async (rawInput: string) => {
    setIsLoading(true);
    try {
      const isUrl = rawInput.startsWith('http://') || rawInput.startsWith('https://');
      const payload = isUrl ? { url: rawInput } : { text: rawInput };
      const extracted = await extractJobContent(payload);
      setCurrentJob(extracted);
      await runAnalysis(extracted, candidate);
    } catch (err) {
      console.error('Custom extract error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCandidate = (updated: CandidateProfile) => {
    setCandidate(updated);
    runAnalysis(currentJob, updated);
  };

  const handleClearCandidate = () => {
    const emptyCand: CandidateProfile = {
      id: 'empty-custom',
      name: '自定义候选人',
      title: '请编辑职位头衔',
      yearsOfExperience: 0,
      education: '待补充',
      certifications: [],
      rawResumeText: '',
      skills: [],
    };
    setCandidate(emptyCand);
    setIsCandidateModalOpen(true);
  };

  const handleOpenDashboardWithTab = (tab: string = 'diagnostics') => {
    setDashboardTab(tab);
    setIsDashboardOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white pb-20">
      
      {/* Top Application Header matching user screenshot */}
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Logo & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-black tracking-tight text-white">
                  SUPERJOBGENIE
                </h1>
                <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                  v2.2.0
                </span>
              </div>
              <p className="text-xs bg-gradient-to-r from-cyan-400 to-indigo-300 bg-clip-text text-transparent font-medium">
                The AI-Powered Career Assistant
              </p>
            </div>
          </div>

          {/* Center Target Role & Privacy Pill */}
          <div className="hidden xl:flex items-center gap-2 text-xs bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-xl">
            <span className="text-slate-400">Target:</span>
            <span className="font-semibold text-white truncate max-w-xs">{candidate.targetRole || candidate.title}</span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">{candidate.location || 'San Francisco / Remote'}</span>
            <button
              onClick={() => {
                const nextState = !candidate.isAnonymousMode;
                handleSaveCandidate({
                  ...candidate,
                  isAnonymousMode: nextState,
                  anonymizedLabel: nextState ? 'Anonymous Mode Active (PII Scrubbed: Tang / Krishna / AI Technician)' : 'Standard Name Mode'
                });
              }}
              className="ml-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/40 transition cursor-pointer"
              title="点击切换隐私脱敏模式"
            >
              {candidate.isAnonymousMode ? '✓ 匿名模式生效中' : '标准姓名模式'}
            </button>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-2.5">
            {/* Quick Re-calculate */}
            <button
              onClick={() => runAnalysis(currentJob, candidate)}
              disabled={isLoading}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-lg text-xs font-semibold transition flex items-center gap-1.5"
              title="重新计算匹配度与跨赛道分析"
            >
              <RotateCw className={`w-3.5 h-3.5 text-cyan-400 ${isLoading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">重新计算</span>
            </button>

            {/* Credits Counter */}
            <div className="flex items-center gap-1.5 bg-amber-950/40 border border-amber-500/30 px-2.5 py-1 rounded-lg text-amber-300 text-xs font-bold">
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>3/3 Available Credits</span>
            </div>

            {/* View Switcher: Ingestion Studio vs Live Simulator */}
            <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setActiveViewMode('ingestion')}
                className={`px-2.5 py-1 rounded-md font-semibold transition flex items-center gap-1 ${
                  activeViewMode === 'ingestion'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="切换至原版两步式简历与岗位录入工作台"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden md:inline">工作台面板</span>
              </button>
              <button
                onClick={() => setActiveViewMode('simulator')}
                className={`px-2.5 py-1 rounded-md font-semibold transition flex items-center gap-1 ${
                  activeViewMode === 'simulator'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="切换至 Indeed 真实招聘网页模拟审查器"
              >
                <Globe className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Indeed模拟器</span>
              </button>
            </div>

            {/* In-Page Modal Trigger Button */}
            <button
              onClick={() => setIsInPageModalOpen(true)}
              className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg text-xs font-bold shadow-md shadow-indigo-600/20 transition flex items-center gap-1.5"
              title="唤起融合了3000字全量解析的招聘网内嵌弹窗"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>展开内嵌弹窗</span>
            </button>

            {/* Open Executive Dashboard */}
            <button
              onClick={() => handleOpenDashboardWithTab('diagnostics')}
              className="hidden lg:flex px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition items-center gap-1.5"
            >
              <Crown className="w-3.5 h-3.5 text-amber-300" />
              <span>PRO 控制台</span>
            </button>

            {/* Export & Download Extension (English with Standalone Workstation Patch) */}
            <ExportExtensionButton
              variant="gradient"
              label="Export Extension"
              extensionName="SuperJobGenie"
            />
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-6">
        {activeViewMode === 'ingestion' ? (
          <ResumeJobIngestionView
            candidate={candidate}
            jobData={currentJob}
            matchResult={matchResult}
            isBuggyMode={isBuggyMode}
            onToggleBuggyMode={() => setIsBuggyMode(!isBuggyMode)}
            onOpenEditCandidate={() => setIsCandidateModalOpen(true)}
            onSelectCandidatePreset={handleSelectCandidatePreset}
            onSelectJobPreset={handleSelectJobPreset}
            onReanalyze={() => runAnalysis(currentJob, candidate)}
            onOpenModal={() => setIsInPageModalOpen(true)}
            isLoading={isLoading}
          />
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              <span className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span>当前处于 <strong>Indeed 真实招聘页面模拟视窗</strong>，可在右下角点击 <strong>SuperJobGenie 🚀</strong> 展开内嵌弹窗。</span>
              </span>
              <button
                onClick={() => setActiveViewMode('ingestion')}
                className="text-indigo-400 hover:text-indigo-300 font-bold"
              >
                返回录入工作台 →
              </button>
            </div>
            <IndeedSimulator
              currentJob={currentJob}
              isBuggyMode={isBuggyMode}
              onSelectPreset={handleSelectJobPreset}
              onCustomExtract={handleCustomExtract}
              isLoading={isLoading}
            />
          </div>
        )}
      </main>

      {/* Persistent Floating SuperJobGenie Launcher Button in Bottom Right Corner (Matches user video) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {/* Toggle HUD icon */}
        <button
          onClick={() => setShowHud(!showHud)}
          className="p-2.5 text-slate-400 hover:text-white bg-slate-900/90 hover:bg-slate-800 rounded-full border border-slate-700 shadow-xl backdrop-blur-sm transition"
          title={showHud ? '隐藏侧边微型 HUD' : '显示侧边微型 HUD'}
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Floating SuperJobGenie Launcher Pill */}
        <button
          onClick={() => setIsInPageModalOpen(true)}
          className="group px-4 py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full shadow-[0_8px_30px_rgba(79,70,229,0.5)] border border-indigo-400/40 font-bold text-xs flex items-center gap-2.5 transition transform hover:scale-105"
          title="点击在页面中弹出 SuperJobGenie 交互大弹窗"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="tracking-wide">SuperJobGenie 🚀</span>
          <span className="bg-black/30 text-indigo-200 px-2 py-0.5 rounded-full text-[10px] font-mono border border-white/10">
            {isBuggyMode ? '153字' : `${currentJob.characterCount.toLocaleString()}字`}
          </span>
          <span className="bg-emerald-400 text-slate-950 font-black px-1.5 py-0.5 rounded-full text-[11px]">
            {isBuggyMode ? '98%' : `${matchResult.overallMatchScore}%`}
          </span>
        </button>
      </div>

      {/* In-Page Floating Modal Dialog (Preserved & Enhanced) */}
      <InPageModalDialog
        isOpen={isInPageModalOpen}
        onClose={() => setIsInPageModalOpen(false)}
        jobData={currentJob}
        matchResult={matchResult}
        candidate={candidate}
        isBuggyMode={isBuggyMode}
        onToggleBuggyMode={() => setIsBuggyMode(!isBuggyMode)}
        onRescan={() => runAnalysis(currentJob, candidate)}
        onOpenDashboard={handleOpenDashboardWithTab}
        onSelectCandidatePreset={handleSelectCandidatePreset}
        candidatePresets={candidatePresets}
      />

      {/* Floating HUD 透视球 */}
      {showHud && (
        <HudWidget
          jobData={currentJob}
          matchResult={matchResult}
          candidate={candidate}
          isBuggyMode={isBuggyMode}
          onToggleBuggyMode={() => setIsBuggyMode(!isBuggyMode)}
          onRescan={() => runAnalysis(currentJob, candidate)}
          onOpenDashboard={handleOpenDashboardWithTab}
          onOpenEditCandidate={() => setIsCandidateModalOpen(true)}
          onClearCandidate={handleClearCandidate}
          isLoading={isLoading}
        />
      )}

      {/* Executive Dashboard Modal */}
      <ExecutiveDashboard
        isOpen={isDashboardOpen}
        onClose={() => setIsDashboardOpen(false)}
        activeTab={dashboardTab}
        onTabChange={setDashboardTab}
        jobData={currentJob}
        matchResult={matchResult}
        candidate={candidate}
        isBuggyMode={isBuggyMode}
        onToggleBuggyMode={() => setIsBuggyMode(!isBuggyMode)}
      />

      {/* Candidate Profile & Resume Edit Modal */}
      <CandidateModal
        isOpen={isCandidateModalOpen}
        onClose={() => setIsCandidateModalOpen(false)}
        candidate={candidate}
        onSave={handleSaveCandidate}
      />

      {/* Export & Download Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
}
