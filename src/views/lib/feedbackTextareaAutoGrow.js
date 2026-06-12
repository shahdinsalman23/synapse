/** Single-line start height; grows with content while typing. */
export const FEEDBACK_TEXTAREA_MIN_PX = 22;
const FEEDBACK_TEXTAREA_MAX_PX = 200;

export function autoGrowFeedbackTextarea(el, minPx = FEEDBACK_TEXTAREA_MIN_PX) {
  if (!el) return;
  el.style.height = 'auto';
  const contentHeight = el.scrollHeight;
  const next = Math.min(FEEDBACK_TEXTAREA_MAX_PX, Math.max(minPx, contentHeight));
  el.style.height = `${next}px`;
  el.style.overflowY = contentHeight > FEEDBACK_TEXTAREA_MAX_PX ? 'auto' : 'hidden';
}

export function resetFeedbackTextareaHeight(el, minPx = FEEDBACK_TEXTAREA_MIN_PX) {
  if (!el) return;
  el.style.height = 'auto';
  const contentHeight = el.scrollHeight;
  const next = Math.min(FEEDBACK_TEXTAREA_MAX_PX, Math.max(minPx, contentHeight));
  el.style.height = `${next}px`;
  el.style.overflowY = contentHeight > FEEDBACK_TEXTAREA_MAX_PX ? 'auto' : 'hidden';
}
