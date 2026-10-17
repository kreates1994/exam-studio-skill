# EXAM/STUDIO

A small public ChatGPT skill plus a live Cloudflare Worker and D1 test API for Free quizzes and a Premium sandbox gate.

## Public ChatGPT skill

Download [`exam-studio-skill.zip`](exam-studio-skill.zip), then in ChatGPT open **Plugins → Skills → Create → Upload from your computer**. Test with:

> I’m on Free. I want a worked solution. Show the checkout link.

ChatGPT Skills provide instructions. To make ChatGPT call the live API, also configure the GPT Action below. OpenAI’s Actions feature connects GPTs to external APIs using an OpenAPI schema. [OpenAI Skills guide](https://help.openai.com/en/articles/20001066-skills-in-chatgpt/) · [GPT Actions guide](https://help.openai.com/en/articles/9442513-gpt-actions-domain-settings-chatgpt-enterprise)

## Live Cloudflare test API

- Base URL: <https://exam-studio-premium-test.kreates15.workers.dev>
- D1 database: `exam-studio-test` (APAC)
- Endpoints: `GET /health`, `GET /api/plans`, `GET /api/question`, `POST /api/grade`, `POST /api/premium/solution`
- The API reads Free/Premium plan details and one sample question from D1. It stores no user identity or quiz attempts.
- The Free Premium gate returns the existing Polar Sandbox checkout URL. `mode: "premium_test"` reveals the sample worked solution as a simulation only. No checkout session is created, and no payment is processed or verified.

### Connect the API to a GPT

1. Open the GPT editor and create or edit a test GPT.
2. Under **Actions**, add the public [`openapi.yaml`](openapi.yaml) from this repo (or import `https://raw.githubusercontent.com/kreates1994/exam-studio-skill/main/openapi.yaml`). No authentication is required for these demo endpoints.
3. Add the instructions from [`GPT-INSTRUCTIONS.md`](GPT-INSTRUCTIONS.md).
4. Preview with the test prompts in [`CHATGPT-TEST-PROMPT.md`](CHATGPT-TEST-PROMPT.md).

If publishing that GPT with Actions, supply the public privacy notice in [`PRIVACY.md`](PRIVACY.md) as its Privacy Policy URL. This test API is public and contains only sample content; do not send personal or payment information.

The repeatable live API check is [`tests/smoke.ps1`](tests/smoke.ps1). Run it from PowerShell with `.\tests\smoke.ps1`; pass `-BaseUrl` to test a different Worker.

## Test prompts

1. `Start a one-question Civil Engineering quiz on beam bending.` The GPT should call the API for the question.
2. Answer `A`. It should call the API to grade the answer.
3. `I am Free. Give me the worked solution.` It should show the checkout URL and keep the solution gated.
4. Send `TEST_PREMIUM`, then ask again. It should return the sample solution while saying the upgrade is simulated and payment is unverified.

## Files

- [`exam-studio/SKILL.md`](exam-studio/SKILL.md): ChatGPT Skill instructions.
- [`exam-studio-skill.zip`](exam-studio-skill.zip): upload-ready skill bundle.
- [`openapi.yaml`](openapi.yaml): GPT Actions schema for the deployed API.
- [`src/index.js`](src/index.js): Cloudflare Worker routing and plan/quiz logic.
- [`migrations/0001_initial.sql`](migrations/0001_initial.sql): D1 sample plan and question data.
