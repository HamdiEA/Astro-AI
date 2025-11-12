/**
 * AstroVision: File overview — Upload.tsx
 * Purpose: Explain the role of this module/component in the app.
 * React notes:
 *  - Uses React function components and Hooks (useState/useEffect/useMemo as applicable).
 *  - Data flows top→down via props; events bubble up via callbacks.
 *  - Virtual DOM reconciles changes triggered by state updates efficiently.
 *  - Prefer pure, side-effect free rendering; isolate side-effects in useEffect.
 */
import Header from "@/components/Header";
import UploadZone from "@/components/UploadZone";
import { Sparkles } from "lucide-react";

const Upload = () => {
// Render: describe UI for current state/props
return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm mb-6">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm text-muted-foreground">
                Analyse IA en temps réel
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Analyser vos images
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Téléchargez vos images astronomiques et laissez notre IA identifier et
              classifier automatiquement les objets célestes
            </p>
          </div>

          <UploadZone />

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50">
              <div className="text-3xl font-bold text-primary mb-2">1</div>
              <p className="text-sm text-muted-foreground">
                Téléchargez vos images
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50">
              <div className="text-3xl font-bold text-primary mb-2">2</div>
              <p className="text-sm text-muted-foreground">
                L'IA analyse les objets
              </p>
            </div>
            <div className="text-center p-6 rounded-lg bg-card/30 backdrop-blur-sm border border-border/50">
              <div className="text-3xl font-bold text-primary mb-2">3</div>
              <p className="text-sm text-muted-foreground">
                Obtenez les résultats
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Upload;