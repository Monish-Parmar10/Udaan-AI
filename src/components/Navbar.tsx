import { Link, useLocation } from "react-router-dom";
import { Brain, GraduationCap } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-foreground">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span>AI Mentor</span>
        </Link>
        <div className="flex items-center gap-1">
          {[
            { path: "/", label: "Home" },
            { path: "/assess", label: "Assess" },
            { path: "/results", label: "Results" },
            { path: "/simulate", label: "What-If" },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
