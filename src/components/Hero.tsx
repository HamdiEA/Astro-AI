/**
 * AstroVision: File overview — Hero.tsx
 * Purpose: Explain the role of this module/component in the app.
 * React notes:
 *  - Uses React function components and Hooks (useState/useEffect/useMemo as applicable).
 *  - Data flows top→down via props; events bubble up via callbacks.
 *  - Virtual DOM reconciles changes triggered by state updates efficiently.
 *  - Prefer pure, side-effect free rendering; isolate side-effects in useEffect.
 */
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-space.jpg";

const Hero = () => {
// Render: describe UI for current state/props
return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Deep space with galaxies and nebulae"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      </div>

      {/* Animated stars */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 bg-primary rounded-full animate-shimmer"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-sm text-muted-foreground">
              Intelligence Artificielle & Astronomie
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-secondary bg-clip-text text-transparent">
              AstroVision AI
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Analyse automatique d'images astronomiques par intelligence artificielle
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/upload">
              <Button variant="cosmic" size="lg" className="group">
                Analyser vos images
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/gallery">
              <Button variant="hero" size="lg">
                Explorer la galerie
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            {[
              { label: "Images analysées", value: "10,000+" },
              { label: "Objets détectés", value: "50,000+" },
              { label: "Précision", value: "98.5%" },
              { label: "Catégories", value: "15+" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;