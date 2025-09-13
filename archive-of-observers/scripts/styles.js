/**
 * @file scripts/styles.js
 * @description Injects CSS for both observer-only UI and global overrides.
 * - injectObserverStyles(): Nukes Foundry chrome in observer mode, adds overlays/HUD styling.
 * - injectGlobalStyles(): Always runs, applies dark theme to JB2A settings window.
 */

/* -------------------------------
   OBSERVER-ONLY STYLES
---------------------------------*/
export function injectObserverStyles() {
  const id = "aof-observer-style";
  if (document.getElementById(id)) return;

  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
  /* ----- GLOBAL LAYOUT ----- */
  body.observer-mode {
    overflow: hidden !important;
    background: #000 !important;
  }

  /* Fill the viewport with the board/canvas */
  body.observer-mode #board {
    position: fixed !important;
    inset: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    visibility: visible !important;
    opacity: 1 !important;
    z-index: 1 !important;
  }

 
  /* ----- NUKE THE CHROME (v12/v13 IDs and common classes) ----- */
    body.observer-mode #ui-top > :not(#epic-roll-5e):not(#combat-dock),
    body.observer-mode #ui-bottom,
    body.observer-mode #ui-left,
    body.observer-mode #ui-right,
    body.observer-mode #players,
    body.observer-mode #controls,
    body.observer-mode #hotbar,
    body.observer-mode #navigation,
    body.observer-mode #sidebar,
    body.observer-mode #sidebar-tabs,
    body.observer-mode #chat,
    body.observer-mode #chat-controls,
    body.observer-mode #chat-message,
    body.observer-mode #chat-form,
    body.observer-mode #notifications,
    body.observer-mode .notification-pip,
    body.observer-mode .app.window-app,
    body.observer-mode .streamers,
    body.observer-mode .control-tools,
    body.observer-mode .dice-tray,
    body.observer-mode .hud {
  display: none !important;
}

  /* Our overlay container (optional UI you add) */
  body.observer-mode #aof-observer-overlay {
    position: fixed !important;
    inset: 0 !important;
    pointer-events: none !important;
    z-index: 9999 !important;
  }

  /* ----- SCENE BANNER (TITLE OVERLAY) ----- */
  #aof-observer-overlay .scene-banner {
    position: absolute;
    top: 40%;
    width: 100%;
    text-align: center;
    font-size: 3rem;
    color: white;
    background: rgba(0, 0, 0, 0.75);
    padding: 1rem 2rem;
    border-radius: 1rem;
    opacity: 0;
    transition: opacity 2s ease;
    pointer-events: none;
  }
  #aof-observer-overlay .scene-banner.show { opacity: 1; }
  #aof-observer-overlay .scene-banner.hidden { display: none; }

  #aof-observer-overlay #observer-roll.visible { opacity: 1; }

  #aof-observer-overlay .roll-banner {
    background: rgba(0, 0, 0, 0.8);
    padding: 0.75rem 1.5rem;
    border-radius: 1rem;
    font-family: "Modesto Condensed", "Signika", sans-serif;
    box-shadow: 0 0 10px #000;
  }
  #aof-observer-overlay .roll-banner .flavor {
    font-style: italic;
    font-size: 0.9em;
    display: block;
    margin-top: 0.3em;
  }

  #observer-roll {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -40%);
  font-size: 2rem;
  color: white;
  text-align: center;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease, transform 0.5s ease;
  z-index: 10000;
}
#observer-roll.visible {
  opacity: 1;
  transform: translate(-50%, -50%);
}

/* Scale up at larger resolutions */
@media screen and (min-width: 2560px) {   /* 1440p+ */
  #observer-roll { font-size: 3rem; }
}
@media screen and (min-width: 3840px) {   /* 4k */
  #observer-roll { font-size: 4rem; }
}

  /* ----- PLAYER HUD ----- */
  #player-hud {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
    z-index: 9999;
    pointer-events: none;
  }

  .player-card, .player-card.gm-card {
  position: relative;
  aspect-ratio: 2 / 3;            /* always keep 2:3 ratio */
  width: min(8vw, 280px);        /* scales with viewport width, max 280px */
  max-height: 90vh;               /* never taller than viewport */
  background: none;
  border-radius: 0.75rem;
  overflow: visible;
  pointer-events: none;
  box-shadow: 0 0 12px #000;
  }

  .player-card .portrait, .player-card.gm-card .portrait { width: 100%; height: 100%; object-fit: cover; object-position: center; }
  .player-card .name { font-weight: 700; font-size: 1.1rem; margin-bottom: 0.5rem; color: #fff; }
  .player-card .stat { display: block; font-size: 0.9rem; color: #ddd; }
  .player-card .value { font-weight: bold; color: #fff; }
  .player-card .overlay {
    position: absolute; bottom: 0; left: 0; width: 100%;
    padding: 0.5rem;
    background: rgba(0, 0, 0, 0.65);
    font-size: 0.75rem; color: white;
    text-align: left; line-height: 1.2;
  }

  /* Damage/Heal flashes */
  .damage-overlay, .heal-overlay {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%;
    opacity: 0; pointer-events: none; transition: opacity 0.2s ease;
    z-index: 2;
  }
  .damage-overlay { background: red; }
  .heal-overlay { background: limegreen; }
  .player-card.flash-damage .damage-overlay { opacity: 0.5; }
  .player-card.flash-heal .heal-overlay { opacity: 0.5; }

  /* Conditions + GM card */
  .player-card .conditions {
    position: absolute; top: 0.25rem; right: 0.25rem;
    display: flex; flex-wrap: wrap; gap: 0.25rem; z-index: 5;
  }
  .player-card .condition-icon {
    width: 20px; height: 20px;
    border: 1px solid #000; border-radius: 4px;
    background: rgba(0,0,0,0.5);
  }
  .player-card.gm-card { order: -1; }
  .player-card.gm-card .name { font-size: 1.3rem; color: gold; }
  .player-card.gm-card .scene-name { font-size: 1rem; font-style: italic; color: #ddd; }

  /* Speech bubbles */

  .player-slot {
  position: relative;
}

.player-slot .bubble-container {
  position: absolute;
  bottom: calc(100% + 2px);   /* sits just above the card */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  width: max-content;
  pointer-events: none;
  z-index: 20;
}

.speech-bubble {
  position: relative;
  background: rgba(0,0,0,0.8);
  color: white;
  padding: 0.4rem 0.6rem;
  border-radius: 0.6rem;
  font-size: 0.85rem;
  white-space: nowrap;
  pointer-events: none;
  opacity: 1;
  transition: opacity 0.5s ease;
  z-index: 20;
}

.speech-bubble::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 6px;
  border-style: solid;
  border-color: rgba(0,0,0,0.8) transparent transparent transparent;
}

.speech-bubble.fade-out {
  opacity: 0;
}

  /* Death save overlay */
  .death-save-overlay {
    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
    font-size: 1.2rem; font-weight: bold; color: white;
    background: rgba(0,0,0,0.7);
    padding: 0.5rem 1rem; border-radius: 0.5rem;
    opacity: 0; transition: opacity 0.3s ease;
    z-index: 20; white-space: nowrap; min-width: 180px; text-align: center;
  }
  .death-save-overlay.active { opacity: 1; }
  .death-save-overlay .ds-success { color: limegreen; }
  .death-save-overlay .ds-fail { color: red; }

  /* Layout helpers */
  .form-fields { display: flex; gap: 0.25rem; }
  .form-fields input { flex: 1; }

    /* Combat Carousel compatibility */
  body.observer-mode header#ui-top { 
    display: flex !important; 
    background: transparent !important; 
    pointer-events: none; 
    z-index: 9998; 
  }
  body.observer-mode header#ui-top > :not(#combat-dock) { 
    display: none !important; 
  }
  body.observer-mode #combat-dock { 
    display: flex !important; 
    pointer-events: auto; 
    position: relative; 
    z-index: 9999; 
  }

  /* Epic Rolls compatibility (strong specificity) */
  body.observer-mode .app.window-app#epic-roll-5e,
  body.observer-mode .app.window-app#epic-roll-5e * {
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
  }
  body.observer-mode .app.window-app#epic-roll-5e {
    position: absolute !important;
    inset: 0 !important;          /* fill screen */
    z-index: 15000 !important;    /* above HUD/banners */
    pointer-events: none !important;
  }

  `;
  document.head.appendChild(style);
  console.log("Observer | CSS injected (observer-only)");
}

/* -------------------------------
   GLOBAL STYLES (GM + Everywhere)
---------------------------------*/
export function injectGlobalStyles() {
  const id = "aof-global-style";
  if (document.getElementById(id)) return;

  const style = document.createElement("style");
  style.id = id;
  style.textContent = `
  /* JB2A Settings Window — Forced Dark Theme */
  #jb2a-settings-form .window-content,
  .app.window-app.jb2a-settings-form .window-content {
    background: #0a0a0ac1 !important;
    background-image: none !important;
    color: #f0f0f0 !important;
  }

  #jb2a-settings-form .form-header {
    border-bottom: 1px solid #555;
    color: #fff !important;
    font-weight: bold;
  }

  #jb2a-settings-form label { color: #ddd !important; }

  #jb2a-settings-form input[type="text"] {
    background: #444; color: #fff;
    border: 1px solid #666;
  }

  #jb2a-settings-form .file-picker {
    background: #555; border: 1px solid #777; color: #eee;
  }
  #jb2a-settings-form .file-picker:hover { background: #666; }

  #jb2a-settings-form .sheet-footer button {
    background: #333; border: 1px solid #555; color: #eee;
  }
  #jb2a-settings-form .sheet-footer button:hover { background: #444; }
  `;
  document.head.appendChild(style);
  console.log("Observer | CSS injected (global)");
}
