import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InputSection from "@/components/InputSection";
import LoadingState from "@/components/LoadingState";
import OutputSection from "@/components/OutputSection";
import Footer from "@/components/Footer";
import { generateTrainingContent } from "@/lib/gemini";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [rawFallback, setRawFallback] = useState<string | null>(null);

  const handleGenerate = async (sopText: string, jobRole: string) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    setRawFallback(null);

    try {
      const data = await generateTrainingContent(sopText, jobRole);
      setResult(data);
    } catch (err: any) {
      if (err instanceof SyntaxError) {
        setRawFallback(err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setRawFallback(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-content mx-auto w-full px-6">
        <HeroSection />

        {!result && !isLoading && (
          <InputSection onGenerate={handleGenerate} isLoading={isLoading} />
        )}

        {isLoading && <LoadingState />}

        {error && (
          <div className="border border-destructive/50 bg-destructive/10 rounded-lg p-6 text-center">
            <p className="text-sm text-destructive">{error}</p>
            <button
              onClick={handleReset}
              className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Try again
            </button>
          </div>
        )}

        {rawFallback && (
          <div className="border border-border rounded-lg bg-card p-6">
            <p className="text-sm text-muted-foreground mb-3">
              Could not parse the AI response. Raw output:
            </p>
            <pre className="text-xs text-foreground bg-secondary p-4 rounded-lg overflow-auto max-h-96">
              {rawFallback}
            </pre>
            <button
              onClick={handleReset}
              className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Try again
            </button>
          </div>
        )}

        {result && <OutputSection data={result} onReset={handleReset} />}
      </main>
      <Footer />
    </div>
  );
};

export default Index;
