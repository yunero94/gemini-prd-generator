export enum ProjectType {
  WEB_APP = 'Web Application',
  MOBILE_APP = 'Mobile App',
  API = 'API / Backend Service',
  CLI = 'CLI Tool',
  OTHER = 'General Software'
}

export enum DetailLevel {
  BRIEF = 'Brief (High Level)',
  STANDARD = 'Standard (Professional)',
  DETAILED = 'Detailed (Technical Spec)'
}

export interface PRDParams {
  projectName: string;
  description: string;
  projectType: ProjectType;
  detailLevel: DetailLevel;
  targetAudience: string;
  includeTechStack: boolean;
  includeUserStories: boolean;
}

export interface GeneratedPRD {
  id: string;
  timestamp: number;
  title: string;
  markdownContent: string;
  completenessScore: number;
  qualityAnalysis: string;
}

export interface PRDState {
  isGenerating: boolean;
  data: GeneratedPRD | null;
  error: string | null;
}