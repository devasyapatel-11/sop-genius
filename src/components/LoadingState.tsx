import { useState, useEffect } from "react";

const steps = [
  "Reading your SOP...",
  "Generating training content...",
  "Building quiz questions...",
];

const LoadingState = () => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 py-12">
      {steps.map((step, i) => (
        <div
          key={step}
          className="flex items-center gap-3 transition-opacity duration-500"
          style={{ opacity: i <= activeStep ? 1 : 0.2 }}
        >
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-dot" />
          <span className="text-sm text-muted-foreground">{step}</span>
        </div>
      ))}
    </div>
  );
};

export default LoadingState;
