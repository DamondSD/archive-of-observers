const rollQueue = [];
let isShowingRoll = false;

export function queueRollOverlay(user, total, flavor = "") {
  rollQueue.push({ user, total, flavor });
  if (!isShowingRoll) showNextRoll();
}

function showNextRoll() {
  if (rollQueue.length === 0) {
    isShowingRoll = false;
    return;
  }

  isShowingRoll = true;
  const { user, total, flavor } = rollQueue.shift();
  const overlay = document.getElementById("observer-roll");
  if (!overlay) return;

  overlay.innerHTML = `
    <div class="roll-banner">
      <strong>${user}</strong> rolled <strong>${total}</strong>
      ${flavor ? `<span class="flavor">(${flavor})</span>` : ""}
    </div>
  `;

  // Trigger the fade-in + slide-up
  overlay.classList.add("visible");

  setTimeout(() => {
    overlay.classList.remove("visible");

    // Wait for fade-out + slide-out to finish before showing the next
    setTimeout(() => {
      showNextRoll();
    }, 600); // matches CSS transition duration
  }, 3500); // how long each roll is visible
}
