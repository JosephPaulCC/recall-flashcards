import { useRef, useState } from 'react';
import {
  STORAGE_KEY, ACCENT, LANGS, uid, shuffle, mkCard, isMastered, fmtTime,
  loadData, sampleText,
} from './data';
import { useSpeech } from './useSpeech';

export function useRecall() {
  const dataRef = useRef(loadData());
  const sessionRef = useRef(null);
  const [, setBump] = useState(0);
  const rerender = () => setBump((x) => x + 1);
  const save = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dataRef.current));
    } catch (e) {}
    rerender();
  };

  const [ui, setUi] = useState({
    view: 'dashboard', query: '', modal: null,
    mTitle: '', mQ: '', mA: '', bulk: '',
    editCardId: null, confirmMsg: '', confirmCb: null,
    deckId: null, toast: '',
  });
  const patch = (p) => setUi((prev) => ({ ...prev, ...p }));

  const toastTimer = useRef(null);
  const toast = (msg) => {
    clearTimeout(toastTimer.current);
    patch({ toast: msg });
    toastTimer.current = setTimeout(() => patch({ toast: '' }), 2400);
  };

  const { speak, noTTS } = useSpeech(toast);

  const d = dataRef.current;

  function getDeck(id) {
    return d.decks.find((dk) => dk.id === (id || ui.deckId));
  }

  // ---------- session ----------
  function startSession(order) {
    const deck = getDeck();
    if (!deck) return;
    if (deck.cards.length < 4) {
      toast('You need at least 4 cards to practice this deck');
      return;
    }
    const valid = new Set(deck.cards.map((c) => c.id));
    const queue = (order || shuffle(deck.cards.map((c) => c.id))).filter((id) => valid.has(id));
    const s = { queue, turns: [], ptr: 0, t0: Date.now(), results: null };
    genTurn(s);
    sessionRef.current = s;
    patch({ view: 'study' });
  }

  function genTurn(s) {
    const deck = getDeck();
    const cardId = s.queue[s.turns.length];
    const card = deck.cards.find((c) => c.id === cardId);
    if (!card) return;
    let pool = [];
    const seen = new Set([card.a.trim()]);
    for (const c of shuffle(deck.cards)) {
      if (c.id === card.id) continue;
      const t = c.a.trim();
      if (!seen.has(t)) {
        seen.add(t);
        pool.push(c.a);
      }
      if (pool.length === 3) break;
    }
    const options = shuffle([card.a].concat(pool));
    s.turns.push({
      cardId: card.id, q: card.q, a: card.a,
      options, correctIdx: options.indexOf(card.a),
      selectedIdx: null, skipped: false, done: false, revealed: false,
    });
  }

  function answer(i) {
    const s = sessionRef.current;
    if (!s) return;
    const t = s.turns[s.ptr];
    if (!t || t.done) return;
    t.selectedIdx = i;
    t.done = true;
    const correct = i === t.correctIdx;
    const deck = getDeck();
    const card = deck && deck.cards.find((c) => c.id === t.cardId);
    if (card) {
      card.seen++;
      if (correct) {
        card.right++;
        card.streak++;
      } else {
        card.streak = 0;
      }
    }
    const st = d.stats;
    st.answered++;
    if (correct) st.correct++;
    save();
  }

  function next() {
    const s = sessionRef.current;
    if (!s) return;
    if (s.ptr < s.turns.length - 1) {
      s.ptr++;
      rerender();
      return;
    }
    if (s.turns.length < s.queue.length) {
      genTurn(s);
      s.ptr++;
      rerender();
      return;
    }
    end();
  }

  function skip() {
    const s = sessionRef.current;
    if (!s) return;
    const t = s.turns[s.ptr];
    if (t && !t.done) {
      t.skipped = true;
      t.done = true;
    }
    next();
  }

  function end() {
    const s = sessionRef.current;
    if (!s) return;
    const st = d.stats;
    st.timeMs += Date.now() - s.t0;
    const today = new Date().toDateString();
    if (st.lastDay !== today) {
      const y = new Date();
      y.setDate(y.getDate() - 1);
      st.streak = st.lastDay === y.toDateString() ? st.streak + 1 : 1;
      st.lastDay = today;
    }
    const deck = getDeck();
    const rows = [];
    let correct = 0, wrong = 0, skipped = 0;
    const wrongIds = [], skipIds = [], rightIds = [];
    for (const t of s.turns) {
      if (t.skipped || !t.done || t.selectedIdx === null) {
        skipped++;
        skipIds.push(t.cardId);
        rows.push({ q: t.q, status: 'Skipped', color: '#8A8375', detail: 'Answer: ' + t.a });
      } else if (t.selectedIdx === t.correctIdx) {
        correct++;
        rightIds.push(t.cardId);
        rows.push({ q: t.q, status: 'Correct', color: '#2E7D4F', detail: 'Answer: ' + t.a });
      } else {
        wrong++;
        wrongIds.push(t.cardId);
        rows.push({ q: t.q, status: 'Wrong', color: '#C13B2A', detail: 'You picked: ' + t.options[t.selectedIdx] + ' · Correct: ' + t.a });
      }
    }
    const seenIds = new Set(s.turns.map((t) => t.cardId));
    const unseen = s.queue.filter((id) => !seenIds.has(id));
    for (const id of unseen) {
      const c = deck && deck.cards.find((c) => c.id === id);
      if (c) rows.push({ q: c.q, status: 'Not seen', color: '#B4AD9E', detail: 'Session ended before this card' });
    }
    s.results = {
      rows, correct, wrong, skipped, total: s.queue.length, attempted: correct + wrong,
      elapsed: Date.now() - s.t0, wrongIds, skipIds: skipIds.concat(unseen), rightIds,
    };
    save();
    patch({ view: 'results' });
  }

  function retryMistakes() {
    const s = sessionRef.current;
    if (!s || !s.results) return;
    const r = s.results;
    const order = r.wrongIds.concat(r.skipIds).concat(shuffle(r.rightIds));
    startSession(order);
  }

  // ---------- view model ----------
  function buildViewModel() {
    const st = ui, settings = d.settings, stats = d.stats;
    const accent = ACCENT;
    const v = {
      accent,
      tagline: 'Flashcards that quiz you back',
      isDash: st.view === 'dashboard', isDeck: st.view === 'deck',
      isStudy: st.view === 'study', isResults: st.view === 'results',
      streak: stats.streak,
      accuracy: stats.answered ? Math.round((stats.correct / stats.answered) * 100) + '%' : '—',
      timeSpent: stats.timeMs ? fmtTime(stats.timeMs) : '0m',
      query: st.query, hasQuery: st.query.trim().length > 0, noQuery: st.query.trim().length === 0,
      setQuery: (val) => patch({ query: val }),
      clearQuery: () => patch({ query: '' }),
      toast: st.toast, hasToast: !!st.toast,
      showOnboarding: !d.onboarded,
      finishOnboarding: () => { d.onboarded = true; save(); },
      openSettings: () => patch({ modal: 'settings' }),
      closeModal: () => patch({ modal: null }),
      hasModal: !!st.modal,
      isModalDeckTitle: st.modal === 'newDeck' || st.modal === 'editDeck',
      isModalCard: st.modal === 'card', isModalBulk: st.modal === 'bulk',
      isModalSettings: st.modal === 'settings', isModalConfirm: st.modal === 'confirm',
      isModalVoice: st.modal === 'voice',
      openVoice: () => patch({ modal: 'voice' }),
      confirmMsg: st.confirmMsg,
      confirmYes: () => { const cb = st.confirmCb; patch({ modal: null, confirmCb: null }); if (cb) cb(); },
      toDash: () => { sessionRef.current = null; patch({ view: 'dashboard' }); },
      deckCount: d.decks.length + (d.decks.length === 1 ? ' deck' : ' decks'),
      langs: LANGS.map((l) => ({ code: l[0], name: l[1] })),
      qLang: settings.qLang, aLang: settings.aLang,
      setQLang: (val) => { settings.qLang = val; save(); },
      setALang: (val) => { settings.aLang = val; save(); },
      testQ: () => speak(sampleText(settings.qLang), settings.qLang),
      testA: () => speak(sampleText(settings.aLang), settings.aLang),
      noTTS,
      toggleHidden: () => { settings.hiddenOptions = !settings.hiddenOptions; save(); },
      hiddenToggleBg: settings.hiddenOptions ? accent : 'rgba(0,0,0,.18)',
      hiddenKnobLeft: settings.hiddenOptions ? '23px' : '3px',
      hiddenChipBg: settings.hiddenOptions ? '#1C1A16' : '#fff',
      hiddenChipFg: settings.hiddenOptions ? '#F6F2E9' : '#8A8375',
      mTitle: st.mTitle, mQ: st.mQ, mA: st.mA, bulk: st.bulk,
      mTitleChange: (val) => patch({ mTitle: val }),
      mQChange: (val) => patch({ mQ: val }),
      mAChange: (val) => patch({ mA: val }),
      bulkChange: (val) => patch({ bulk: val }),
      newDeckOpen: () => patch({ modal: 'newDeck', mTitle: '' }),
      editDeckOpen: () => { const dk = getDeck(); patch({ modal: 'editDeck', mTitle: dk ? dk.title : '' }); },
      deckModalTitle: st.modal === 'newDeck' ? 'New deck' : 'Rename deck',
      saveDeckModal: () => {
        const t = st.mTitle.trim();
        if (!t) { toast('Give the deck a title'); return; }
        if (st.modal === 'newDeck') {
          const dk = { id: uid(), title: t, cards: [] };
          d.decks.unshift(dk);
          patch({ modal: null, deckId: dk.id, view: 'deck' });
          toast('Deck created — add at least 4 cards to practice');
        } else {
          const dk = getDeck();
          if (dk) dk.title = t;
          patch({ modal: null });
        }
        save();
      },
      delDeckAsk: () => {
        const dk = getDeck();
        if (!dk) return;
        patch({
          modal: 'confirm', confirmMsg: 'Delete "' + dk.title + '" and all its cards?',
          confirmCb: () => {
            d.decks = d.decks.filter((x) => x.id !== dk.id);
            save();
            patch({ view: 'dashboard', deckId: null });
            toast('Deck deleted');
          },
        });
      },
      addCardOpen: () => patch({ modal: 'card', editCardId: null, mQ: '', mA: '' }),
      bulkOpen: () => patch({ modal: 'bulk', bulk: '' }),
      isEditingCard: !!st.editCardId,
      cardModalTitle: st.editCardId ? 'Edit card' : 'Add card',
      saveCard: () => {
        const dk = getDeck();
        if (!dk) return;
        const q = st.mQ.trim(), a = st.mA.trim();
        if (!q || !a) { toast('Both question and answer are required'); return; }
        if (st.editCardId) {
          const c = dk.cards.find((c) => c.id === st.editCardId);
          if (c) { c.q = q; c.a = a; }
          const s = sessionRef.current;
          if (s) {
            const t = s.turns[s.ptr];
            if (t && t.cardId === st.editCardId) {
              t.q = q;
              if (!t.done) { t.options[t.correctIdx] = a; t.a = a; }
            }
          }
        } else {
          dk.cards.push(mkCard(q, a));
          if (dk.cards.length < 4) toast((4 - dk.cards.length) + ' more card(s) needed to practice');
        }
        save();
        patch({ modal: null, editCardId: null });
      },
      delCardFromModal: () => {
        const dk = getDeck();
        if (!dk || !st.editCardId) return;
        dk.cards = dk.cards.filter((c) => c.id !== st.editCardId);
        const s = sessionRef.current;
        if (s) s.queue = s.queue.filter((id, i) => i < s.turns.length || id !== st.editCardId);
        save();
        patch({ modal: null, editCardId: null });
        toast('Card deleted');
      },
      saveBulk: () => {
        const dk = getDeck();
        if (!dk) return;
        const lines = st.bulk.split('\n');
        let added = 0, bad = 0;
        for (const line of lines) {
          if (!line.trim()) continue;
          const idx = line.indexOf('=');
          if (idx <= 0 || idx === line.length - 1) { bad++; continue; }
          const q = line.slice(0, idx).trim(), a = line.slice(idx + 1).trim();
          if (q && a) { dk.cards.push(mkCard(q, a)); added++; } else bad++;
        }
        if (!added) { toast('No valid lines — use question = answer per line'); return; }
        save();
        patch({ modal: null, bulk: '' });
        toast('Added ' + added + ' card' + (added > 1 ? 's' : '') + (bad ? ' · ' + bad + ' line(s) skipped' : ''));
      },
      practice: () => startSession(),
      endSession: () => end(),
    };

    // deck list + search
    v.deckList = d.decks.map((dk) => {
      const total = dk.cards.length;
      const mastered = dk.cards.filter((c) => isMastered(c)).length;
      const pct = total ? Math.round((mastered / total) * 100) : 0;
      return {
        id: dk.id, title: dk.title, total, mastered, remaining: total - mastered,
        pct, pctW: pct + '%', open: () => patch({ view: 'deck', deckId: dk.id, query: '' }),
      };
    });
    if (v.hasQuery) {
      const q = st.query.trim().toLowerCase();
      const hits = [];
      outer: for (const dk of d.decks) {
        const deckMatch = dk.title.toLowerCase().includes(q);
        for (const c of dk.cards) {
          if (deckMatch || c.q.toLowerCase().includes(q) || c.a.toLowerCase().includes(q)) {
            hits.push({ q: c.q, a: c.a, deckTitle: dk.title, open: () => patch({ view: 'deck', deckId: dk.id, query: '' }) });
            if (hits.length >= 30) break outer;
          }
        }
      }
      v.cardHits = hits;
      v.searchSummary = hits.length ? hits.length + ' matching card' + (hits.length > 1 ? 's' : '') : 'No matches found';
    } else {
      v.cardHits = [];
      v.searchSummary = '';
    }

    // current deck
    const deck = getDeck();
    if (deck) {
      const total = deck.cards.length;
      const mastered = deck.cards.filter((c) => isMastered(c)).length;
      v.deckTitle = deck.title;
      v.deckMastered = mastered; v.deckRemaining = total - mastered;
      v.deckPct = total ? Math.round((mastered / total) * 100) : 0; v.deckPctW = v.deckPct + '%';
      v.deckCardCount = total; v.deckEmpty = total === 0;
      v.needMore = total < 4; v.cardsNeeded = Math.max(0, 4 - total);
      v.practiceBg = total < 4 ? '#B4AD9E' : `var(--accent, ${accent})`;
      v.deckCards = deck.cards.map((c) => ({
        id: c.id, q: c.q, a: c.a, mastered: isMastered(c),
        edit: () => patch({ modal: 'card', editCardId: c.id, mQ: c.q, mA: c.a }),
        del: () => patch({
          modal: 'confirm', confirmMsg: 'Delete this card?',
          confirmCb: () => { deck.cards = deck.cards.filter((x) => x.id !== c.id); save(); toast('Card deleted'); },
        }),
      }));
    }

    // study
    const s = sessionRef.current;
    if (s && st.view === 'study') {
      const t = s.turns[s.ptr];
      if (t) {
        v.turnNum = s.ptr + 1; v.turnTotal = s.queue.length;
        v.turnBadge = t.done ? (t.skipped ? 'Skipped' : (t.selectedIdx === t.correctIdx ? 'Correct ✓' : 'Incorrect ✗')) : 'Question';
        v.turnQ = t.q;
        v.progressW = Math.round(((s.ptr + 1) / s.queue.length) * 100) + '%';
        v.covered = settings.hiddenOptions && !t.revealed && !t.done;
        v.showOptions = !v.covered;
        v.reveal = () => { t.revealed = true; rerender(); };
        v.speakQ = () => speak(t.q, settings.qLang);
        v.editTurnCard = () => patch({ modal: 'card', editCardId: t.cardId, mQ: t.q, mA: t.a });
        v.options = t.options.map((text, i) => {
          let bg = '#fff', border = 'rgba(0,0,0,.1)', fg = '#1C1A16', chipBg = 'rgba(0,0,0,.06)', chipFg = '#8A8375', opacity = 1;
          if (t.done) {
            if (i === t.correctIdx) { bg = '#E7F3EB'; border = '#2E7D4F'; fg = '#1C5233'; chipBg = '#2E7D4F'; chipFg = '#fff'; }
            else if (i === t.selectedIdx) { bg = '#FBEAE6'; border = '#C13B2A'; fg = '#7A251A'; chipBg = '#C13B2A'; chipFg = '#fff'; }
            else { opacity = 0.55; }
          }
          return {
            text, letter: 'ABCD'[i] || '', bg, border, fg, chipBg, chipFg, opacity,
            pick: () => answer(i),
            speak: () => speak(text, settings.aLang),
          };
        });
        v.canBack = s.ptr > 0;
        v.backFg = v.canBack ? '#1C1A16' : '#B4AD9E';
        v.backOpacity = v.canBack ? 1 : 0.6;
        v.goBack = () => { if (s.ptr > 0) { s.ptr--; rerender(); } };
        v.showSkip = !t.done;
        v.showNext = t.done;
        const isLast = s.turns.length === s.queue.length && s.ptr === s.turns.length - 1;
        v.nextLabel = isLast ? 'Finish · See results' : 'Next →';
        v.skip = () => skip();
        v.next = () => next();
      }
    }

    // results
    if (s && s.results && st.view === 'results') {
      const r = s.results;
      v.resScore = r.correct + ' / ' + r.total;
      v.resAccuracy = r.attempted ? Math.round((r.correct / r.attempted) * 100) + '%' : '—';
      v.resTime = fmtTime(r.elapsed);
      v.resCorrect = r.correct; v.resWrong = r.wrong;
      v.resSkipped = r.skipped + (r.total - r.correct - r.wrong - r.skipped);
      v.resRows = r.rows;
      v.hasMistakes = r.wrongIds.length + r.skipIds.length > 0;
      v.retryMistakes = () => retryMistakes();
    }

    return v;
  }

  return buildViewModel();
}
