# EXAM/STUDIO

A small public ChatGPT skill for Free practice quizzes and a Premium sandbox checkout link.

## Install in ChatGPT

1. Download [`exam-studio-skill.zip`](exam-studio-skill.zip).
2. In ChatGPT, open **Plugins → Skills → Create → Upload from your computer** and select the ZIP.
3. Test it with: `I’m on Free. I want a worked solution. Show the checkout link.`

ChatGPT Skills are available only to eligible workspaces, subject to their settings. ChatGPT currently supports sharing skills with people in a workspace; this GitHub repository is the public distribution copy. [OpenAI Skills guide](https://help.openai.com/en/articles/20001066-skills-in-chatgpt/)

If your ChatGPT account has no Skills page, paste [`CHATGPT-TEST-PROMPT.md`](CHATGPT-TEST-PROMPT.md) into a regular chat.

## What it does

- Free: one-question-at-a-time multiple-choice quizzes, scoring, answer key.
- Premium: worked solutions, diagrams, and adaptive review; ₱500 one-time, plus any checkout tax.
- A pre-created Polar **Sandbox** checkout link is shown when Premium is requested. Sandbox payments are not processed. ChatGPT does not create new Polar checkout links or verify payments.

The skill is in [`exam-studio/SKILL.md`](exam-studio/SKILL.md). The ZIP contains that folder as its single top-level folder for upload.
