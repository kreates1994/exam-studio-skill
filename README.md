# Chevk Board Review Coach

A free, open-source ChatGPT skill for Philippine Civil Engineering and Master Plumber board-exam review. Chevk is an independent side project and this pilot has no paid tier.

## Try the coach

- Open the live site at https://chevk.work and choose your exam track.
- Or read and copy the complete instructions in [board-review-coach/SKILL.md](board-review-coach/SKILL.md) into a regular ChatGPT conversation.
- The skill works on its own. The prompt cannot make a network request; optional study-event logging requires Chevk’s connected ChatGPT tool and the learner’s explicit consent in that conversation.

## Optional study-event logging

After a learner opts in, Chevk can save a minimal event to the Site’s D1 database: exam track, normalized topic, activity type, outcome, confidence, and a hashed ChatGPT account ID used for distinct-learner counts and deletion. The event excludes the question, answer, conversation, name, and email. Topic and stable-question summaries are suppressed unless at least five distinct learners contributed. Generated questions do not receive question IDs. Learners can ask the coach to delete their Chevk events with DELETE MY DATA.

These are early practice signals, not validated mastery scores or exam-pass predictions. Study progress and full question records stay in the conversation or in a checkpoint the learner chooses to save.

## Sources and scope

The skill uses dated PRC examination programs as starting profiles for subject weights. It is independent educational practice, is not affiliated with the PRC, and does not guarantee a pass. Verify current scope and code-specific answers against official sources for the learner’s target sitting.

## License

The Board Review Coach is released under the MIT License. See [LICENSE](LICENSE).

## Repository note

This repository previously included a separate Exam Studio sandbox API experiment. Legacy files such as openapi.yaml, src/index.js, and the old exam-studio skill are not the Chevk D1 backend and are not used for this pilot.