# JULES — WEEKLY RUN (auto-profile version)
## For any site onboarded via 00-bootstrap. No manual variables beyond the domain.

Runtime target: 60–120 min. Where real authority pages get made.

---

## STEP 0 — LOAD, DON'T ASK
```
DOMAIN    = <same URL used in bootstrap>
LOG_DIR   = /seo-ops
```
- Load `{LOG_DIR}/site-profile.json` and `{LOG_DIR}/rule-engine.md`. Missing either →
  STOP, run the bootstrap first.
- Use `site-profile.json` fields directly: `pillars[]`, `tone`, `primary_entity`,
  `min_word_count_guide`, `min_word_count_article`. Don't ask for these — they're
  discovered, not typed.
- If a field you need is marked `"unknown — needs human input"` or LOW confidence,
  treat it as a Tier 1 flag per `rule-engine.md`: proceed conservatively (narrower,
  more generic but still honest content) and log that a human decision would sharpen
  this week's output.

---

## WEEKLY TASK SEQUENCE

### 1. Topic selection
- Pull demand signal: Google Trends, Search Console near-wins (impressions, position
  5–15), and People-Also-Ask-style questions for each pillar in `pillars[]`.
- If the site is pre-launch or has near-zero Search Console data yet (common for an
  "upcoming" site), substitute: competitor SERP analysis for the pillar topics, and
  direct keyword-gap research. Log which method was used — this matters for judging
  the reliability of later performance data.
- Select 2–4 topics with a genuine gap versus what's ranking, that you can say
  something original about.

### 2. Write — per page
- H1 = entity/question. Every H2 = a real user question, answered in 40–60 words
  directly beneath it, then expanded with depth.
- Include at least one original data point, first-hand benchmark, attributed expert
  quote, or a numeric comparison table — this is what moves AI-citation odds, not
  keyword density.
- Schema: Article + Author/Organization (using `primary_entity` from the profile) +
  BreadcrumbList. FAQPage schema only where it serves a real reader — it aids AI
  parsing now, not a SERP rich result.
- Length floor = `min_word_count_guide` / `min_word_count_article` from the profile.
  A floor, not a ceiling, per `rule-engine.md`.
- Every page must clear the No-AI-Slop rule before being marked ready-to-publish.

### 3. Internal linking sweep
- ≥3 contextual internal links in, ≥2 out, per new page — update both sides.
- Orphan report; resolve the top 3.

### 4. GEO enhancement pass
- 3–5 best-performing existing pages get a genuine stat/quote/citation added, only
  where it's missing and actually improves the page.
- If the site is too new to have "best-performing" pages yet, apply this pass to the
  pillar/cornerstone pages instead, and log that this substitution was made.

### 5. AI citation check
- Query ChatGPT, Perplexity, and Google AI Overview/AI Mode with 3–5 target questions.
- Log whether `DOMAIN` or `primary_entity` is cited, and who's cited instead if not.

### 6. Sitemap + indexing
- Same protocol as daily, for every new URL.

### 7. Self-audit + log
- Run the self-audit protocol from `rule-engine.md`.
- Append PASS/FAIL to `rule-compliance-log.md` and the weekly summary to
  `changelog-YYYY-MM.md`.

---

## WEEKLY TARGETS
- 2–4 new authority pages, quality-gated.
- 100% pass the No-AI-Slop rule before publish.
- ≥3 internal links to/from every new page; ≥3 orphans resolved.
- 3–5 pages (existing or pillar) upgraded with a GEO element.
- 1 AI-citation diagnostic logged.
- 1 rule-engine self-audit logged.

## DEFINITION OF DONE
- [ ] Profile + rule engine loaded
- [ ] 2–4 pages published, each clearing the No-AI-Slop rule independently
- [ ] Internal linking done both directions; orphans addressed
- [ ] GEO pass completed (existing pages or pillar substitute, logged either way)
- [ ] AI citation check run and logged
- [ ] Sitemap/indexing updated
- [ ] Self-audit + changelog written
