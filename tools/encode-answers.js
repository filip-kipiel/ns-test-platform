/*
 * Generator zakodowanego klucza odpowiedzi.
 * Uruchom:  node tools/encode-answers.js
 *
 * Po edycji pytań w js/questions.js zaktualizuj poniższą tablicę `answers`
 * (indeksy 0–3: A=0, B=1, C=2, D=3 — względem KOLEJNOŚCI opcji w questions.js),
 * uruchom skrypt i wklej wynik do `window.ANSWER_KEY` w js/questions.js.
 */
const answers = [0, 1, 3, 2, 0, 2, 3, 0, 2, 1, 2, 3, 1, 2, 3];
const salt = "NSFK-2026-NetworkSecurity"; // musi być identyczny jak ANSWER_SALT

const json = JSON.stringify(answers);
let xored = "";
for (let i = 0; i < json.length; i++) {
  xored += String.fromCharCode(json.charCodeAt(i) ^ salt.charCodeAt(i % salt.length));
}
const b64 = Buffer.from(xored, "binary").toString("base64");

console.log("window.ANSWER_KEY  = \"" + b64 + "\";");
console.log("window.ANSWER_SALT = \"" + salt + "\";");
