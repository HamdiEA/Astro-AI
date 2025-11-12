/**
 * AstroVision: File overview — Features.tsx
 * Purpose: Explain the role of this module/component in the app.
 * React notes:
 *  - Uses React function components and Hooks (useState/useEffect/useMemo as applicable).
 *  - Data flows top→down via props; events bubble up via callbacks.
 *  - Virtual DOM reconciles changes triggered by state updates efficiently.
 *  - Prefer pure, side-effect free rendering; isolate side-effects in useEffect.
 */
import { Brain, Zap, Target, Database } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Intelligence Artificielle Avancée",
      description:
        "Algorithmes de deep learning entraînés sur des milliers d'images astronomiques pour une reconnaissance précise.",
    },
    {
      icon: Zap,
      title: "Analyse Rapide",
      description:
        "Traitement d'images en temps réel avec des résultats détaillés en quelques secondes.",
    },
    {
      icon: Target,
      title: "Détection Multi-Objets",
      description:
        "Identification simultanée d'étoiles, galaxies, nébuleuses, quasars et autres corps célestes.",
    },
    {
      icon: Database,
      title: "Base de Données Complète",
      description:
        "Accès à une vaste collection d'objets célestes catalogués pour une classification précise.",
    },
  ];
// Render: describe UI for current state/props
return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fonctionnalités Principales
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Notre système utilise les dernières avancées en intelligence artificielle pour
            analyser et classifier les objets célestes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
// Render: describe UI for current state/props
return (
              <Card
                key={index}
                className="group relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;