import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { getSimulation } from "@/services/api";
import { SimulationResult } from "@/types/recommendation";
import { Loader2, FlaskConical, ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Simulation = () => {
  const { state } = useLocation();
  const { toast } = useToast();
  const [budget, setBudget] = useState<number>(state?.input?.budget ?? 500000);
  const [stress, setStress] = useState<number>(state?.input?.stress_level ?? 5);
  const [risk, setRisk] = useState<number>(state?.input?.risk_level ?? 5);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleSimulate = async () => {
    setLoading(true);
    try {
      const res = await getSimulation({ budget, stress_level: stress, risk_level: risk });
      setResult(res);
    } catch {
      toast({ title: "Error", description: "Could not run simulation. Make sure the backend is running.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const improvement = result ? result.score_improvement : 0;
  const ImprovementIcon = improvement > 0 ? ArrowUpRight : improvement < 0 ? ArrowDownRight : Minus;
  const improvementColor = improvement > 0 ? "text-success" : improvement < 0 ? "text-destructive" : "text-muted-foreground";

  return (
    <div className="container max-w-2xl py-10">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <FlaskConical className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">What-If Simulation</h1>
        <p className="mt-2 text-muted-foreground">Adjust parameters and see how your recommendation score changes.</p>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 card-shadow mb-8 space-y-6">
        <div className="space-y-2">
          <Label className="text-foreground">Annual Budget (₹)</Label>
          <Input
            type="number"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            min={0}
            className="bg-background"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-foreground">Stress Level</Label>
            <span className="text-sm font-semibold text-primary">{stress}/10</span>
          </div>
          <Slider value={[stress]} max={10} step={1} onValueChange={([v]) => setStress(v)} />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label className="text-foreground">Risk Level</Label>
            <span className="text-sm font-semibold text-primary">{risk}/10</span>
          </div>
          <Slider value={[risk]} max={10} step={1} onValueChange={([v]) => setRisk(v)} />
        </div>

        <Button onClick={handleSimulate} disabled={loading} className="w-full rounded-full font-semibold" size="lg">
          {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Simulating...</> : "Run Simulation"}
        </Button>
      </div>

      {result && (
        <div className="rounded-xl border border-border bg-card p-6 card-shadow animate-scale-in space-y-6">
          <h2 className="font-semibold text-lg text-foreground text-center">Simulation Results</h2>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-secondary p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Baseline</p>
              <p className="text-2xl font-bold text-foreground">{result.baseline_score}%</p>
            </div>
            <div className="rounded-lg bg-secondary p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Scenario</p>
              <p className="text-2xl font-bold text-primary">{result.scenario_score}%</p>
            </div>
            <div className="rounded-lg bg-secondary p-4 text-center">
              <p className="text-xs text-muted-foreground mb-1">Change</p>
              <div className={`flex items-center justify-center gap-1 text-2xl font-bold ${improvementColor}`}>
                <ImprovementIcon className="h-5 w-5" />
                {Math.abs(improvement)}%
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Baseline</span>
                <span className="text-foreground font-medium">{result.baseline_score}%</span>
              </div>
              <Progress value={result.baseline_score} className="h-3" />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">With Changes</span>
                <span className="text-primary font-medium">{result.scenario_score}%</span>
              </div>
              <Progress value={result.scenario_score} className="h-3" />
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Button asChild variant="outline" className="rounded-full">
          <Link to="/assess">← Back to Assessment</Link>
        </Button>
      </div>
    </div>
  );
};

export default Simulation;
