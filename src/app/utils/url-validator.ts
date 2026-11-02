import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Same rule as the backend project schema (links.url): only http(s) links with a host.
// Other schemes such as javascript: must never reach a rendered href.
export const URL_PATTERN = /^https?:\/\/[^\s/?#]+[^\s]*$/i;

export function urlValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = typeof control.value === 'string' ? control.value.trim() : control.value;
    if (!value) {
      return null;
    }
    return URL_PATTERN.test(value) ? null : { invalidUrl: true };
  };
}
