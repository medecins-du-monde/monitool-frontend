// Tooltips are rendered as HTML (see app.component.ts) and their text often comes from project data
// (variable names, comments, descriptions) that any project owner, partners included, can edit.
// Only formatting markup survives: no scripts, event handlers, images, frames or javascript: links.

const ALLOWED_TAGS = new Set([
  'A', 'B', 'BR', 'CODE', 'DIV', 'EM', 'I', 'LI', 'OL', 'P', 'SPAN', 'STRONG', 'U', 'UL',
  'TABLE', 'TBODY', 'THEAD', 'TR', 'TD', 'TH'
]);

export function escapeHtml(value: unknown): string {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function sanitizeTooltipHtml(html: string): string {
  // Template content is inert: parsing it runs no script and loads no image.
  const template = document.createElement('template');
  template.innerHTML = html;
  cleanChildren(template.content);
  return template.innerHTML;
}

function cleanChildren(parent: Node): void {
  Array.from(parent.childNodes).forEach(node => {
    if (node.nodeType === Node.TEXT_NODE) {
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      parent.removeChild(node);
      return;
    }

    const element = node as Element;
    if (!ALLOWED_TAGS.has(element.tagName)) {
      // Keep what the element said, never the element itself.
      parent.replaceChild(document.createTextNode(element.textContent || ''), element);
      return;
    }

    cleanAttributes(element);
    cleanChildren(element);
  });
}

function cleanAttributes(element: Element): void {
  Array.from(element.attributes).forEach(attribute => {
    const name = attribute.name.toLowerCase();
    const value = attribute.value;

    const allowed =
      (name === 'style' && !/url\s*\(|expression\s*\(|javascript:/i.test(value)) ||
      (name === 'href' && element.tagName === 'A' && /^https?:\/\//i.test(value.trim())) ||
      (name === 'target' && element.tagName === 'A');

    if (!allowed) {
      element.removeAttribute(attribute.name);
    }
  });
}
