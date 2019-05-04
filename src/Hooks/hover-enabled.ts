const canUseDOM = !!(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

let isEnabled = false;

const HOVER_THRESHOLD_MS = 1000;
let lastTouchTimestamp = 0;

function enableHover() {
  if (isEnabled || Date.now() - lastTouchTimestamp < HOVER_THRESHOLD_MS) {
    return;
  }
  isEnabled = true;
}

function disableHover() {
  lastTouchTimestamp = Date.now();
  if (isEnabled) {
    isEnabled = false;
  }
}

if (canUseDOM) {
  document.addEventListener("touchstart", disableHover, true);
  document.addEventListener("touchmove", disableHover, true);
  document.addEventListener("mousemove", enableHover, true);
}

export function isHoverEnabled() {
  return isEnabled;
}
