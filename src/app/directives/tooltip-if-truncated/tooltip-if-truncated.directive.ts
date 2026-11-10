import { Directive, ElementRef, HostListener, Optional, Self } from '@angular/core';
import { MatLegacyTooltip } from '@angular/material/legacy-tooltip';
import { MatTooltip } from '@angular/material/tooltip';

/**
 * Only shows the element's matTooltip when its content is truncated (ellipsis or line clamp).
 *
 * Truncation is checked on hover rather than bound to matTooltipDisabled: a tooltip that starts
 * disabled never attaches its hover listeners. This host listener is registered before the
 * tooltip's own (added in ngAfterViewInit), so it runs first on mouseenter.
 */
@Directive({
  selector: '[appTooltipIfTruncated]'
})
export class TooltipIfTruncatedDirective {

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    @Optional() @Self() private legacyTooltip: MatLegacyTooltip,
    @Optional() @Self() private tooltip: MatTooltip
  ) { }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    const el = this.elementRef.nativeElement;
    const tooltip = this.legacyTooltip ?? this.tooltip;
    if (tooltip) {
      tooltip.disabled = el.scrollWidth <= el.clientWidth && el.scrollHeight <= el.clientHeight;
    }
  }
}
