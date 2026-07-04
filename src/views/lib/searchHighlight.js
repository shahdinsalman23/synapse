/**
 * Wrap all case-insensitive occurrences of `query` in HTML with <mark>.
 */
export function highlightPlain(text, query) {
  if (!text || !query) return escapeHtml(String(text || ''));
  const q = String(query).trim();
  if (!q) return escapeHtml(String(text));

  const escaped = escapeHtml(String(text));
  const re = new RegExp(escapeRegExp(q), 'gi');
  return escaped.replace(re, (m) => `<mark class="search-hit">${m}</mark>`);
}

export function highlightHtml(html, query) {
  if (!html || !query) return html || '';
  const q = String(query).trim();
  if (!q) return html;

  const re = new RegExp(escapeRegExp(q), 'gi');
  // Only wrap text nodes so we never inject marks inside tags/attributes.
  return String(html).replace(/(<[^>]*>)|([^<]+)/g, (match, tag, text) => {
    if (tag) return tag;
    return text.replace(re, (m) => `<mark class="search-hit">${m}</mark>`);
  });
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
