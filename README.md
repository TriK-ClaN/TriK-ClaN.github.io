# Neot Interview Guide

Interactive preparation guide for the Neot Capital Investment Analyst internship interviews, organised into a Second Interview section that opens by default and the original First Interview section.

## Second Interview

- **Briefing:** Countdown to Friday in Paris time, the two-hour agenda, readiness score and a daily plan
- **Modelling Case:** Case Playbook, Excel Toolkit with English and French functions, a formula-by-formula Model Builder and a 45-minute Timed Case built in an on-site spreadsheet with Fill Right, Goal Seek, Data Table and Check Model tools, plus downloadable workbooks verified in Excel
- **Conversations:** Discussion and Debrief question banks with spoken model answers, timed practice and self-ratings
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
assets/js/engine.js        Formula engine with Excel functions, Goal Seek and data tables
assets/js/sheet.js         Editable spreadsheet grid and bus lease engine
assets/js/round2.js        Second Interview views
assets/js/app.js           Navigation, routing, theme, search and reset
assets/files/              Practice workbooks with templates and solutions
```

The site is fully static and needs no build step. Formulas are typeset with KaTeX, and progress and notes are stored locally in the browser.
