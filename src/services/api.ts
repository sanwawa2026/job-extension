import { MatchAnalysisResult, ExtractedJobData } from '../types';

export async function extractJobContent(payload: {
  url?: string;
  rawHtml?: string;
  text?: string;
}): Promise<ExtractedJobData> {
  const res = await fetch('/api/extract-jd', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to extract job description');
  }

  const result = await res.json();
  return result.data;
}

export async function analyzeJobMatch(payload: {
  jobDescription: string;
  resumeText: string;
  candidateSkills: string[];
}): Promise<MatchAnalysisResult> {
  const res = await fetch('/api/analyze-match', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || 'Match analysis request failed');
  }

  const result = await res.json();
  return result.data;
}
