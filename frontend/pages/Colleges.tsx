import { useLocation, Navigate, Link } from "react-router-dom";
import { RecommendationResult, InstitutionMatch } from "@/types/recommendation";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  GraduationCap,
  MapPin,
  ArrowLeft,
  Beaker,
  Calculator,
  Palette,
  BarChart3,
  Star,
} from "lucide-react";

interface CollegesByStream {
  label: string;
  icon: React.ReactNode;
  description: string;
  colleges: {
    name: string;
    tier: string;
    location?: string;
    match_score: number;
    courses: string[];
  }[];
}

const streamCollegeMap: Record<string, CollegesByStream> = {
  pcm: {
    label: "Science (PCM)",
    icon: <Calculator className="h-5 w-5" />,
    description: "Physics, Chemistry & Mathematics — Engineering, Technology & Applied Sciences",
    colleges: [
      { name: "IIT Bombay", tier: "Dream", location: "Mumbai, Maharashtra", match_score: 95, courses: ["B.Tech Computer Science", "B.Tech Electrical", "B.Tech Mechanical"] },
      { name: "IIT Delhi", tier: "Dream", location: "New Delhi", match_score: 93, courses: ["B.Tech CS", "B.Tech Mathematics & Computing"] },
      { name: "NIT Trichy", tier: "Tier 1", location: "Tiruchirappalli, Tamil Nadu", match_score: 85, courses: ["B.Tech ECE", "B.Tech Civil Engineering"] },
      { name: "BITS Pilani", tier: "Tier 1", location: "Pilani, Rajasthan", match_score: 88, courses: ["B.E. Computer Science", "B.E. Electronics"] },
      { name: "VIT Vellore", tier: "Tier 2", location: "Vellore, Tamil Nadu", match_score: 78, courses: ["B.Tech IT", "B.Tech Mechanical"] },
      { name: "DTU Delhi", tier: "Tier 1", location: "New Delhi", match_score: 82, courses: ["B.Tech Software Engineering", "B.Tech IT"] },
    ],
  },
  pcb: {
    label: "Science (PCB)",
    icon: <Beaker className="h-5 w-5" />,
    description: "Physics, Chemistry & Biology — Medical, Pharmacy & Life Sciences",
    colleges: [
      { name: "AIIMS Delhi", tier: "Dream", location: "New Delhi", match_score: 97, courses: ["MBBS", "B.Sc Nursing"] },
      { name: "CMC Vellore", tier: "Dream", location: "Vellore, Tamil Nadu", match_score: 92, courses: ["MBBS", "B.Sc Allied Health Sciences"] },
      { name: "JIPMER Puducherry", tier: "Tier 1", location: "Puducherry", match_score: 88, courses: ["MBBS", "B.Sc Medical Lab Technology"] },
      { name: "Manipal College of Medical Sciences", tier: "Tier 1", location: "Manipal, Karnataka", match_score: 84, courses: ["MBBS", "BDS", "B.Pharm"] },
      { name: "Grant Medical College", tier: "Tier 2", location: "Mumbai, Maharashtra", match_score: 76, courses: ["MBBS", "BDS"] },
      { name: "SRM Medical College", tier: "Tier 2", location: "Chennai, Tamil Nadu", match_score: 74, courses: ["MBBS", "B.Sc Biotech"] },
    ],
  },
  commerce: {
    label: "Commerce",
    icon: <BarChart3 className="h-5 w-5" />,
    description: "Business, Finance & Management — CA, MBA & Economics",
    colleges: [
      { name: "SRCC (Delhi University)", tier: "Dream", location: "New Delhi", match_score: 95, courses: ["B.Com (Hons)", "Economics (Hons)"] },
      { name: "St. Xavier's College", tier: "Dream", location: "Mumbai, Maharashtra", match_score: 90, courses: ["B.Com", "BMS", "BAF"] },
      { name: "Christ University", tier: "Tier 1", location: "Bangalore, Karnataka", match_score: 85, courses: ["BBA", "B.Com (Hons)", "B.Com (Professional)"] },
      { name: "Loyola College", tier: "Tier 1", location: "Chennai, Tamil Nadu", match_score: 82, courses: ["B.Com", "BBA"] },
      { name: "Symbiosis College of Arts & Commerce", tier: "Tier 1", location: "Pune, Maharashtra", match_score: 80, courses: ["BBA", "B.Com"] },
      { name: "Narsee Monjee College of Commerce", tier: "Tier 2", location: "Mumbai, Maharashtra", match_score: 78, courses: ["B.Com", "BMS"] },
    ],
  },
  arts: {
    label: "Arts / Humanities",
    icon: <Palette className="h-5 w-5" />,
    description: "Liberal Arts, Social Sciences & Creative Fields",
    colleges: [
      { name: "St. Stephen's College", tier: "Dream", location: "New Delhi", match_score: 94, courses: ["B.A. English", "B.A. History", "B.A. Economics"] },
      { name: "Lady Shri Ram College", tier: "Dream", location: "New Delhi", match_score: 92, courses: ["B.A. Psychology", "B.A. Political Science"] },
      { name: "Fergusson College", tier: "Tier 1", location: "Pune, Maharashtra", match_score: 83, courses: ["B.A. English", "B.A. Sociology"] },
      { name: "Presidency University", tier: "Tier 1", location: "Kolkata, West Bengal", match_score: 85, courses: ["B.A. Political Science", "B.A. History"] },
      { name: "Ashoka University", tier: "Dream", location: "Sonipat, Haryana", match_score: 90, courses: ["B.A. Liberal Arts", "B.A. PPE"] },
      { name: "Jadavpur University", tier: "Tier 1", location: "Kolkata, West Bengal", match_score: 80, courses: ["B.A. Comparative Literature", "B.A. Film Studies"] },
    ],
  },
};

function getTierColor(tier: string) {
  const t = tier.toLowerCase();
  if (t.includes("dream")) return "bg-accent/15 text-accent-foreground border-accent/30";
  if (t.includes("1")) return "bg-primary/10 text-primary border-primary/30";
  return "bg-secondary text-secondary-foreground border-secondary";
}

function getDefaultTab(stream?: string): string {
  if (!stream) return "pcm";
  const s = stream.toLowerCase();
  if (s.includes("pcm") || s.includes("engineering") || s.includes("science") && s.includes("math")) return "pcm";
  if (s.includes("pcb") || s.includes("medical") || s.includes("bio")) return "pcb";
  if (s.includes("commerce") || s.includes("business")) return "commerce";
  if (s.includes("arts") || s.includes("humanities")) return "arts";
  return "pcm";
}

const Colleges = () => {
  const { state } = useLocation();
  const result: RecommendationResult | undefined = state?.result;
  const input = state?.input;

  const defaultTab = getDefaultTab(result?.recommended_stream);

  // Merge API institution matches into the relevant stream tab
  const apiInstitutions: InstitutionMatch[] = result?.institution_matches ?? [];

  return (
    <div className="container max-w-5xl py-10">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
          <GraduationCap className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">College Finder</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
          College Suggestions After <span className="text-gradient">12th</span>
        </h1>
        <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
          Explore top colleges across streams based on {result ? "your personalized assessment" : "academic interests"}.
        </p>
      </div>

      {/* AI-Matched Institutions from API */}
      {apiInstitutions.length > 0 && (
        <div className="mb-10 rounded-xl border border-primary/20 bg-primary/5 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="h-5 w-5 text-primary" />
            <h2 className="font-semibold text-lg text-foreground">Your AI-Matched Institutions</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Based on your assessment for <span className="font-semibold text-foreground">{result?.recommended_stream}</span>
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {apiInstitutions.map((inst, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5 card-shadow hover:card-shadow-hover transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{inst.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getTierColor(inst.tier)}`}>
                    {inst.tier}
                  </span>
                </div>
                {inst.location && (
                  <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> {inst.location}
                  </p>
                )}
                <div className="flex items-center gap-2">
                  <Progress value={inst.match_score} className="h-2 flex-1" />
                  <span className="text-sm font-semibold text-primary">{inst.match_score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stream-wise College Tabs */}
      <Tabs defaultValue={defaultTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          {Object.entries(streamCollegeMap).map(([key, stream]) => (
            <TabsTrigger key={key} value={key} className="flex items-center gap-1.5 text-xs sm:text-sm">
              {stream.icon}
              <span className="hidden sm:inline">{stream.label}</span>
              <span className="sm:hidden">{key.toUpperCase()}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(streamCollegeMap).map(([key, stream]) => (
          <TabsContent key={key} value={key}>
            <div className="mb-5">
              <h2 className="text-xl font-bold text-foreground">{stream.label}</h2>
              <p className="text-sm text-muted-foreground mt-1">{stream.description}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {stream.colleges.map((college, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-5 card-shadow hover:card-shadow-hover transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-primary flex-shrink-0" />
                      <h3 className="font-semibold text-foreground">{college.name}</h3>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getTierColor(college.tier)}`}>
                      {college.tier}
                    </span>
                  </div>
                  {college.location && (
                    <p className="text-xs text-muted-foreground mb-3 flex items-center gap-1 ml-6">
                      <MapPin className="h-3 w-3" /> {college.location}
                    </p>
                  )}
                  <div className="ml-6 mb-3">
                    <p className="text-xs font-medium text-muted-foreground mb-1.5">Popular Courses</p>
                    <div className="flex flex-wrap gap-1.5">
                      {college.courses.map((course, j) => (
                        <span key={j} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-6">
                    <Progress value={college.match_score} className="h-2 flex-1" />
                    <span className="text-sm font-semibold text-primary">{college.match_score}%</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center mt-10">
        {result ? (
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/results" state={{ result, input }}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Results
            </Link>
          </Button>
        ) : (
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link to="/assess">
              <ArrowLeft className="mr-2 h-4 w-4" /> Take Assessment
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Colleges;
