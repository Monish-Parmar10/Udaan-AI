export interface StudentInput {
  math: number;
  science: number;
  english: number;
  logical: number;
  creativity: number;
  scientific_interest: number;
  communication: number;
  leadership: number;
  stress_level: number;
  risk_level: number;
  budget: number;
  location: string;
  education_level: string;
}

export interface DecisionIntelligence {
  academic_strength: number;
  financial_feasibility: number;
  competition_readiness: number;
  psychological_alignment: number;
  risk_flags: string[];
}

export interface DegreeMatch {
  degree: string;
  match_score: number;
  description?: string;
}

export interface CareerMatch {
  career: string;
  match_score: number;
  description?: string;
}

export interface InstitutionMatch {
  name: string;
  tier: string;
  match_score: number;
  location?: string;
}

export interface ImprovementStep {
  action: string;
  priority: string;
  description?: string;
}

export interface RecommendationResult {
  recommended_stream: string;
  confidence_score: number;
  decision_intelligence: DecisionIntelligence;
  degree_matches: DegreeMatch[];
  career_matches: CareerMatch[];
  institution_matches: InstitutionMatch[];
  improvement_plan: ImprovementStep[];
  explanation: string;
}

export interface SimulationInput {
  budget: number;
  stress_level: number;
  risk_level: number;
}

export interface SimulationResult {
  baseline_score: number;
  scenario_score: number;
  score_improvement: number;
}
