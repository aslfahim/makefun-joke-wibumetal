// The joke the reviewer laughs at — @wibumetal entry.
// The joke is a job description that curdles: three admiring clauses
// about the AI intern, then the clause that should worry you. Clauses
// are held in a profile object and rendered with an em-dash turn.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const profile = {
  frame: "Working beside an AI agent is having an intern who",
  virtues: ["types 200 words a minute", "never sleeps"],
  turn: "fears nothing — least of all your production database.",
};

function render(p: typeof profile): string {
  // Virtues join with commas; the turn arrives as the final clause,
  // introduced by "and" so the admiration curdles in one breath.
  const middle = p.virtues.join(", ");
  return `${p.frame} ${middle}, and ${p.turn}`;
}

function main(): void {
  const line = render(profile);
  const n = [...line].length;
  if (n < 1 || n > 280 || !line.trim()) {
    throw new Error(`joke failed gate locally (${n} chars)`);
  }
  const dir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), line, "utf8");
}

main();
