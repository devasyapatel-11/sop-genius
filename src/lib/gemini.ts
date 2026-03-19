const GEMINI_API_KEY = "AIzaSyD-kI3_zyuF3rv8b6pg5ojRX_SdJmBQ_dc";

export async function generateTrainingContent(sopText: string, jobRole: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `SYSTEM: You are an expert corporate trainer and instructional designer. When given an SOP document, analyze it and return a JSON response with EXACTLY this structure, no markdown, no explanation, pure JSON only:

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
        "description": "Clear description of what to do",
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
}

USER SOP DOCUMENT:
[JOB ROLE: ${jobRole || "General Employee"}]

${sopText}`,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.3,
          topK: 40,
          topP: 0.95,
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data = await response.json();
  const rawText = data.candidates[0].content.parts[0].text;
  const cleaned = rawText.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
}
