export interface SkillMatch {
  name: string;
  category: 'Technical' | 'Methodology' | 'Tool' | 'Domain' | 'Certification' | 'Soft';
  resumeEvidence?: string;
  jdContext?: string;
  importance?: 'Crucial' | 'Important' | 'Nice-to-have';
  howToBridge?: string;
}

export interface CareerPivotAnalysis {
  isCrossTrack: boolean;
  fromTrack: string;
  toTrack: string;
  pivotFeasibility: 'High' | 'Medium' | 'Low';
  pivotFeasibilityScore: number;
  transferableSuperpowers: string[];
  gapBridgingRoadmap: {
    phase: string;
    action: string;
    timeframe: string;
  }[];
  interviewTalkingPoints: string[];
  keyPivotNarrative: string;
}

export interface MatchAnalysisResult {
  jobTitle: string;
  company: string;
  location?: string;
  salary?: string;
  charCountCaptured: number;
  wordCountCaptured: number;
  isTruncatedWarning: boolean;
  extractionMethod: string;
  overallMatchScore: number;
  matchTier: 'Top 1% Exceptional' | 'Strong Match' | 'Cross-Track Pivot' | 'Low Alignment';
  matchHeadline: string;
  diagnosticComparison: {
    buggy153CharResult: {
      charsCaptured: number;
      skillsFoundInJd: number;
      apparentScore: number;
      falsityReason: string;
    };
    fixed3000CharResult: {
      charsCaptured: number;
      skillsFoundInJd: number;
      realScore: number;
      truthSummary: string;
    };
  };
  scoreBreakdown: {
    coreTechnicalSkills: { score: number; max: 40; details: string };
    domainAndMethodology: { score: number; max: 25; details: string };
    seniorityAndArchitecture: { score: number; max: 20; details: string };
    educationAndCredentials: { score: number; max: 15; details: string };
  };
  verifiedSkills: SkillMatch[];
  missingSkillGaps: SkillMatch[];
  careerPivot: CareerPivotAnalysis;
  resumeRewrites: {
    originalExperience: string;
    optimizedBullet: string;
    pivotImpact: string;
  }[];
  coverLetters: {
    tier3Free: string;
    tier4Pro: string;
  };
}

export interface ExtractedJobData {
  title: string;
  company: string;
  location: string;
  salary: string;
  fullBodyText: string;
  characterCount: number;
  wordCount: number;
  sections: {
    benefits: string[];
    responsibilities: string[];
    qualifications: string[];
    notes: string[];
  };
  extractionSource: string;
  rawTruncatedSnippet153: string;
}

export interface CandidateProfile {
  id: string;
  name: string;
  title: string;
  location?: string;
  targetRole?: string;
  yearsOfExperience: number;
  education: string;
  certifications: string[];
  rawResumeText: string;
  skills: string[];
  isAnonymousMode?: boolean;
  anonymizedLabel?: string;
  uploadedFileName?: string;
  uploadedFileSize?: string;
}
