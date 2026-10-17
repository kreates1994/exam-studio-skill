CREATE TABLE IF NOT EXISTS plans (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price_minor INTEGER NOT NULL,
  currency TEXT NOT NULL,
  features_json TEXT NOT NULL,
  checkout_url TEXT
);

CREATE TABLE IF NOT EXISTS questions (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL,
  topic TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  prompt TEXT NOT NULL,
  choices_json TEXT NOT NULL,
  correct_answer TEXT NOT NULL,
  explanation TEXT NOT NULL,
  worked_solution TEXT NOT NULL
);

INSERT OR REPLACE INTO plans (id, name, price_minor, currency, features_json, checkout_url)
VALUES
  ('free', 'Free', 0, 'PHP', '["one-at-a-time MCQ quizzes", "scoring", "answer key"]', NULL),
  ('premium', 'Premium', 50000, 'PHP', '["worked solutions", "diagrams", "adaptive review"]', 'https://sandbox-api.polar.sh/v1/checkout-links/polar_cl_59gnEKe5M2L6qclE85wZBlBQCONYPnPOq6fcL0ErqIl/redirect');

INSERT OR REPLACE INTO questions
  (id, subject, topic, difficulty, prompt, choices_json, correct_answer, explanation, worked_solution)
VALUES
  ('ce-statics-beam-001', 'Civil Engineering', 'Beam bending', 'Easy',
   'A simply supported beam of span L carries a 10 kN point load at midspan. What is the vertical reaction at each support?',
   '[{"key":"A","text":"5 kN upward"},{"key":"B","text":"10 kN upward"},{"key":"C","text":"20 kN upward"},{"key":"D","text":"0 kN"}]',
   'A',
   'The loading is symmetric, so both support reactions are equal. Their sum must balance the 10 kN load, giving 5 kN at each support.',
   'Take moments about the left support: RB·L − 10·(L/2) = 0, so RB = 5 kN. From vertical equilibrium, RA + RB − 10 = 0, so RA = 5 kN.');
