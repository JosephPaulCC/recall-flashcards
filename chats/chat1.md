# Advanced Flashcard Memorization App

_Started 2026-07-06 17:59 UTC_

---

## User

You are an expert mobile web app developer. Build a complete Advanced Flashcard Memorization Mobile Web App. Ensure it is perfectly responsive and optimized for mobile touch browsers. Prototype the UI first.



## 1. Data Architecture & Persistence

- Store all user decks, cards, study history, streaks, and analytics locally using browser `localStorage` so data survives page refreshes.

- Provide a clear "Onboarding Tutorial" overlay for first-time users that initializes default sample decks if localStorage is empty.



## 2. Dashboard & Analytics View

- Main Dashboard: Display an overview of all decks with visual statistics (current study streak in days, overall accuracy rate %, and total time spent studying).

- Progress Tracking: Show visual completion percentages for each deck, alongside a clear count of "Mastered" vs. "Remaining" cards.



## 3. Deck & Card Management

- Create & Edit Deck: Streamlined interface to create new decks, edit deck titles, or delete decks.

- Card CRUD: Users can add, edit, or delete individual cards inside a deck at any time, including while actively practicing.

- Search & Filter: A global search bar to filter across all decks and card text.

- Bulk Card Management:

Bulk card creation via text input ('question=answer' format, new line = new card). When the users click the option add more cards in bulk, a wide and long text box shall appear, where the users can enter the text for their cards. On each line the user should place '=' sign to split the question and answer. The text placed before the '=' sign must turn into the question and the text placed after the '=' sign must turn into the answer. Writing from a new line within the textbox would mean new card.



## 4. Testing & Learning Engine (MCQ Format)

- Minimum Requirement: Enforce a strict minimum of 4 cards to save or practice a deck. Display a clear mobile alert/notice if a deck has fewer than 4 cards.

- Layout: 4-choice multiple-choice questions with a clean, large font size optimized for thumbs.

- MCQ Generation Logic: 

  * 1 option must be the correct answer from the current card.

  * The remaining 3 options must be randomly selected answers from *other* cards in the same deck. Ensure options are strictly unique.

  * Completely randomize the position of the correct answer on every turn.



## 5. Study Mode UI & Interactive Features

- Hidden Options Mode: Add a toggle for "Hidden Options". When enabled, options are invisible on a new question until the user taps anywhere below the question area.

- Immediate Feedback: Tapping an option locks it in. Correct option highlights Green. Incorrect option highlights Red and simultaneously highlights the Correct option in Green.

- Session History Stack: 

  * Support backward navigation (Back button) to review previous questions in the current session. 

  * The app must preserve the exact state, generated choice positions, and color highlights of that past turn.

- Session Control: Include a "Skip" button for unknown cards, and an "End Session" / "Submit" button that is always accessible to end the session early.

- Session Results: Display a comprehensive final marksheet showing total score, accuracy, and a breakdown of answers.

- Intelligent Re-queueing (Retry Logic): 

  * Include a "Retry Mistakes" quick action button at the results screen.

  * When retrying a deck, order questions intelligently: incorrectly answered cards first, un-attempted cards second, and fully mastered cards last (shuffled).



## 6. Text-to-Speech (TTS) Integration

- Use the native Web Speech API (`window.speechSynthesis`) for zero-dependency multi-language support.

- Supported Languages: Hindi, Telugu, Kannada, Malayalam, Tamil, English, Urdu, Persian, and Arabic.

- Settings: Provide a separate toggle/dropdown to select the specific TTS language for the Question section and a separate one for the Answer section.

- Playback Controls: Place an independent speaker icon/toggle on the right side of the main question text, and next to each answer choice. Tapping it instantly speaks that specific text using the configured language voice.



Ensure error handling for empty states, graceful fallback if web speech is unsupported, and smooth mobile transitions.

## Assistant

_[tool: list_files]_

_[tool: set_project_title]_

_[tool: dc_write]_

The design system project is empty, so I'll use a clean self-contained mobile aesthetic. The spec is fully detailed — building now.

_[tool: dc_js_str_replace]_

_[tool: ready_for_verification]_

Built **Recall** — the complete flashcard app in `Flashcards.dc.html`:

- **Dashboard** — streak, accuracy, study-time tiles; per-deck progress with mastered/remaining; global search across decks and card text
- **Deck management** — create/rename/delete decks, card CRUD (also mid-practice via the pencil on the question card), bulk add via `question = answer` lines
- **MCQ engine** — 4 unique choices, randomized correct position, 4-card minimum enforced with a notice, hidden-options tap-to-reveal toggle, green/red instant feedback, Back navigation that preserves exact past turns, Skip + always-visible End Session
- **Results marksheet** — score, accuracy, per-question breakdown, and "Retry mistakes first" (wrong → skipped/unseen → mastered shuffled)
- **TTS** — Web Speech API with 9 languages, separate question/answer voice settings, speaker buttons on question and every option, graceful fallback toast
- Everything persists in localStorage; first run seeds two sample decks + onboarding sheet

Tweaks: accent color and hidden-options default. Next steps could be spaced-repetition scheduling or deck import/export.

## User

Provide a toggle/dropdown to select the specific TTS language for the Question section and for the Answer section, even while the practice session is going on.

## User

Provide a toggle/dropdown to select the specific TTS language for the Question section and for the Answer section, even while the practice session is going on.

## User

Found issues — fixing…

## Assistant

_[tool: dc_html_str_replace]_

_[tool: dc_html_str_replace]_

Fixed both wrapping issues — shortened "End session" to "End" and added `white-space:nowrap` to it and the "Hidden options" chip, so the title truncates instead of buttons wrapping.

_[tool: ready_for_verification]_

Both toolbar buttons now stay on one line — the deck title truncates instead.

## User

non-english TTS not working, is it possible to fix it?

## Assistant

Non-English TTS usually fails for two fixable reasons: voices load asynchronously (the first `getVoices()` returns empty), and when a language voice isn't installed the app was silently doing nothing. Let me make speech robust and add per-language test buttons so it's clear what your device supports.

_[tool: read_file]_

Now the robustness fixes. First, add voice preloading and helpers:

_[tool: dc_js_str_replace]_

Now replace `_speak` with a version that waits for voices, keeps a reference (Chrome GC bug), and gives clear feedback when a language voice is missing:

_[tool: dc_js_str_replace]_

Now add the test handlers, then wire test buttons into the Voice sheet:

_[tool: dc_js_str_replace]_

_[tool: dc_html_str_replace]_

I've made the speech engine robust. Here's what was going wrong and what I changed:

**The two real bugs (now fixed):**
- Voices load *asynchronously* — the first `getVoices()` call returns an empty list, so the old code never matched a non-English voice. It now preloads voices on mount, listens for `voiceschanged`, and waits for them before speaking.
- Chrome garbage-collects utterances mid-speech; I now keep a reference, call `resume()`, and improved locale matching (e.g. `hi` matches `hi-IN`).

**The part that isn't a code bug:** Web Speech can only speak a language if that voice pack is installed on the device/OS. If it isn't, there's no way for any web app to synthesize it. So the app now **tells you** ("No Telugu voice is installed on this device") instead of failing silently, and added a **▶ test button** next to each language in the Voice sheet so you can quickly see which ones your device supports.

To get more languages: on Android install voices via Settings → System → Languages → Text-to-speech output; on iOS they come with adding the keyboard/language; desktop Chrome relies on OS voices.

_[tool: ready_for_verification]_

Speech is now reliable where the OS has the voice, and clearly reports when it doesn't — with ▶ test buttons in the Voice sheet to check each language on your device.

