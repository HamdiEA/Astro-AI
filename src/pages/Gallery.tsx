/**
 * AstroVision: File overview — Gallery.tsx
 * Purpose: Explain the role of this module/component in the app.
 * React notes:
 *  - Uses React function components and Hooks (useState/useEffect/useMemo as applicable).
 *  - Data flows top→down via props; events bubble up via callbacks.
 *  - Virtual DOM reconciles changes triggered by state updates efficiently.
 *  - Prefer pure, side-effect free rendering; isolate side-effects in useEffect.
 */
import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Sparkles, Telescope } from "lucide-react";

const Gallery = () => {
  const categories = [
    { name: "Galaxies", count: 234, icon: Sparkles },
    { name: "Nébuleuses", count: 156, icon: Star },
    { name: "Étoiles", count: 1842, icon: Star },
    { name: "Quasars", count: 45, icon: Telescope },
  ];

  // Mock gallery items
  const galleryItems = [...Array(12)].map((_, i) => ({
    id: i,
    type: categories[i % categories.length].name,
    confidence: 90 + Math.floor(Math.random() * 10),
    date: "2024-01-15",
  }));
// Render: describe UI for current state/props
return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Galerie des objets célestes
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Explorez les objets célestes détectés et classifiés par notre système
            </p>

            {/* Category filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
// Render: describe UI for current state/props
return (
                  <button
                    key={category.name}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    <span>{category.name}</span>
                    <Badge variant="secondary">{category.count}</Badge>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Gallery grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all cursor-pointer"
              >
                <div className="aspect-square bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.1),transparent_50%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="h-16 w-16 text-primary/30 group-hover:scale-110 group-hover:text-primary/50 transition-all" />
                  </div>
                  {/* Simulated stars */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute h-1 w-1 bg-foreground rounded-full animate-shimmer"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{item.type}</Badge>
                    <span className="text-xs text-muted-foreground">{item.date}</span>
                  </div>
                  <div className="text-sm font-medium">
                    Confiance: {item.confidence}%
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Gallery;