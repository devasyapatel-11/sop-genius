import { useState, useEffect, useRef } from "react";
import { Copy, Check, ChevronDown } from "lucide-react";

interface SOPData {
  summary: {
    overview: string;
    key_points: string[];
  };
  training_guide: {
    title: string;
    steps: {
      step_number: number;
      title: string;
      description: string;
      important_note?: string;
    }[];
  };
  quiz: {
    questions: {
      question_number: number;
      question: string;
      answer: string;
    }[];
  };
}

interface OutputSectionProps {
  data: SOPData;
  onReset: () => void;
}

const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded border border-border"
    >
      {copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};

const QuizQuestion = ({ q }: { q: SOPData["quiz"]["questions"][0] }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-lg p-4">
      <p className="text-sm text-foreground font-medium">
        {q.question_number}. {q.question}
      </p>
      <button
        onClick={() => setOpen(!open)}
        className="mt-3 flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
      >
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        {open ? "Hide Answer" : "Show Answer"}
      </button>
      <div
        className="overflow-hidden transition-all duration-300"
        style={{ maxHeight: open ? "200px" : "0", opacity: open ? 1 : 0 }}
      >
        <p className="mt-2 text-sm text-success bg-success/10 rounded-md p-3">{q.answer}</p>
      </div>
    </div>
  );
};

const OutputSection = ({ data, onReset }: OutputSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const summaryText = `${data.summary.overview}\n\n${data.summary.key_points.map((p) => `• ${p}`).join("\n")}`;
  const trainingText = data.training_guide.steps
    .map((s) => `Step ${s.step_number}: ${s.title}\n${s.description}${s.important_note ? `\nNote: ${s.important_note}` : ""}`)
    .join("\n\n");
  const quizText = data.quiz.questions
    .map((q) => `Q${q.question_number}: ${q.question}\nA: ${q.answer}`)
    .join("\n\n");

  const cards = [
    {
      title: "Structured Summary",
      borderColor: "border-l-primary",
      content: (
        <div>
          <p className="text-sm text-muted-foreground leading-relaxed">{data.summary.overview}</p>
          <ul className="mt-4 space-y-2">
            {data.summary.key_points.map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      ),
      copyText: summaryText,
    },
    {
      title: "Step-by-Step Training Guide",
      borderColor: "border-l-info",
      content: (
        <div className="space-y-4">
          <h3 className="text-base font-medium text-foreground">{data.training_guide.title}</h3>
          {data.training_guide.steps.map((step) => (
            <div key={step.step_number} className="flex gap-4 p-4 bg-secondary rounded-lg">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-sm font-semibold text-primary-foreground shrink-0">
                {step.step_number}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground">{step.title}</h4>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{step.description}</p>
                {step.important_note && (
                  <p className="mt-2 text-xs text-amber-400 bg-amber-400/10 rounded px-3 py-2">
                    ⚠️ {step.important_note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ),
      copyText: trainingText,
    },
    {
      title: "Quiz Questions",
      borderColor: "border-l-success",
      content: (
        <div className="space-y-3">
          {data.quiz.questions.map((q) => (
            <QuizQuestion key={q.question_number} q={q} />
          ))}
        </div>
      ),
      copyText: quizText,
    },
  ];

  return (
    <div ref={ref} className="space-y-6 pt-4">
      {cards.map((card, i) => (
        <div
          key={card.title}
          className={`print-card border border-border rounded-lg border-l-4 ${card.borderColor} bg-card animate-fade-in-up`}
          style={{ animationDelay: `${i * 150}ms` }}
        >
          <div className="flex items-center justify-between px-6 pt-5 pb-3">
            <h2 className="text-lg font-medium text-foreground">{card.title}</h2>
            <CopyButton text={card.copyText} />
          </div>
          <div className="px-6 pb-6">{card.content}</div>
        </div>
      ))}

      <div className="flex items-center justify-center gap-4 pt-4 pb-8 no-print">
        <button
          onClick={onReset}
          className="px-6 py-2.5 text-sm border border-border text-muted-foreground hover:text-foreground rounded-lg transition-colors"
        >
          Start Over
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-2.5 text-sm bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium"
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
};

export default OutputSection;
