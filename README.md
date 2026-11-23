# Interview Guides

Interactive preparation guides for internship interviews. A company toggle at the top of the sidebar switches between the Neot Capital guide, with its Second and First Interview sections, and the Soper guide.

## Soper

- **Briefing:** Paris-time countdown, Soper in sixty seconds, the four pôles, recent timeline, the role decoded against Ha Linh's experience, messages to land and questions to ask
- **Company and Team:** Photos and biographies of the likely interviewers and group leadership, MGH Energy with the L'Ardoise and Janassim fact tables, Sunti and the founder story
- **Interview Questions:** Motivation, experience, company, technical, quick calculation and French questions with spoken model answers, timed practice and self-ratings
- **Energy and Finance Primer:** e-Fuel production chain, ReFuelEU mandates, key energy concepts, holding and fund mechanics, public funding tools and French terms
- **Formula Sheet:** 28 formulas across project business plans, energy, valuation, private equity funds and budget control, with Recall Mode

## Second Interview

- **Briefing:** Countdown to Friday in Paris time, the two-hour agenda, readiness score and a daily plan
- **Modelling Case:** Case Playbook, Excel Toolkit with English and French functions, a formula-by-formula Model Builder and a 45-minute Timed Case built in an on-site spreadsheet with Fill Right, Goal Seek, Data Table and Check Model tools, plus downloadable workbooks verified in Excel
- **Conversations:** Discussion and Debrief question banks with spoken model answers, timed practice and self-ratings
- **Technical Focus:** Battery Questions with spoken model answers and worked calculations, plus a Formula Sheet of 45 income statement, cash flow, project finance and battery formulas with a Recall Mode
- **Revise:** Study Path, Formula Quiz and French Lexicon shared with the first section

## First Interview

- **Briefing:** Paris-time interview countdown, readiness score, study path and a three-day plan
- **Neot Profile and Role Decoder:** Company facts, platform debt financing, recent transactions and the offer translated into evidence to bring
- **Study:** Seven focused modules totalling about two hours, each opening with three key takeaways
- **Practice:** Flashcards, quiz, statement drills, Fleet Case Lab, Returns Lab and a mock interview with spoken model answers and an Answer Bank
- **Formula Quiz:** 52 questions across all 28 formulas, testing recall, recognition, completion and calculation, with per-formula mastery tracking
- **Prepare:** Story Builder with model answers to adapt, French lexicon and interview-day guidance

## Structure

```
index.html                 Entry point
assets/css/styles.css      Design system with light and dark themes
assets/js/core.js          Icons, storage, Paris time, formulas and progress tracking
assets/js/data/            Study, practice, interview, case and workbook content
assets/js/tools.js         Financial engine and interactive labs
assets/js/views.js         First Interview views and shared practice components
assets/js/soper.js         Soper guide views
assets/img/soper/          Soper team photos
assets/js/engine.js        Formula engine with Excel functions, Goal Seek and data tables
assets/js/sheet.js         Editable spreadsheet grid and bus lease engine
assets/js/round2.js        Second Interview views
assets/js/focus.js         Battery Questions and Formula Sheet views
assets/js/app.js           Navigation, routing, theme, search and reset
assets/files/              Practice workbooks with templates and solutions
```

The site is fully static and needs no build step. Formulas are typeset with KaTeX, and progress and notes are stored locally in the browser.
