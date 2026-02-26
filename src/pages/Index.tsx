import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Target, TrendingUp, Shield } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Advanced decision intelligence analyzes your academic profile, interests, and goals to recommend the perfect stream.",
  },
  {
    icon: Target,
    title: "Precision Matching",
    description: "Get matched with degrees, careers, and institutions that align with your unique strengths and aspirations.",
  },
  {
    icon: TrendingUp,
    title: "What-If Simulation",
    description: "Explore different scenarios by adjusting budget, stress, and risk levels to see how outcomes change.",
  },
  {
    icon: Shield,
    title: "Risk Intelligence",
    description: "Identify potential risks early and get a personalized improvement roadmap to maximize your chances.",
  },
];

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 hero-gradient opacity-85" />
        <div className="relative z-10 container text-center">
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in-up">
            Your Future,{" "}
            <span className="text-accent">Decoded by AI</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
            AI Mentor uses decision intelligence to analyze your academic strengths, interests, and goals — then recommends the ideal stream, degree, career, and institution for you.
          </p>
          <div className="mt-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 text-base px-8 py-6 rounded-full font-semibold shadow-lg">
              <Link to="/assess">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container">
          <h2 className="text-center text-3xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Our AI engine evaluates multiple dimensions to deliver personalized, data-driven academic guidance.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="rounded-xl border border-border bg-card p-6 card-shadow hover:card-shadow-hover transition-shadow duration-300 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="hero-gradient py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Ready to discover your path?</h2>
          <p className="text-primary-foreground/70 mb-8 max-w-lg mx-auto">
            Take the assessment in under 5 minutes and let our AI map out your academic future.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 font-semibold">
            <Link to="/assess">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
