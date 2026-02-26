import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { getRecommendation } from "@/services/api";
import { StudentInput } from "@/types/recommendation";
import { Loader2, BookOpen, Brain, DollarSign, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const sliderFields: { key: keyof StudentInput; label: string; max: number }[] = [
  { key: "math", label: "Math", max: 100 },
  { key: "science", label: "Science", max: 100 },
  { key: "english", label: "English", max: 100 },
  { key: "logical", label: "Logical Score", max: 100 },
  { key: "creativity", label: "Creativity", max: 100 },
  { key: "scientific_interest", label: "Scientific Interest", max: 100 },
  { key: "communication", label: "Communication", max: 100 },
  { key: "leadership", label: "Leadership", max: 100 },
  { key: "stress_level", label: "Stress Level", max: 10 },
  { key: "risk_level", label: "Risk Level", max: 10 },
];

const StudentForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<StudentInput>({
    math: 50, science: 50, english: 50, logical: 50,
    creativity: 50, scientific_interest: 50, communication: 50, leadership: 50,
    stress_level: 5, risk_level: 5, budget: 500000,
    location: "", education_level: "class_10",
  });

  const updateField = (key: keyof StudentInput, value: number | string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.location.trim()) {
      toast({ title: "Location required", description: "Please enter your preferred location.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const result = await getRecommendation(form);
      navigate("/results", { state: { result, input: form } });
    } catch {
      toast({ title: "Error", description: "Could not reach the AI engine. Make sure the backend is running.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-3xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground">Student Assessment</h1>
        <p className="mt-2 text-muted-foreground">Rate your skills honestly — the AI will do the rest.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Academic Scores */}
        <div className="rounded-xl border border-border bg-card p-6 card-shadow">
          <div className="mb-5 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg text-foreground">Academic & Skill Scores</h2>
          </div>
          <div className="grid gap-6">
            {sliderFields.map((f) => (
              <div key={f.key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium text-foreground">{f.label}</Label>
                  <span className="text-sm font-semibold text-primary">{form[f.key] as number}/{f.max}</span>
                </div>
                <Slider
                  value={[form[f.key] as number]}
                  max={f.max}
                  step={1}
                  onValueChange={([v]) => updateField(f.key, v)}
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Budget & Location */}
        <div className="rounded-xl border border-border bg-card p-6 card-shadow">
          <div className="mb-5 flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg text-foreground">Budget & Preferences</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label className="text-foreground">Annual Budget (₹)</Label>
              <Input
                type="number"
                value={form.budget}
                onChange={(e) => updateField("budget", Number(e.target.value))}
                min={0}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-foreground">Preferred Location</Label>
              <Input
                value={form.location}
                onChange={(e) => updateField("location", e.target.value)}
                placeholder="e.g. Mumbai, Delhi"
                className="bg-background"
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label className="text-foreground">Education Level</Label>
              <Select value={form.education_level} onValueChange={(v) => updateField("education_level", v)}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="class_10">Class 10</SelectItem>
                  <SelectItem value="class_12">Class 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <Button type="submit" disabled={loading} size="lg" className="w-full rounded-full font-semibold">
          {loading ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analyzing...</>
          ) : (
            "Get My Recommendation"
          )}
        </Button>
      </form>
    </div>
  );
};

export default StudentForm;
