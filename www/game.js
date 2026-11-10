/* Shelfie — puzzle de tri. Logique pure + rendu DOM, sans dépendance. */
(() => {
  'use strict';

  // ---------- Données ----------
  const CAP = 4;
  const PALETTE = [
    ['#ff6b6b', '●'], ['#4dabf7', '■'], ['#51cf66', '▲'], ['#fcc419', '★'], ['#cc5de8', '◆'],
    ['#ff922b', '♥'], ['#22b8cf', '✚'], ['#f06595', '⬟'], ['#94d82d', '☾'], ['#845ef7', '✿'],
  ];

  const store = {
    get(k, d) { try { const v = localStorage.getItem('shelfie.' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem('shelfie.' + k, JSON.stringify(v)); } catch {} },
  };

  // ---------- Règles ----------
  const top = s => s[s.length - 1];

  // Nombre d'objets identiques consécutifs au sommet d'une étagère
  function runLength(s) {
    let n = 0;
    while (n < s.length && s[s.length - 1 - n] === top(s)) n++;
    return n;
  }

  function canMove(state, from, to) {
    if (from === to) return false;
    const a = state[from], b = state[to];
    if (!a.length || b.length >= CAP) return false;
    return !b.length || top(b) === top(a);
  }

  // Déplace le groupe de même couleur du sommet, autant que la place le permet
  function move(state, from, to) {
    const a = state[from], b = state[to];
    let n = Math.min(runLength(a), CAP - b.length);
    const moved = n;
    while (n--) b.push(a.pop());
    return moved;
  }

  const isShelfDone = s => s.length === CAP && s.every(x => x === s[0]);
  const isWon = state => state.every(s => !s.length || isShelfDone(s));

  // ---------- Génération ----------
  // Solveur DFS borné : on ne garde que les niveaux dont on a trouvé une solution.
  function solvable(state, budget = 20000) {
    const seen = new Set();
    let steps = 0;
    const key = st => st.map(s => s.join('')).sort().join('|');
    function dfs(st) {
      if (++steps > budget) return false;
      if (isWon(st)) return true;
      const k = key(st);
      if (seen.has(k)) return false;
      seen.add(k);
      for (let i = 0; i < st.length; i++) {
        if (!st[i].length || isShelfDone(st[i])) continue;
        for (let j = 0; j < st.length; j++) {
          // Évite les déplacements inutiles vers une étagère vide depuis une étagère déjà homogène
          if (!canMove(st, i, j)) continue;
          if (!st[j].length && st[i].every(x => x === st[i][0])) continue;
          const nx = st.map(s => s.slice());
          move(nx, i, j);
          if (dfs(nx)) return true;
        }
      }
      return false;
    }
    return dfs(state.map(s => s.slice()));
  }

  function rng(seed) { // petit PRNG déterministe : un niveau = toujours le même
    let t = seed + 0x6D2B79F5;
    return () => {
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function makeLevel(n) {
    const colors = Math.min(3 + Math.floor((n - 1) / 3), PALETTE.length);
    const empties = n < 15 ? 2 : 1 + (n % 4 === 0 ? 1 : 0);
    for (let attempt = 0; ; attempt++) {
      const r = rng(n * 1000 + attempt);
      const pool = [];
      for (let c = 0; c < colors; c++) for (let i = 0; i < CAP; i++) pool.push(c);
      for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(r() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
      const state = [];
      for (let c = 0; c < colors; c++) state.push(pool.slice(c * CAP, (c + 1) * CAP));
      for (let e = 0; e < empties; e++) state.push([]);
      if (!isWon(state) && solvable(state)) return state;
    }
  }

  // ---------- Sons & vibrations ----------
  let audio;
  function beep(freq, dur = 0.08, type = 'sine', vol = 0.12) {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const o = audio.createOscillator(), g = audio.createGain();
      o.type = type; o.frequency.value = freq;
      g.gain.setValueAtTime(vol, audio.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + dur);
      o.connect(g).connect(audio.destination);
      o.start(); o.stop(audio.currentTime + dur);
    } catch {}
  }
  const buzz = ms => { try { navigator.vibrate && navigator.vibrate(ms); } catch {} };

  // ---------- Jeu ----------
  const $ = id => document.getElementById(id);
  const boardEl = $('board');
  let level = store.get('level', 1);
  let state, history, selected, extraShelfUsed, pop = null;
  const setTheme = t => {
    document.body.dataset.theme = t; store.set('theme', t);
    document.querySelectorAll('.theme_card').forEach(c => c.classList.toggle('is-picked', c.dataset.pick === t));
  };
  // Bonus offerts par les réseaux (stock sauvegardé sur l'appareil)
  const SOCIALS = [
    { id: 'instagram', name: 'Instagram', icon: '📸', url: 'https://www.instagram.com/shelfie.game/' }, // ← renseigner l'URL de la page une fois créée
    { id: 'tiktok', name: 'TikTok', icon: '🎵', url: 'https://www.tiktok.com/@shelfie.game' },
  ];
  const bonus = store.get('bonus', { undo: 0, shelf: 0 });
  const claimed = store.get('claimed', {});
  const saveBonus = () => { store.set('bonus', bonus); store.set('claimed', claimed); };

  function startLevel(n) {
    level = n; store.set('level', n);
    state = makeLevel(n);
    history = []; selected = null; extraShelfUsed = false;
    $('win').hidden = true;
    render();
  }

  function render() {
    $('level').textContent = level;
    $('streak').textContent = store.get('streak', 0);
    $('undo').disabled = !history.length;
    $('shelf').disabled = extraShelfUsed;
    $('undo').querySelector('.btn_ad').textContent = bonus.undo > 0 ? `× ${bonus.undo} offert${bonus.undo > 1 ? 's' : ''}` : '▶ pub';
    $('shelf').querySelector('.btn_ad').textContent = bonus.shelf > 0 ? `× ${bonus.shelf} offerte${bonus.shelf > 1 ? 's' : ''}` : '▶ pub';
    $('bonusCount').textContent = bonus.undo + bonus.shelf > 0 ? `${bonus.undo + bonus.shelf} en stock` : '';

    // Taille des objets adaptée à l'écran et au nombre d'étagères
    const availH = boardEl.clientHeight || 400;
    // Chaque étagère coûte ~58px (marges + tranche 3D). Si ça ne tient pas, mode compact (marges réduites)
    const n = state.length, maxW = Math.floor((Math.min(window.innerWidth, 520) - 32 - 28 - CAP * 8) / CAP);
    let overhead = 58;
    boardEl.classList.remove('is-dense');
    if ((availH - 16 - n * overhead) / n < 40) { boardEl.classList.add('is-dense'); overhead = 30; }
    const size = Math.max(26, Math.min(60, Math.floor((availH - 16 - n * overhead) / n), maxW));
    boardEl.style.setProperty('--size', size + 'px');

    boardEl.innerHTML = '';
    state.forEach((shelf, i) => {
      const el = document.createElement('div');
      el.className = 'shelf' + (i === selected ? ' is-selected' : '') + (isShelfDone(shelf) ? ' is-done' : '');
      el.dataset.i = i;
      for (let s = 0; s < CAP; s++) {
        const slot = document.createElement('div');
        slot.className = 'slot';
        if (s < shelf.length) {
          const [color, glyph] = PALETTE[shelf[s]];
          const it = document.createElement('div');
          it.className = 'item' + (i === selected && s >= shelf.length - runLength(shelf) ? ' is-lift' : '');
          it.style.setProperty('--c', color);
          if (pop && pop.i === i && s >= shelf.length - pop.n) it.classList.add('is-pop');
          it.innerHTML = '<i>' + glyph + '</i>'; // symbole = accessibilité daltonisme
          slot.appendChild(it);
        }
        el.appendChild(slot);
      }
      boardEl.appendChild(el);
    });
    pop = null;
  }

  function shake(i) {
    const el = boardEl.children[i];
    if (!el) return;
    el.classList.add('is-shake');
    setTimeout(() => el.classList.remove('is-shake'), 260);
  }

  function onTap(i) {
    if (!$('win').hidden) return;
    if (selected === null) {
      if (!state[i].length || isShelfDone(state[i])) return;
      selected = i; beep(520, 0.05); render(); return;
    }
    if (selected === i) { selected = null; render(); return; }
    if (canMove(state, selected, i)) {
      history.push(state.map(s => s.slice()));
      const n = move(state, selected, i);
      pop = { i, n }; selected = null;
      beep(440 + n * 80, 0.1); buzz(10);
      render(); burst(i);
      if (isWon(state)) win();
    } else {
      shake(i); beep(160, 0.12, 'square', 0.06);
      // Si la cible contient des objets, on bascule la sélection dessus
      if (state[i].length && !isShelfDone(state[i])) selected = i; else selected = null;
      render();
    }
  }

  // Gerbe de particules sur l'étagère cible
  function burst(i) {
    const el = boardEl.children[i]; if (!el) return;
    const r = el.getBoundingClientRect(), c = getComputedStyle(el.querySelector('.item') || el).getPropertyValue('--c') || '#fff';
    for (let k = 0; k < 14; k++) {
      const d = document.createElement('span'); d.className = 'spark';
      d.style.cssText = `left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;background:${c}`;
      document.body.appendChild(d);
      const a = Math.random() * 6.28, v = 40 + Math.random() * 70;
      d.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${Math.cos(a) * v}px,${Math.sin(a) * v}px) scale(0)`, opacity: 0 }], { duration: 500 + Math.random() * 300, easing: 'ease-out' }).onfinish = () => d.remove();
    }
  }
  function confetti() {
    for (let k = 0; k < 60; k++) {
      const d = document.createElement('span'); d.className = 'confetti';
      d.style.cssText = `left:${Math.random() * 100}vw;background:${PALETTE[k % PALETTE.length][0]}`;
      document.body.appendChild(d);
      d.animate([{ transform: 'translateY(-20px) rotate(0)', opacity: 1 }, { transform: `translateY(105vh) rotate(${360 + Math.random() * 540}deg)`, opacity: 1 }], { duration: 1400 + Math.random() * 1400, delay: Math.random() * 400, easing: 'ease-in' }).onfinish = () => d.remove();
    }
  }

  async function win() {
    confetti();
    beep(660, 0.12); setTimeout(() => beep(880, 0.2), 120); buzz([20, 40, 20]);
    // Série quotidienne : +1 si on joue un nouveau jour consécutif
    const today = new Date().toDateString();
    const last = store.get('lastDay', null);
    if (last !== today) {
      const yesterday = new Date(Date.now() - 864e5).toDateString();
      store.set('streak', last === yesterday ? store.get('streak', 0) + 1 : 1);
      store.set('lastDay', today);
    }
    $('winText').textContent = `Niveau ${level} terminé`;
    $('streak').textContent = store.get('streak', 0);
    $('win').hidden = false;
  }

  // ---------- Boutons ----------
  boardEl.addEventListener('pointerdown', e => {
    const sh = e.target.closest('.shelf');
    if (sh) onTap(+sh.dataset.i);
  });

  $('undo').onclick = async () => {
    if (!history.length) return;
    if (bonus.undo > 0) { bonus.undo--; saveBonus(); } else if (!(await Ads.rewarded())) return; // sinon : pub vue en entier
    state = history.pop(); selected = null; render();
  };
  $('shelf').onclick = async () => {
    if (extraShelfUsed) return;
    if (bonus.shelf > 0) { bonus.shelf--; saveBonus(); } else if (!(await Ads.rewarded())) return;
    state.push([]); extraShelfUsed = true; render();
  };
  $('restart').onclick = () => startLevel(level);
  $('next').onclick = async () => {
    // Interstitiel : tous les 3 niveaux, jamais avant le niveau 5
    if (level >= 5 && level % 3 === 0) await Ads.interstitial();
    startLevel(level + 1);
  };
  window.addEventListener('resize', () => state && render());

  // Exposé pour les tests
  window.__shelfie = { makeLevel, solvable, canMove, move, isWon, get state() { return state; }, startLevel };

  // ---------- Accueil & bonus réseaux ----------
  function showHome() {
    $('homeLevel').textContent = level;
    $('bonusCount').textContent = bonus.undo + bonus.shelf > 0 ? `${bonus.undo + bonus.shelf} en stock` : '';
    $('home').hidden = false;
  }
  document.querySelectorAll('.theme_card').forEach(c => c.onclick = () => { setTheme(c.dataset.pick); beep(600, 0.06); });
  $('play').onclick = () => { $('home').hidden = true; beep(520, 0.08); };
  $('menu').onclick = showHome;

  function renderSocials() {
    $('socials').innerHTML = '';
    SOCIALS.forEach(s => {
      const b = document.createElement('button');
      b.className = 'btn social';
      const done = claimed[s.id], off = !s.url;
      b.disabled = done || off;
      b.innerHTML = `<span>${s.icon} ${s.name}</span><span class="btn_ad">${done ? '✓ reçu' : off ? 'bientôt' : '+3 ↩︎ +1 étagère'}</span>`;
      b.onclick = () => {
        window.open(s.url, '_blank', 'noopener');
        // On ne peut pas vérifier l'abonnement : le bonus est donné à l'ouverture de la page
        claimed[s.id] = true; bonus.undo += 3; bonus.shelf += 1; saveBonus();
        renderSocials(); render(); showHome();
      };
      $('socials').appendChild(b);
    });
  }
  $('bonusOpen').onclick = () => { renderSocials(); $('bonus').hidden = false; };
  $('bonusClose').onclick = () => { $('bonus').hidden = true; };

  setTheme(store.get('theme', 'jelly'));
  startLevel(level);
  showHome();
  // Consentement + init pub en arrière-plan ; le lien « Confidentialité » n'apparaît que si la loi l'exige
  Ads.init().then(() => { $('privacy').hidden = !Ads.privacyRequired; });
  $('privacy').onclick = () => Ads.showPrivacy();
})();
