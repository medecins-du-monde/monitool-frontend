import { escapeHtml, sanitizeTooltipHtml } from './html-sanitizer';

describe('escapeHtml', () => {
  it('escapes markup characters', () => {
    expect(escapeHtml(`<img src=x onerror="a('b')">&`))
      .toBe('&lt;img src=x onerror=&quot;a(&#39;b&#39;)&quot;&gt;&amp;');
  });
});

describe('sanitizeTooltipHtml', () => {
  it('keeps formatting markup and inline styles', () => {
    const html = `<div style="font-size: small;"><b>Name</b><br><ul><li>item</li></ul></div>`;
    expect(sanitizeTooltipHtml(html)).toBe(html);
  });

  it('drops event handlers', () => {
    expect(sanitizeTooltipHtml('<div onclick="alert(1)" onmouseover="alert(2)">x</div>')).toBe('<div>x</div>');
  });

  it('replaces forbidden elements by their text', () => {
    expect(sanitizeTooltipHtml('<img src=x onerror=alert(1)>Name')).toBe('Name');
    expect(sanitizeTooltipHtml('<script>alert(1)</script>')).toBe('alert(1)');
    expect(sanitizeTooltipHtml('<svg onload=alert(1)><a>x</a></svg>')).toBe('x');
  });

  it('only keeps http(s) links', () => {
    expect(sanitizeTooltipHtml('<a href="javascript:alert(1)">x</a>')).toBe('<a>x</a>');
    expect(sanitizeTooltipHtml('<a href="https://example.org" target="_blank">x</a>'))
      .toBe('<a href="https://example.org" target="_blank">x</a>');
  });

  it('drops styles that load resources', () => {
    expect(sanitizeTooltipHtml('<div style="background: url(https://evil)">x</div>')).toBe('<div>x</div>');
  });

  it('leaves plain text untouched', () => {
    expect(sanitizeTooltipHtml('Water & sanitation')).toBe('Water &amp; sanitation');
  });
});
