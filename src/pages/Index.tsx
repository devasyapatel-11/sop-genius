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
  const [sopValidationError, setSopValidationError] = useState<{message: string, documentType?: string} | null>(null);

  const handleGenerate = async (sopText: string, jobRole: string) => {
    setIsLoading(true);
    setResult(null);
    setError(null);
    setRawFallback(null);
    setSopValidationError(null);

    try {
      const data = await generateTrainingContent(sopText, jobRole);
      
      // Check if API returned an SOP validation error
      if (data.error === true && data.errorType === 'INVALID_DOCUMENT') {
        setSopValidationError({
          message: data.message,
          documentType: data.message.includes('Detected as:') ? 
            data.message.split('Detected as: ')[1]?.replace(']', '') : 
            'Unknown document type'
        });
      } else {
        setResult(data);
      }
    } catch (err: any) {
      if (err instanceof SyntaxError) {
        setRawFallback(err.message);
      } else {
        setError(err.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
    setRawFallback(null);
    setSopValidationError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background warm-scrollbar">
      <Header />
      <main className="flex-1 max-w-content mx-auto w-full px-6">
        <HeroSection />

        {!result && !isLoading && !sopValidationError && (
          <InputSection onGenerate={handleGenerate} isLoading={isLoading} />
        )}

        {isLoading && <LoadingState />}

        {sopValidationError && (
          <div className="warm-card p-6">
            <div 
              style={{
                background: "#FFF5F5",
                borderLeft: "3px solid #EF4444",
                borderRadius: "8px",
                padding: "16px",
                marginTop: "12px"
              }}
            >
              <p 
                style={{
                  color: "#991B1B",
                  fontSize: "14px",
                  fontWeight: "600"
                }}
              >
                Invalid Document
              </p>
              <p 
                style={{
                  color: "#B91C1C",
                  fontSize: "13px",
                  marginTop: "6px"
                }}
              >
                {sopValidationError.message}
              </p>
              <p 
                style={{
                  color: "#991B1B",
                  fontSize: "12px",
                  marginTop: "8px",
                  opacity: "0.8"
                }}
              >
                SOPwise only processes Standard Operating Procedures written for workplace training and employee instructions.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="mt-4 warm-secondary-btn px-4 py-2 text-sm font-medium"
            >
              Try again
            </button>
          </div>
        )}

        {error && (
          <div className="warm-card p-6 text-center">
            <p className="text-sm text-destructive font-medium">{error}</p>
            <button
              onClick={handleReset}
              className="mt-4 warm-secondary-btn px-4 py-2 text-sm font-medium"
            >
              Try again
            </button>
          </div>
        )}

        {rawFallback && (
          <div className="warm-card p-6">
            <p className="text-sm text-muted-foreground mb-3 font-medium">
              Could not parse the AI response. Raw output:
            </p>
            <pre className="text-xs text-foreground bg-secondary p-4 rounded-lg overflow-auto max-h-96">
              {rawFallback}
            </pre>
            <button
              onClick={handleReset}
              className="mt-4 warm-secondary-btn px-4 py-2 text-sm font-medium"
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
