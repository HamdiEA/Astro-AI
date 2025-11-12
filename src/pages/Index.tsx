/**
 * AstroVision: File overview — Index.tsx
 * Purpose: Explain the role of this module/component in the app.
 * React notes:
 *  - Uses React function components and Hooks (useState/useEffect/useMemo as applicable).
 *  - Data flows top→down via props; events bubble up via callbacks.
 *  - Virtual DOM reconciles changes triggered by state updates efficiently.
 *  - Prefer pure, side-effect free rendering; isolate side-effects in useEffect.
 */
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";

const Index = () => {
// Render: describe UI for current state/props
return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      
      {/* Additional content section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Comment ça fonctionne ?
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              Notre système utilise des réseaux de neurones convolutifs (CNN) et des
              algorithmes de deep learning entraînés sur des millions d'images astronomiques
              pour identifier et classifier automatiquement les objets célestes.
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 text-left">
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                  1
                </div>
                <h3 className="font-semibold text-lg">Prétraitement</h3>
                <p className="text-sm text-muted-foreground">
                  Normalisation et amélioration de la qualité des images pour optimiser la
                  détection
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-xl">
                  2
                </div>
                <h3 className="font-semibold text-lg">Détection & Classification</h3>
                <p className="text-sm text-muted-foreground">
                  Identification des objets célestes et classification par type avec un score
                  de confiance
                </p>
              </div>
              
              <div className="space-y-3">
                <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">
                  3
                </div>
                <h3 className="font-semibold text-lg">Analyse & Export</h3>
                <p className="text-sm text-muted-foreground">
                  Génération de rapports détaillés avec coordonnées, propriétés et
                  classifications
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;