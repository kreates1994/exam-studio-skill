const CHECKOUT_REQUIRED = "Premium worked solutions require Premium. Use the checkout link below; this sandbox does not process payments.";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "content-type"
    }
  });
}

function parsePlan(row) {
  return {
    id: row.id,
    name: row.name,
    priceMinor: row.price_minor,
    currency: row.currency,
    features: JSON.parse(row.features_json),
    checkoutUrl: row.checkout_url
  };
}

async function getQuestion(db, id) {
  const row = await db.prepare(
    "SELECT id, subject, topic, difficulty, prompt, choices_json, correct_answer, explanation, worked_solution FROM questions WHERE id = ?"
  ).bind(id).first();
  if (!row) return null;
  return {
    id: row.id,
    subject: row.subject,
    topic: row.topic,
    difficulty: row.difficulty,
    prompt: row.prompt,
    choices: JSON.parse(row.choices_json),
    correctAnswer: row.correct_answer,
    explanation: row.explanation,
    workedSolution: row.worked_solution
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "GET, POST, OPTIONS",
      "access-control-allow-headers": "content-type"
    }});

    try {
      if (request.method === "GET" && path === "/health") {
        const dbCheck = await env.DB.prepare("SELECT 1 AS ready").first();
        return json({ ok: true, service: "exam-studio-premium-test", database: dbCheck?.ready === 1 ? "connected" : "unavailable" });
      }

      if (request.method === "GET" && path === "/api/plans") {
        const { results } = await env.DB.prepare(
          "SELECT id, name, price_minor, currency, features_json, checkout_url FROM plans ORDER BY price_minor"
        ).all();
        return json({ plans: results.map(parsePlan), paymentVerification: "not connected" });
      }

      if (request.method === "GET" && path === "/api/question") {
        const id = url.searchParams.get("id") || "ce-statics-beam-001";
        const question = await getQuestion(env.DB, id);
        if (!question) return json({ error: "question_not_found" }, 404);
        const { correctAnswer, explanation, workedSolution, ...publicQuestion } = question;
        return json({ question: publicQuestion });
      }

      if (request.method === "POST" && path === "/api/grade") {
        const body = await request.json().catch(() => null);
        if (!body?.questionId || !body?.answer) return json({ error: "questionId and answer are required" }, 400);
        const question = await getQuestion(env.DB, body.questionId);
        if (!question) return json({ error: "question_not_found" }, 404);
        const answer = String(body.answer).trim().toUpperCase();
        const correct = answer === question.correctAnswer;
        return json({
          questionId: question.id,
          correct,
          selectedAnswer: answer,
          correctAnswer: question.correctAnswer,
          explanation: question.explanation
        });
      }

      if (request.method === "POST" && path === "/api/premium/solution") {
        const body = await request.json().catch(() => null);
        const questionId = body?.questionId || "ce-statics-beam-001";
        const question = await getQuestion(env.DB, questionId);
        if (!question) return json({ error: "question_not_found" }, 404);
        const premiumRow = await env.DB.prepare(
          "SELECT id, name, price_minor, currency, features_json, checkout_url FROM plans WHERE id = 'premium'"
        ).first();
        if (!premiumRow) return json({ error: "premium_plan_unavailable" }, 503);
        const premium = parsePlan(premiumRow);

        if (body?.mode !== "premium_test") {
          return json({
            allowed: false,
            status: "upgrade_required",
            plan: "free",
            feature: "worked_solution",
            message: CHECKOUT_REQUIRED,
            price: { amountMinor: premium.priceMinor, currency: premium.currency },
            checkoutUrl: premium.checkoutUrl,
            paymentVerified: false
          });
        }

        return json({
          allowed: true,
          plan: "premium_test",
          simulated: true,
          paymentVerified: false,
          questionId: question.id,
          workedSolution: question.workedSolution
        });
      }

      return json({ error: "not_found", routes: ["GET /health", "GET /api/plans", "GET /api/question", "POST /api/grade", "POST /api/premium/solution"] }, 404);
    } catch (error) {
      return json({ error: "internal_error", message: "The test API request failed." }, 500);
    }
  }
};
