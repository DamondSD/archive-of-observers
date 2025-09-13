import { queueRollOverlay } from "./queue.js";


export function registerRollOverlayHook() {
  Hooks.on("createChatMessage", (msg) => {
    const isObserver = !!new URLSearchParams(window.location.search).get("observer");
    if (!isObserver) return;

    if (!msg.isRoll || !msg.rolls?.length) return;

    const roll = msg.rolls[0];
    const userName = msg.user?.name ?? "Unknown";
    const total = roll.total;
    const flavor = msg.flavor ?? "";

    queueRollOverlay(userName, total, flavor);
  });
}