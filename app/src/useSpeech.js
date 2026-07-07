import { useEffect, useRef } from 'react';
import { langName } from './data';

export function useSpeech(toast) {
  const voicesRef = useRef([]);
  const utterRef = useRef(null);

  useEffect(() => {
    const synth = typeof window !== 'undefined' && window.speechSynthesis;
    if (!synth) return;
    const load = () => {
      try {
        voicesRef.current = synth.getVoices() || [];
      } catch (e) {}
    };
    load();
    // voices populate asynchronously in most browsers — listen and cache
    try {
      synth.addEventListener('voiceschanged', load);
    } catch (e) {
      synth.onvoiceschanged = load;
    }
    // Chrome sometimes needs a nudge before it emits voiceschanged
    const t1 = setTimeout(load, 200);
    const t2 = setTimeout(load, 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      try {
        synth.removeEventListener('voiceschanged', load);
      } catch (e) {}
    };
  }, []);

  function pickVoice(lang) {
    let voices = voicesRef.current.length ? voicesRef.current : [];
    if (!voices.length && window.speechSynthesis) {
      try {
        voices = speechSynthesis.getVoices() || [];
      } catch (e) {}
    }
    if (!voices.length) return null;
    const want = lang.toLowerCase().replace('_', '-');
    const two = want.slice(0, 2);
    return (
      voices.find((v) => v.lang && v.lang.toLowerCase().replace('_', '-') === want) ||
      voices.find((v) => v.lang && v.lang.toLowerCase().slice(0, 2) === two) ||
      null
    );
  }

  function speak(text, lang) {
    if (!text || !String(text).trim()) return;
    const synth = window.speechSynthesis;
    if (!synth || !window.SpeechSynthesisUtterance) {
      toast('Speech isn’t supported on this device');
      return;
    }
    const run = () => {
      try {
        synth.cancel();
        const u = new SpeechSynthesisUtterance(String(text));
        u.lang = lang;
        u.rate = 0.9;
        u.pitch = 1;
        const v = pickVoice(lang);
        if (v) {
          u.voice = v;
          u.lang = v.lang;
        } else if (lang.slice(0, 2) !== 'en') {
          toast('No ' + langName(lang) + ' voice is installed on this device');
        }
        u.onerror = (ev) => {
          if (ev && ev.error && ev.error !== 'interrupted' && ev.error !== 'canceled') {
            toast('Playback failed — voice may be unavailable');
          }
        };
        utterRef.current = u; // keep a reference so Chrome doesn't garbage-collect mid-speech
        try {
          synth.resume();
        } catch (e) {}
        synth.speak(u);
      } catch (e) {
        toast('Could not play speech');
      }
    };
    // Voices load asynchronously — if they aren't ready yet, wait for them once.
    let voices = voicesRef.current.length ? voicesRef.current : [];
    if (!voices.length) {
      try {
        voices = synth.getVoices() || [];
      } catch (e) {}
      voicesRef.current = voices;
    }
    if (voices.length) {
      run();
      return;
    }
    let fired = false;
    const once = () => {
      if (fired) return;
      fired = true;
      try {
        voicesRef.current = synth.getVoices() || [];
      } catch (e) {}
      run();
    };
    try {
      synth.addEventListener('voiceschanged', once, { once: true });
    } catch (e) {
      synth.onvoiceschanged = once;
    }
    setTimeout(once, 350);
  }

  const noTTS = typeof window !== 'undefined' && !window.speechSynthesis;

  return { speak, noTTS };
}
