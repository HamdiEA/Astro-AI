/**
 * AstroVision: File overview — UploadZone.tsx
 * Purpose: Explain the role of this module/component in the app.
 * React notes:
 *  - Uses React function components and Hooks (useState/useEffect/useMemo as applicable).
 *  - Data flows top→down via props; events bubble up via callbacks.
 *  - Virtual DOM reconciles changes triggered by state updates efficiently.
 *  - Prefer pure, side-effect free rendering; isolate side-effects in useEffect.
 */
import { useCallback, useState } from "react";
import { Upload, X, FileImage } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const UploadZone = () => {
// Local state: component-scoped reactive value
// Triggers re-render on setState

  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (droppedFiles.length > 0) {
        setFiles((prev) => [...prev, ...droppedFiles]);
        toast({
          title: "Images ajoutées",
          description: `${droppedFiles.length} image(s) prête(s) pour l'analyse`,
        });
      }
    },
    [toast]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
      toast({
        title: "Images ajoutées",
        description: `${selectedFiles.length} image(s) prête(s) pour l'analyse`,
      });
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAnalyze = () => {
    if (files.length === 0) {
      toast({
        title: "Aucune image",
        description: "Veuillez ajouter des images à analyser",
        variant: "destructive",
      });
      return;
    }

    // Here you would send files to your backend
    toast({
      title: "Analyse en cours",
      description: "Vos images sont en cours d'analyse...",
    });
  };
// Render: describe UI for current state/props
return (
    <div className="space-y-6">
      <Card
        className={cn(
          "border-2 border-dashed transition-all duration-300",
          dragActive
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <div className="p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-10 w-10 text-primary animate-float" />
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-2">
            Déposez vos images astronomiques ici
          </h3>
          <p className="text-muted-foreground mb-6">
            ou cliquez pour sélectionner des fichiers
          </p>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button variant="hero" size="lg" className="cursor-pointer" asChild>
              <span>
                <FileImage className="h-4 w-4" />
                Sélectionner des images
              </span>
            </Button>
          </label>

          <p className="text-xs text-muted-foreground mt-4">
            Formats supportés: JPG, PNG, FITS • Max 20 images
          </p>
        </div>
      </Card>

      {files.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold flex items-center justify-between">
            <span>Images sélectionnées ({files.length})</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setFiles([])}
            >
              Tout effacer
            </Button>
          </h4>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative group rounded-lg overflow-hidden bg-muted aspect-square"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFile(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-background/90 to-transparent">
                  <p className="text-xs truncate">{file.name}</p>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="cosmic"
            size="lg"
            className="w-full"
            onClick={handleAnalyze}
          >
            Lancer l'analyse IA
          </Button>
        </div>
      )}
    </div>
  );
};

export default UploadZone;