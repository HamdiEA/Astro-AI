/**
 * AstroVision: File overview — Results.tsx
 * Purpose: Explain the role of this module/component in the app.
 * React notes:
 *  - Uses React function components and Hooks (useState/useEffect/useMemo as applicable).
 *  - Data flows top→down via props; events bubble up via callbacks.
 *  - Virtual DOM reconciles changes triggered by state updates efficiently.
 *  - Prefer pure, side-effect free rendering; isolate side-effects in useEffect.
 */
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, Sparkles, Telescope, Orbit } from "lucide-react";

const Results = () => {
  // Mock data - will be replaced with real backend data
  const detections = [
    { type: "Galaxie spirale", count: 12, confidence: 98, icon: Sparkles, color: "text-primary" },
    { type: "Nébuleuse", count: 8, confidence: 95, icon: Star, color: "text-secondary" },
    { type: "Étoile", count: 145, confidence: 99, icon: Star, color: "text-accent" },
    { type: "Quasar", count: 3, confidence: 87, icon: Telescope, color: "text-primary" },
  ];
// Render: describe UI for current state/props
return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Résultats de l'analyse
            </h1>
            <p className="text-lg text-muted-foreground">
              Objets célestes détectés et classifiés par l'IA
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {detections.map((detection, index) => {
              const Icon = detection.icon;
// Render: describe UI for current state/props
return (
                <Card
                  key={index}
                  className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all group"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Icon className={`h-8 w-8 ${detection.color} group-hover:animate-pulse`} />
                      <Badge variant="secondary" className="text-lg font-bold">
                        {detection.count}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-lg mb-2">{detection.type}</CardTitle>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Confiance</span>
                        <span>{detection.confidence}%</span>
                      </div>
                      <Progress value={detection.confidence} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Detailed Results */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">Détails de la détection</CardTitle>
              <CardDescription>
                Cliquez sur un objet pour voir ses caractéristiques détaillées
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all cursor-pointer group border border-border/30 hover:border-primary/50"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <Orbit className="h-8 w-8 text-primary group-hover:animate-spin" />
                      </div>
                      <div>
                        <div className="font-semibold">Objet céleste #{i + 1}</div>
                        <div className="text-sm text-muted-foreground">
                          Type: {detections[i % detections.length].type}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-2">
                        {detections[i % detections.length].confidence}% confiance
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        Coordonnées: RA 12h 34m | Dec +45° 12'
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Results;