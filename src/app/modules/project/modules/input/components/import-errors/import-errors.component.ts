import { Component, Input } from '@angular/core';
import { ImportErrorGroup } from 'src/app/utils/import-diff';

/**
 * Errors found in an imported sheet: those of the sheet itself, then those of each of its tables.
 */
@Component({
  selector: 'app-import-errors',
  templateUrl: './import-errors.component.html',
  styleUrls: ['./import-errors.component.scss']
})
export class ImportErrorsComponent {
  @Input() group: ImportErrorGroup;
}
