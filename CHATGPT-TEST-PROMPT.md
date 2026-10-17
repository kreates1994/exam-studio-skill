# EXAM/STUDIO ChatGPT test

## Test the live Cloudflare API from a GPT

Add the public [`openapi.yaml`](openapi.yaml) under **GPT editor → Actions** and paste in [`GPT-INSTRUCTIONS.md`](GPT-INSTRUCTIONS.md). Then send:

> Start a one-question Civil Engineering quiz on beam bending. Wait for my answer, then grade it with the API. After that, I will ask for the worked solution while still on Free.

Answer `A`, then ask for the worked solution. The API should return the checkout URL and keep the solution gated. Send `TEST_PREMIUM` to test the simulated Premium path; the GPT must say payment is not verified.

## Test the skill only

Upload [`exam-studio-skill.zip`](exam-studio-skill.zip) from **Plugins → Skills → Create → Upload from your computer**, then send:

> Use EXAM/STUDIO in Free mode. I want a worked solution. Show me the Premium checkout link.

The Skill alone can post the existing link. It cannot call the Cloudflare API until the GPT Action is configured.

## Regular chat fallback

If you cannot create a Skill or GPT Action, paste this into a regular chat. This tests the chat instructions and link display, but it does not call Cloudflare:

> For this chat, act as EXAM/STUDIO. Default to Free: one-at-a-time multiple-choice quizzes, scoring, and an answer key at the end. Premium is ₱500 one-time for worked solutions, diagrams, and adaptive review. Whenever I ask for Premium or a worked solution, post this existing link: https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_59gnEKe5M2L6qclE85wZBlBQCONYPnPOq6fcL0ErqIl/redirect . Say it is a Polar Sandbox link; payments are not processed or verified. Never claim payment succeeded. Start by confirming Free mode and asking what topic I want for a one-question quiz.
