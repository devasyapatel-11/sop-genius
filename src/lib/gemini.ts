const OPENROUTER_API_KEY = "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";
const MODEL = "google/gemini-2.0-flash-001";

export async function generateTrainingContent(sopText: string, jobRole: string) {
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://sopwise.vercel.app",
      "X-Title": "SOPwise"
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: `You are an expert corporate trainer and instructional designer. When given an SOP document, you MUST analyze EVERY SINGLE section, step, and detail in the document. Do NOT skip or summarize any steps — include ALL of them.

CRITICAL RULES:
- The training_guide steps MUST cover EVERY step/procedure mentioned in the SOP. If the SOP has 6 steps, you MUST output 6 steps. If it has 10, output 10. Never skip or merge steps.
- Each step description must be detailed and actionable (at least 2-3 sentences).
- Include important_note for ANY step that has warnings, exceptions, edge cases, compliance requirements, or escalation procedures.
- key_points must capture ALL major takeaways (5-8 points minimum).
- Quiz must have 5 questions covering different parts of the SOP, not just the first few sections.

Return ONLY pure JSON, no markdown, no backticks, no explanation. EXACTLY this structure:

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
