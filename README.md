# Archive of Observers

A Foundry VTT module that creates a clean, cinematic **Observer Window** — perfect for streaming, recording, or showing your table a polished view without the GM chrome.

Designed for Foundry VTT **v12 and v13**.

---

## ✨ Features

- **Observer Mode**
  - Launch an overlay-only window with a single macro.
  - Hides all GM UI chrome (sidebar, navigation, controls, etc.).
  - Scales cleanly across 1080p, 1440p, and 4K.

- **Scene Banner**
  - Animated overlay showing the current scene name.
  - Font and duration are configurable.

- **Player HUD**
  - Displays active players’ character cards.
  - Shows portrait, HP, AC, race/class, and level.
  - Includes condition icons (or JB2A animations if available).
  - Flash overlay for damage/healing events.
  - Death save tracking.

- **GM Card**
  - Optional “Game Master” card with portrait, title, and scene name.

- **Chat Bubbles**
  - Non-roll messages appear as floating speech bubbles above player cards.
  - Narrator Tools messages are automatically ignored (to avoid duplicates).

- **Dice Roll Overlay**
  - Quick roll banner overlay for standard chat dice rolls.
  - Scales up automatically for higher resolutions.

- **Epic Rolls 5e Integration**
  - Full compatibility with the [Epic Rolls 5e](https://foundryvtt.com/packages/epic-rolls-5e) module.
  - Observer mirrors **dispatch**, **update**, **end**, and **toggle** events.
  - Ensures cinematic skill challenges, contests, and initiative rolls are visible to your audience.

- **JB2A Integration (optional)**
  - Configure animated condition effects.
  - Supports damage/heal animations on player HUD cards.

- **Camera Sync**
  - Observer camera follows the GM’s view via socketlib.
  - Toggle on/off via settings.

---

## ⚙️ Settings

Accessible under **Game Settings → Module Settings → Archive of Observers**.

- **Enable Observer Mode** — Controls whether the macro is created.
- **Observer Window Size** — Choose 1080p / 1440p / 4K.
- **Enable Camera Follow** — Toggle GM camera sync.
- **Enable GM Card** — Show/hide GM card in HUD.
- **GM Card Image & Title** — Customize GM card.
- **Scene Banner Duration & Font** — Control banner timing and style.
- **Chat Bubble Duration** — How long chat bubbles remain visible.
- **JB2A Configuration** — Assign custom animations for damage, healing, and conditions.

---

## 🖥️ Usage

1. As GM, launch Foundry normally.
2. Use the **“Open Observer Window”** macro (auto-created when module is enabled).
3. The observer opens in a new window with `?observer=true` in the URL.
4. Stream, screen-capture, or display this window for players.

---

## 📦 Installation

Add the following to your Foundry VTT **module installation**:

```json
{
  "id": "archive-of-observers",
  "title": "Archive of Observers",
  "description": "Cinematic observer window for streaming and live play.",
  "version": "1.0.0",
  "compatibility": {
    "minimum": 12,
    "verified": 13
  }
}
