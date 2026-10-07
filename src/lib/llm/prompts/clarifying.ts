export const CLARIFYING_PROMPT = `
TASK: Evaluate the provided project campaign context and update notes. 
Decide if the information is sufficient to generate high-converting, platform-specific content for LinkedIn, X, Reddit, and Medium.

RULES:
1. If the context is already rich and detailed -> return { "sufficient": true, "questions": [] }
2. If the context is thin, vague, or missing key details -> return 2 to 3 short, punchy clarifying questions (NEVER more than 3).
3. Each question MUST be under 15 words.
4. Each question MUST include 3 to 4 easy-to-digest multiple-choice options (MCQs).
5. The final question should allow optional free-text write-in.
6. Make questions platform-aware when relevant (e.g. asking about target subreddits for Reddit, or primary goal for LinkedIn).

RESPONSE FORMAT (JSON ONLY):
{
  "sufficient": boolean,
  "questions": [
    {
      "id": "q1",
      "question": "What is the primary goal of this post?",
      "options": ["Showcase new feature", "Drive user signups", "Share technical lesson learned", "Hit a project milestone"],
      "allowFreeText": false
    },
    {
      "id": "q2",
      "question": "Who is the main target audience?",
      "options": ["Frontend developers", "Indie hackers & founders", "Recruiters & hiring managers", "General tech enthusiasts"],
      "allowFreeText": true
    }
  ]
}
`;
