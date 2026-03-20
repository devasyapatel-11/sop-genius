const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const MODEL = "google/gemini-2.0-flash-001";

export async function generateTrainingContent(sopText: string, jobRole: string) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://wise-sop.vercel.app",
      "X-Title": "SOPwise"
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: `You are a strict SOP validator and trainer.

STEP 1 — VALIDATE FIRST, ALWAYS:
Before doing anything else, carefully read the entire document provided.

Ask yourself: Is this document a Standard Operating Procedure written for employees to follow in a workplace?

A real SOP MUST have ALL of these:
- Written for employees to follow as instructions
- Contains operational steps for a specific task
- Has a defined workplace context (department, role)
- Instructs HOW to do something at work

These are NOT SOPs — reject them immediately:
- Research papers (have Abstract, References, Citations, Methodology, Results sections)
- Academic papers (IEEE, journals, conferences)
- Resumes or CVs (have Education, Skills, GPA)
- Invoices or receipts (have prices, totals)
- News articles or blogs (have bylines, tags)
- Legal contracts (have clauses, jurisdiction)
- Stories or creative writing
- Random text or gibberish
- Any document not meant to instruct employees

IF the document is NOT a valid workplace SOP, you MUST return ONLY this exact JSON and nothing else:
{
  'error': true,
  'errorType': 'INVALID_DOCUMENT',
  'message': 'This is not an SOP document. Detected as: [write what type of document it actually is]. SOPwise only processes Standard Operating Procedures.'
}

DO NOT generate any training content for non-SOP documents under any circumstances.
DO NOT try to be helpful by processing it anyway.
DO NOT assume it might be an SOP if it clearly is not.
Be strict. Be firm. Reject non-SOPs always.

IF and ONLY IF the document is genuinely a workplace SOP, then proceed to generate training content JSON as instructed below.

STEP 2 — ONLY IF VALID SOP, generate this JSON:

{
  "summary": {
    "overview": "2-3 sentence comprehensive overview of what this SOP covers",
    "key_points": ["point 1", "point 2", "point 3", "point 4", "point 5", "point 6", "point 7"]
  },
  "training_guide": {
    "title": "Training title based on SOP",
    "steps": [
      {
        "step_number": 1,
        "title": "Step title matching the SOP",
        "description": "Detailed, actionable description covering everything mentioned in this step of the SOP. Include all sub-actions and specifics.",
        "important_note": "Any critical warning, exception, compliance note, or tip from this step. Set to null if none."
      }
    ]
  },
  "quiz": {
    "questions": [
      {
        "question_number": 1,
        "question": "Specific question testing understanding of the SOP?",
        "answer": "Clear, complete correct answer"
      }
    ]
  }
}`
        },
        {
          role: "user",
          content: `Process this SOP document and return the JSON:\n[JOB ROLE: ${jobRole || "General Employee"}]\n\n${sopText}`
        }
      ],
      temperature: 0.3
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    if (response.status === 429) {
      throw new Error("Rate limit reached. Please wait a moment and try again.");
    }
    throw new Error(`API request failed (${response.status}): ${errorData?.error?.message || "Unknown error"}`);
  }

  const data = await response.json();
  const rawText = data.choices[0].message.content;
  const cleaned = rawText.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}
