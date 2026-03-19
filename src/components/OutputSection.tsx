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

// Quiz answer evaluation logic with synonym matching
const evaluateAnswer = (userAnswer: string, correctAnswer: string): "correct" | "partial" | "incorrect" => {
  const user = userAnswer.toLowerCase().trim();
  const correct = correctAnswer.toLowerCase().trim();

  // If user answer is too short, return incorrect
  if (user.length < 5) return "incorrect";

  const stopWords = ['the','a','an','is','are','was','were','of','to','in','for','on','with','at','by','from','and','or','but','if','then','that','this','it','be','should','must','will','can','may','have','has','do','does','their','they','we','our','its','which','when'];

  const getKeywords = (text: string) => text
    .split(/\s+/)
    .filter(word => !stopWords.includes(word) && word.length > 2);

  // Synonym map — expand this for better matching
  const synonyms: { [key: string]: string[] } = {
    "sterile": ["clean","sanitized","safe","hygienic","disinfected"],
    "contamination": ["infection","dirty","unsafe","unclean","germs","bacteria"],
    "ensure": ["make sure","verify","confirm","check","guarantee"],
    "functioning": ["working","operational","functional","running"],
    "prevent": ["avoid","stop","reduce","minimize","protect"],
    "safety": ["safe","protection","wellbeing","secure","health"],
    "verify": ["confirm","check","validate","ensure","authenticate"],
    "process": ["procedure","steps","method","workflow","handle"],
    "document": ["record","log","note","track","report","file"],
    "approve": ["accept","confirm","authorize","validate","allow"],
    "reject": ["deny","decline","refuse","flag","escalate"],
    "manager": ["supervisor","lead","senior","head","superior"],
    "customer": ["client","user","buyer","person"],
    "refund": ["return","money back","reimbursement","repayment"],
    "identity": ["id","identification","details","info","credentials"],
    "equipment": ["tools","devices","machines","instruments","supplies"],
    "donor": ["giver","contributor","provider","supplier"],
    "review": ["check","assess","evaluate","examine","inspect"],
    "complete": ["finish","done","fulfill","accomplish","finalize"],
    "notify": ["inform","tell","alert","update","communicate"],
    "submit": ["send","upload","enter","provide","give"],
    "escalate": ["flag","raise","transfer","report","forward"]
  };

  // Expand user answer with synonyms
  function expandWithSynonyms(text: string) {
    let expanded = text;
    Object.entries(synonyms).forEach(([key, values]) => {
      values.forEach(synonym => {
        if (text.includes(synonym)) {
          expanded += " " + key;
        }
      });
      if (text.includes(key)) {
        expanded += " " + values.join(" ");
      }
    });
    return expanded;
  }

  const expandedUser = expandWithSynonyms(user);
  const expandedCorrect = expandWithSynonyms(correct);

  const correctKeywords = getKeywords(expandedCorrect);
  const uniqueCorrectKeywords = [...new Set(correctKeywords)];

  // Check how many correct keywords appear in expanded user answer
  const matchCount = uniqueCorrectKeywords.filter(keyword =>
    expandedUser.includes(keyword)
  ).length;

  const matchPercent = matchCount / uniqueCorrectKeywords.length;

  // Also check if user answer is long enough and meaningful
  const userWordCount = user.split(/\s+/).length;
  
  // Bonus: if user wrote a decent length answer, be more lenient
  const lengthBonus = userWordCount >= 8 ? 0.1 : 0;
  const finalScore = matchPercent + lengthBonus;

  if (finalScore >= 0.45) return "correct";
  if (finalScore >= 0.2) return "partial";
  return "incorrect";
};

// Quiz question component with full interactivity
const QuizQuestion = ({ 
  q, 
  questionNumber, 
  totalQuestions, 
  onAnswerSubmit, 
  onProgressUpdate 
}: { 
  q: SOPData["quiz"]["questions"][0]; 
  questionNumber: number;
  totalQuestions: number;
  onAnswerSubmit: (questionNumber: number, result: "correct" | "partial" | "incorrect") => void;
  onProgressUpdate: (answered: number[]) => void;
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState<"correct" | "partial" | "incorrect" | null>(null);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [attempted, setAttempted] = useState(false);

  const handleCheckAnswer = () => {
    if (!userAnswer.trim()) return;
    
    const evaluation = evaluateAnswer(userAnswer, q.answer);
    setResult(evaluation);
    setAttempted(true);
    onAnswerSubmit(questionNumber, evaluation);
  };

  const handleTryAgain = () => {
    setUserAnswer("");
    setResult(null);
    setShowModelAnswer(false);
    setAttempted(false); // Reset attempted state to allow re-entry
  };

  const getResultBox = () => {
    if (!result) return null;

    const baseClasses = "p-3 rounded-md border-l-4";
    
    if (result === "correct") {
      return (
        <div className={`${baseClasses} bg-success/10 border-success`}>
          <p className="text-sm font-medium text-success">Your answer covers the key concepts well done!</p>
          <div className="mt-3 p-3 bg-muted rounded-md border border-border">
            <p className="text-xs text-muted-foreground font-medium mb-1">Model answer:</p>
            <p className="text-xs text-foreground">{q.answer}</p>
          </div>
        </div>
      );
    }
    
    if (result === "partial") {
      return (
        <div className={`${baseClasses} bg-amber-50 border-amber-400`}>
          <p className="text-sm font-medium text-amber-700">Good thinking! You got part of it right. Check the model answer to see what you missed.</p>
          <div className="mt-3 p-3 bg-muted rounded-md border border-border">
            <p className="text-xs text-muted-foreground font-medium mb-1">Model answer:</p>
            <p className="text-xs text-foreground">{q.answer}</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className={`${baseClasses} bg-destructive/10 border-destructive`}>
        <p className="text-sm font-medium text-destructive">Not quite there yet. Read the model answer and try to understand the concept before moving on.</p>
        <div className="mt-3 p-3 bg-muted rounded-md border border-border">
          <p className="text-xs text-muted-foreground font-medium mb-1">Model answer:</p>
          <p className="text-xs text-foreground">{q.answer}</p>
        </div>
        <div className="mt-3">
          <button
            onClick={handleTryAgain}
            className="px-3 py-1 text-xs border border-border text-muted-foreground hover:text-foreground rounded-md transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="border border-border rounded-lg p-4">
      <p className="text-sm text-foreground font-medium">
        {questionNumber}. {q.question}
      </p>
      
      <div className="mt-3 space-y-3">
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full min-h-[80px] p-3 text-sm border border-border rounded-md bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          disabled={attempted && result && result !== "incorrect"}
        />
        
        {!result || result === "incorrect" ? (
          <button
            onClick={handleCheckAnswer}
            disabled={!userAnswer.trim()}
            className="px-4 py-2 text-sm bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : null}
        
        {getResultBox()}
      </div>
    </div>
  );
};

const OutputSection = ({ data, onReset }: OutputSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [answeredQuestions, setAnsweredQuestions] = useState<{ [key: number]: "correct" | "partial" | "incorrect" }>({});
  const [answeredList, setAnsweredList] = useState<number[]>([]);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleAnswerSubmit = (questionNumber: number, result: "correct" | "partial" | "incorrect") => {
    setAnsweredQuestions(prev => ({ ...prev, [questionNumber]: result }));
    if (!answeredList.includes(questionNumber)) {
      setAnsweredList(prev => [...prev, questionNumber]);
    }
  };

  const calculateScore = () => {
    const results = Object.values(answeredQuestions);
    const correct = results.filter(r => r === "correct").length;
    const total = results.length;
    return { correct, total, percentage: total > 0 ? (correct / total) * 100 : 0 };
  };

  const getScoreMessage = (percentage: number) => {
    if (percentage >= 80) return { text: "Excellent", emoji: "🏆" };
    if (percentage >= 50) return { text: "Good", emoji: "👍" };
    return { text: "Needs Review", emoji: "📚" };
  };

  const { correct, total, percentage } = calculateScore();
  const scoreMessage = getScoreMessage(percentage);
  const allAttempted = answeredList.length === data.quiz.questions.length;

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
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">
              {answeredList.length} of {data.quiz.questions.length} questions answered
            </span>
            <div className="flex-1 mx-4 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(answeredList.length / data.quiz.questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Questions */}
          <div className="space-y-3">
            {data.quiz.questions.map((q, index) => (
              <QuizQuestion
                key={q.question_number}
                q={q}
                questionNumber={index + 1}
                totalQuestions={data.quiz.questions.length}
                onAnswerSubmit={handleAnswerSubmit}
                onProgressUpdate={(answered) => setAnsweredList(answered)}
              />
            ))}
          </div>

          {/* Score Summary */}
          {allAttempted && (
            <div className="mt-6 p-4 border border-primary rounded-lg bg-primary/5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">
                    You scored {correct}/{total} — {scoreMessage.text}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {percentage.toFixed(0)}% correct answers
                  </p>
                </div>
                <div className="text-2xl">{scoreMessage.emoji}</div>
              </div>
            </div>
          )}
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
