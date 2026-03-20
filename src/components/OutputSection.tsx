import { useState, useEffect, useRef } from "react";
import { Copy, Check, ChevronDown, Presentation } from "lucide-react";
import pptxgen from "pptxgenjs";

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

const CopyButton = ({ text, cardType }: { text: string; cardType: "summary" | "training" | "quiz" }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    let formattedText = "";
    
    // Smart formatting based on card type
    switch (cardType) {
      case "summary":
        formattedText = `=== STRUCTURED SUMMARY ===\n\n${text}`;
        break;
      case "training":
        formattedText = `=== TRAINING GUIDE ===\n\n${text}`;
        break;
      case "quiz":
        formattedText = `=== QUIZ QUESTIONS ===\n\n${text}`;
        break;
    }
    
    navigator.clipboard.writeText(formattedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="warm-copy-btn flex items-center gap-1.5 text-xs px-2 py-1 rounded transition-colors"
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

    if (result === "correct") {
      return (
        <div className="warm-success-box p-3 rounded-md">
          <p className="text-sm font-medium">Your answer covers the key concepts well done!</p>
          <div className="mt-3 p-3 warm-model-answer rounded-md">
            <p className="text-xs font-medium mb-1">Model answer:</p>
            <p className="text-xs">{q.answer}</p>
          </div>
        </div>
      );
    }
    
    if (result === "partial") {
      return (
        <div className="warm-partial-box p-3 rounded-md">
          <p className="text-sm font-medium">Good thinking! You got part of it right. Check the model answer to see what you missed.</p>
          <div className="mt-3 p-3 warm-model-answer rounded-md">
            <p className="text-xs font-medium mb-1">Model answer:</p>
            <p className="text-xs">{q.answer}</p>
          </div>
        </div>
      );
    }
    
    return (
      <div className="warm-incorrect-box p-3 rounded-md">
        <p className="text-sm font-medium">Not quite there yet. Read the model answer and try to understand the concept before moving on.</p>
        <div className="mt-3 p-3 warm-model-answer rounded-md">
          <p className="text-xs font-medium mb-1">Model answer:</p>
          <p className="text-xs">{q.answer}</p>
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
          className="w-full min-h-[80px] p-3 text-sm warm-input resize-none focus:outline-none"
          disabled={attempted && result && result !== "incorrect"}
        />
        
        {!result || result === "incorrect" ? (
          <button
            onClick={handleCheckAnswer}
            disabled={!userAnswer.trim()}
            className="px-4 py-2 text-sm warm-primary-btn rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
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

  const generatePPTX = async () => {
    const pptx = new pptxgen();
    
    pptx.layout = "LAYOUT_WIDE";
    pptx.title = data.training_guide.title;

    const CREAM = "FEFDE8";
    const GOLDEN = "C8832A";
    const DARK = "3D2B0E";
    const MEDIUM = "4A3520";
    const WHITE = "FFFFFF";

    // SLIDE 1 — Title slide
    const titleSlide = pptx.addSlide();
    titleSlide.background = { color: GOLDEN };
    titleSlide.addText(data.training_guide.title, {
      x: 1, y: 2, w: 11, h: 1.5,
      fontSize: 36,
      bold: true,
      color: WHITE,
      align: "center"
    });
    titleSlide.addText("AI-Generated Training — SOPwise", {
      x: 1, y: 3.8, w: 11, h: 0.6,
      fontSize: 18,
      color: WHITE,
      align: "center",
      transparency: 15
    });
    titleSlide.addText(new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric'
    }), {
      x: 1, y: 4.6, w: 11, h: 0.5,
      fontSize: 14,
      color: WHITE,
      align: "center",
      transparency: 25
    });

    // SLIDE 2 — Overview slide
    const overviewSlide = pptx.addSlide();
    overviewSlide.background = { color: CREAM };
    overviewSlide.addText("What This Training Covers", {
      x: 0.5, y: 0.4, w: 12, h: 0.8,
      fontSize: 28,
      bold: true,
      color: DARK
    });
    overviewSlide.addText(data.summary.overview, {
      x: 0.5, y: 1.4, w: 12, h: 1.2,
      fontSize: 14,
      color: MEDIUM,
      wrap: true
    });
    
    const keyPointsText = data.summary.key_points
      .map(point => ({ 
        text: point, 
        options: { 
          bullet: { type: "bullet" as const, color: GOLDEN }, 
          color: MEDIUM, 
          fontSize: 13 
        } 
      }));
    overviewSlide.addText(keyPointsText, {
      x: 0.5, y: 2.8, w: 12, h: 3.5,
      wrap: true
    });

    // SLIDES 3 to N — One per training step
    data.training_guide.steps.forEach((step, index) => {
      const stepSlide = pptx.addSlide();
      stepSlide.background = { color: CREAM };
      
      // Step number badge (circle shape)
      stepSlide.addShape(pptx.ShapeType.ellipse, {
        x: 0.5, y: 0.4, w: 0.7, h: 0.7,
        fill: { color: GOLDEN },
        line: { color: GOLDEN }
      });
      stepSlide.addText(String(step.step_number), {
        x: 0.5, y: 0.4, w: 0.7, h: 0.7,
        fontSize: 16,
        bold: true,
        color: WHITE,
        align: "center",
        valign: "middle"
      });
      
      // Step title
      stepSlide.addText(step.title, {
        x: 1.4, y: 0.4, w: 11, h: 0.7,
        fontSize: 24,
        bold: true,
        color: DARK
      });
      
      // Divider line
      stepSlide.addShape(pptx.ShapeType.line, {
        x: 0.5, y: 1.3, w: 12, h: 0,
        line: { color: "E8D5A3", width: 1 }
      });
      
      // Step description
      stepSlide.addText(step.description, {
        x: 0.5, y: 1.5, w: 12, h: 3,
        fontSize: 14,
        color: MEDIUM,
        wrap: true,
        valign: "top"
      });
      
      // Important note if exists
      if (step.important_note) {
        stepSlide.addShape(pptx.ShapeType.rect, {
          x: 0.5, y: 4.6, w: 12, h: 0.9,
          fill: { color: "FFE8A3" },
          line: { color: GOLDEN, width: 1 }
        });
        stepSlide.addText("⚠️  " + step.important_note, {
          x: 0.6, y: 4.65, w: 11.8, h: 0.8,
          fontSize: 12,
          color: DARK,
          wrap: true
        });
      }
      
      // Slide number bottom right
      stepSlide.addText(
        `Step ${step.step_number} of ${data.training_guide.steps.length}`, 
      {
        x: 10, y: 6.8, w: 3, h: 0.3,
        fontSize: 11,
        color: "B09060",
        align: "right"
      });
    });

    // QUIZ SLIDE
    const quizSlide = pptx.addSlide();
    quizSlide.background = { color: CREAM };
    quizSlide.addText("Knowledge Check", {
      x: 0.5, y: 0.3, w: 12, h: 0.8,
      fontSize: 28,
      bold: true,
      color: DARK
    });
    
    data.quiz.questions.forEach((q, index) => {
      const yPos = 1.2 + (index * 1.0);
      quizSlide.addText(
        `${q.question_number}. ${q.question}`, 
      {
        x: 0.5, y: yPos, w: 10, h: 0.5,
        fontSize: 13,
        bold: true,
        color: MEDIUM
      });
      quizSlide.addShape(pptx.ShapeType.line, {
        x: 0.5, y: yPos + 0.55, w: 8, h: 0,
        line: { color: "E8D5A3", width: 1, dashType: "dash" }
      });
    });

    // END SLIDE
    const endSlide = pptx.addSlide();
    endSlide.background = { color: GOLDEN };
    endSlide.addText("Training Complete", {
      x: 1, y: 2.2, w: 11, h: 1.2,
      fontSize: 40,
      bold: true,
      color: WHITE,
      align: "center"
    });
    endSlide.addText("Generated by SOPwise", {
      x: 1, y: 3.6, w: 11, h: 0.6,
      fontSize: 20,
      color: WHITE,
      align: "center",
      transparency: 15
    });

    // Download the file
    await pptx.writeFile({ 
      fileName: `sopwise-training-${Date.now()}.pptx` 
    });
  };

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
                  <div className="mt-2 warm-warning-box">
                    <span className="warm-warning-icon">⚠️</span> {step.important_note}
                  </div>
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
            <div className="flex-1 mx-4 h-2 warm-progress-bg rounded-full overflow-hidden">
              <div 
                className="h-full warm-progress-fill transition-all duration-300"
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
            <div className="mt-6 p-4 border-2 border-primary rounded-lg bg-background">
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
          className={`print-card warm-card border-l-4 ${card.borderColor} animate-fade-in-up`}
          style={{ animationDelay: `${i * 150}ms` }}
        >
          <div className="flex items-center justify-between px-6 pt-5 pb-3">
            <h2 className="text-lg font-medium text-foreground">{card.title}</h2>
            <CopyButton text={card.copyText} cardType={
              card.title === "Structured Summary" ? "summary" :
              card.title === "Step-by-Step Training Guide" ? "training" :
              "quiz"
            } />
          </div>
          <div className="px-6 pb-6">{card.content}</div>
        </div>
      ))}

      <div className="flex items-center justify-center gap-4 pt-4 pb-8 no-print">
        <button
          onClick={onReset}
          className="px-6 py-2.5 text-sm border-2 border-primary text-primary hover:bg-background rounded-lg transition-colors font-medium"
        >
          Start Over
        </button>
        <button
          onClick={() => window.print()}
          className="px-6 py-2.5 text-sm warm-primary-btn font-medium"
        >
          Download as PDF
        </button>
        <button
          onClick={generatePPTX}
          className="px-6 py-2.5 text-sm warm-primary-btn font-medium flex items-center gap-2"
        >
          <Presentation className="w-4 h-4" />
          Download as PPTX
        </button>
      </div>
    </div>
  );
};

export default OutputSection;
