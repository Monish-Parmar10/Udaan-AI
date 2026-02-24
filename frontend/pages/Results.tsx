import { useLocation, Link, Navigate } from "react-router-dom";
import { RecommendationResult } from "@/types/recommendation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Award, BookOpen, Briefcase, Building, CheckCircle, Lightbulb, ArrowRight, TrendingUp } from "lucide-react";

const ScoreBar = ({ label, value, max = 100 }: { label: string; value: number; max?: number }) => {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">{pct}%</span>
      </div>
      <Progress value={pct} className="h-2.5" />
    </div>
  );
};

const Results = () => {
  const { state } = useLocation();
  if (!state?.result) return <Navigate to="/assess" replace />;
  const r: RecommendationResult = state.result;
  const input = state.input;

  return (
    <div className="container max-w-5xl py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <p className="text-sm font-medium text-primary uppercase tracking-wider">Your AI Analysis</p>
        <h1 className="mt-2 text-4xl font-extrabold text-foreground">
          Recommended: <span className="text-gradient">{r.recommended_stream}</span>
        </h1>
      </div>

      {/* Confidence */}
      <div className="mb-8 rounded-xl border border-border bg-card p-6 card-shadow">
        <div className="flex items-center gap-2 mb-3">
          <Award className="h-5 w-5 text-accent" />
          <h2 className="font-semibold text-lg text-foreground">Confidence Score</h2>
        </div>
        <div className="flex items-center gap-4">
          <Progress value={r.confidence_score} className="h-4 flex-1" />
          <span className="text-2xl font-bold text-primary">{r.confidence_score}%</span>
        </div>
      </div>

      {/* Decision Intelligence */}
      <div className="mb-8 rounded-xl border border-border bg-card p-6 card-shadow">
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-lg text-foreground">Decision Intelligence</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <ScoreBar label="Academic Strength" value={r.decision_intelligence.academic_strength} />
          <ScoreBar label="Financial Feasibility" value={r.decision_intelligence.financial_feasibility} />
          <ScoreBar label="Competition Readiness" value={r.decision_intelligence.competition_readiness} />
          <ScoreBar label="Psychological Alignment" value={r.decision_intelligence.psychological_alignment} />
        </div>
        {r.decision_intelligence.risk_flags.length > 0 && (
          <div className="mt-5 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="font-semibold text-destructive text-sm">Risk Flags</span>
            </div>
            <ul className="space-y-1">
              {r.decision_intelligence.risk_flags.map((flag, i) => (
                <li key={i} className="text-sm text-destructive/90 flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-destructive flex-shrink-0" />
                  {flag}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Degree Matches */}
      {r.degree_matches?.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg text-foreground">Degree Matches</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {r.degree_matches.map((d, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 card-shadow hover:card-shadow-hover transition-shadow">
                <h3 className="font-semibold text-foreground mb-2">{d.degree}</h3>
                {d.description && <p className="text-xs text-muted-foreground mb-3">{d.description}</p>}
                <div className="flex items-center gap-2">
                  <Progress value={d.match_score} className="h-2 flex-1" />
                  <span className="text-sm font-semibold text-primary">{d.match_score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Career Matches */}
      {r.career_matches?.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Briefcase className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg text-foreground">Career Matches</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {r.career_matches.map((c, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 card-shadow hover:card-shadow-hover transition-shadow">
                <h3 className="font-semibold text-foreground mb-2">{c.career}</h3>
                {c.description && <p className="text-xs text-muted-foreground mb-3">{c.description}</p>}
                <div className="flex items-center gap-2">
                  <Progress value={c.match_score} className="h-2 flex-1" />
                  <span className="text-sm font-semibold text-primary">{c.match_score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Institutions */}
      {r.institution_matches?.length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Building className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg text-foreground">Institution Matches</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {r.institution_matches.map((inst, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 card-shadow hover:card-shadow-hover transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{inst.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    inst.tier?.toLowerCase().includes("dream")
                      ? "bg-accent/15 text-accent-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}>
                    {inst.tier}
                  </span>
                </div>
                {inst.location && <p className="text-xs text-muted-foreground mb-3">{inst.location}</p>}
                <div className="flex items-center gap-2">
                  <Progress value={inst.match_score} className="h-2 flex-1" />
                  <span className="text-sm font-semibold text-primary">{inst.match_score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Improvement Plan */}
      {r.improvement_plan?.length > 0 && (
        <div className="mb-8 rounded-xl border border-border bg-card p-6 card-shadow">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-accent" />
            <h2 className="font-semibold text-lg text-foreground">Improvement Plan</h2>
          </div>
          <div className="space-y-3">
            {r.improvement_plan.map((step, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg bg-secondary/50 p-4">
                <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                <div>
                  <p className="font-medium text-foreground text-sm">{step.action}</p>
                  {step.description && <p className="text-xs text-muted-foreground mt-1">{step.description}</p>}
                  {step.priority && (
                    <span className={`mt-2 inline-block text-xs px-2 py-0.5 rounded-full ${
                      step.priority.toLowerCase() === "high"
                        ? "bg-destructive/10 text-destructive"
                        : "bg-primary/10 text-primary"
                    }`}>
                      {step.priority} priority
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Explanation */}
      {r.explanation && (
        <div className="mb-8 rounded-xl border border-border bg-card p-6 card-shadow">
          <h2 className="font-semibold text-lg text-foreground mb-3">Detailed Explanation</h2>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{r.explanation}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <Button asChild variant="outline" size="lg" className="rounded-full">
          <Link to="/assess">Retake Assessment</Link>
        </Button>
        <Button asChild size="lg" className="rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground">
          <Link to="/colleges" state={{ result: r, input }}>
            <Building className="mr-2 h-4 w-4" /> View Suggested Colleges
          </Link>
        </Button>
        <Button asChild size="lg" className="rounded-full">
          <Link to="/simulate" state={{ input }}>
            Try What-If Simulation <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Results;
