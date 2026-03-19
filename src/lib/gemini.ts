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
          content: `You are an expert corporate trainer and instructional designer. When given an SOP document, analyze it and return a JSON response with EXACTLY this structure. Return ONLY pure JSON, no markdown, no backticks, no explanation whatsoever:

{
  "summary": {
    "overview": "2-3 sentence overview of what this SOP covers",
    "key_points": ["point 1", "point 2", "point 3", "point 4", "point 5"]
  },
  "training_guide": {
    "title": "Training title based on SOP",
    "steps": [
      {
        "step_number": 1,
        "title": "Step title",
        "description": "Clear description of what to do in this step",
        "important_note": "Optional critical warning or tip"
      }
    ]
  },
  "quiz": {
    "questions": [
      {
        "question_number": 1,
        "question": "Question text here?",
        "answer": "Clear correct answer here"
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
