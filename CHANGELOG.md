# 🧭 Archive of Observers — v1.2.0
> **Focus:** Enhanced Scene Banners, Card Customization, and Player Card Visibility Controls  

---

## ✨ New Features

### 🎬 Scene Banner Enhancements
- Added full **animation support** for scene transition banners:
  - **Fade** – smooth opacity transition in/out  
  - **Slide Up** – cinematic slide + fade combo  
  - **Typewriter** – text types out with a fade-out finish  
- Banners now fade out cleanly after displaying (no lingering text or reappearing issues).  
- Added **GM-only “Banner Settings” submenu** for centralized control of:
  - Font selection  
  - Text color picker (with live swatch)  
  - Animation style (Fade, Slide, Typewriter)  
  - Duration of display  
- Added **banner text color customization** with a proper color picker UI.  
- Implemented **cooldown logic** to prevent duplicate banner triggers during scene loads.  
- Refined banner CSS to use `visibility: hidden` instead of `display: none`, enabling smooth fade transitions.  
- Ensured full **v12 / v13 Foundry compatibility** (no version warnings or deprecated behaviors).  

---

### 🧩 Card Settings Overhaul
- Added dedicated **“Card Settings” submenu** with:
  - Player and GM card color customization  
  - GM-only fields for **Enable Borders**, **GM Card Color**, **GM Card Title**, and **GM Card Image**  
  - Player-specific color pickers that persist correctly across sessions  
- Fixed color inputs throwing invalid `""` format warnings (`#rrggbb` validation now enforced).  
- Improved **dark-themed styling** for all settings windows (Card, JB2A, Banner) with readable dropdowns and consistent spacing.  
- GMs no longer see “My Card Color” — that setting is for players only.  
- Added fallback logic ensuring color inputs always display a valid hex color.  
- Settings now include **cross-version detection** for Foundry v12 and v13:
  - Uses `scope: "client"` on v12  
  - Uses `scope: "user"` on v13  
  - Works seamlessly across both environments  

---

### 🎨 Player Card Visibility Controls
- Added new **GM-configurable visibility toggles** for player card data:
  - ✅ HP  
  - ✅ AC  
  - ✅ Level  
  - ✅ Race  
  - ✅ Class  
- GMs can now decide exactly which stats appear on the Observer player cards.  
- Integrated directly with the existing 5-second poller — updates automatically, no extra listeners required.  
- Added Handlebars logic (`{{#if showHP}}`, etc.) to conditionally render stat blocks in the player card template.  
- Observer HUD now dynamically respects all GM visibility toggles.  

---

## 🧠 Behavioral & Logic Improvements
- Player-selected card colors now override Foundry user colors on the Observer HUD.  
- GM and player color scopes are fully respected (GMs handle world-level changes, players handle local preferences).  
- Observer HUD color rendering logic unified under a single source of truth.  
- Poller ensures all setting changes (color, stats, banners) appear automatically within 5 seconds — no reload required.  
- Removed redundant event listeners and replaced instant-refresh logic with cleaner poller updates.  

---

## 🧩 Developer & Maintenance Notes
- Codebase cleaned for clarity:
  - Consolidated visibility and animation logic for banners.  
  - Simplified `buildPlayerCard()` context handling for easier future expansion.  
  - Unified color sanitation in `cardSettings.js` (`sanitizeColor()` helper).  
- Moved banner settings styling into **`injectGlobalStyles()`** so settings windows always theme correctly (even outside Observer mode).  
- Normalized all custom FormApplications with consistent CSS class hooks for styling.  
- Expanded CSS theming coverage for dropdowns, color pickers, and reset buttons.  
- Added strong validation for stored color values (`/^#[0-9A-Fa-f]{6}$/`) to prevent invalid inputs.  

---

## 🧩 User Experience Improvements
- Cleaner, dark-themed settings windows across the module.  
- Readable dropdowns and color inputs even under custom Foundry themes.  
- Better layout spacing between form sections (consistent with Banner and JB2A menus).  
- All menus clearly scoped:
  - **Players** → Card Settings (personal color only)  
  - **GMs** → Full control over visuals, stats, and card presentation  

---

## 🚀 Result
- GMs gain **complete visual and informational control** over the Observer HUD.  
- Players can **personalize their own card colors** safely and persistently.  
- Scene transitions are **cinematic and professional**, perfect for streaming and live play.  
- Observer updates run entirely through the 5-second poller — lightweight, consistent, and robust.  

---

## 🧩 Version Compatibility
| Foundry Version | Supported | Notes |
|------------------|------------|--------|
| **v12** | ✅ | Uses `scope: "client"` for player settings |
| **v13** | ✅ | Uses `scope: "user"` and updated API calls |
| **v14 (future)** | ⚙️ Planned | Current structure already compatible with upcoming user scopes |

---
