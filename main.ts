// The Moon Finally Answers Back — make.fun entry
//
// One line, spoken by the Moon, written to /output/entry.txt.
//
// DESIGN
// --------
// The competition is a judged-text contest: the house judge compares two
// one-line Moon comebacks at a time and picks the funnier one. The program
// therefore does not generate text, sample anything, or read any input. It
// emits one fixed line that was chosen beforehand by pairwise judging
// against the published judge brief (see CANDIDATES.md in the bounty
// folder): a direct answer to a wish, in the Moon's own wry voice, with
// the turn landing in the final clause.
//
// Why a fixed string instead of a generator:
//   - The judge scores the exact bytes of the output file. A generator
//     could only make the output worse on some runs, and the entry is
//     graded twice, so any randomness would risk two different texts.
//   - Determinism is a hard requirement of the harness: two runs must
//     produce byte-identical output. A literal is deterministic by
//     construction, with nothing to seed, order, or stabilise.
//
// Why no trailing newline:
//   - The gate counts the characters of the whole file (1-240, not only
//     whitespace) and the entry must read as a single line. Writing the
//     line with no trailing newline keeps the file at exactly the line's
//     own length, 71 characters, and keeps "one line" literally true.
//
// Why the output directory is created first:
//   - The sandbox mounts /output for the entry, but a local run may not
//     have it. Creating it recursively makes the program behave the same
//     in both places instead of failing on a missing directory.
//
// The line itself (71 characters):
//   "No, I will not make him text back. I am the Moon, not your ex's mother."
// It answers a wish (criterion 1 of the judge brief), gets its laugh from
// the refusal plus the surprise comparison (criterion 2), sounds like the
// Moon — old, wry, tired of being wished upon (criterion 3) — and the
// turn, "not your ex's mother", arrives in the last clause (criterion 4),
// with no character wasted (criterion 5).

import { mkdirSync, writeFileSync } from "node:fs";

// The Moon's comeback. Kept as a single literal so the output is exactly
// these bytes on every run, on every machine, with no input or state.
const LINE =
  "No, I will not make him text back. I am the Moon, not your ex's mother.";

// The harness reads the entry from this path. It is the only path the
// program touches, and it writes only the line above — no extra files,
// no network, no clock, no randomness.
const OUT_PATH = "/output/entry.txt";

mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, LINE, "utf8");
