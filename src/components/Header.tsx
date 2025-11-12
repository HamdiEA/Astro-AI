/**
 * AstroVision: File overview — Header.tsx
 * Purpose: Explain the role of this module/component in the app.
 * React notes:
 *  - Uses React function components and Hooks (useState/useEffect/useMemo as applicable).
 *  - Data flows top→down via props; events bubble up via callbacks.
 *  - Virtual DOM reconciles changes triggered by state updates efficiently.
 *  - Prefer pure, side-effect free rendering; isolate side-effects in useEffect.
 */
import { Link, useLocation } from "react-router-dom";
import { Telescope, Upload, BarChart3, Image } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Accueil", icon: Telescope },
    { to: "/upload", label: "Analyse", icon: Upload },
    { to: "/results", label: "Résultats", icon: BarChart3 },
    { to: "/gallery", label: "Galerie", icon: Image },
  ];
// Render: describe UI for current state/props
return (
    <header className="border-b border-border/50 backdrop-blur-md bg-card/30 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Telescope className="h-8 w-8 text-primary group-hover:animate-pulse" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full group-hover:bg-primary/40 transition-all" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              AstroVision AI
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;
// Render: describe UI for current state/props
return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300",
                    isActive
                      ? "bg-primary/20 text-foreground shadow-[0_0_15px_hsl(220_90%_60%/0.3)]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-2 text-xs text-muted-foreground">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span>Système actif</span>
            </div>
          </div>
        </div>

        {/* Mobile navigation */}
        <nav className="md:hidden mt-4 flex items-center justify-around border-t border-border/50 pt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
// Render: describe UI for current state/props
return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all",
                  isActive
                    ? "text-foreground bg-primary/20"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;