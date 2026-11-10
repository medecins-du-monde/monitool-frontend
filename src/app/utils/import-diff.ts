/**
 * Comparison between the existing data of a site and the content of an imported sheet.
 * Values are stored by variable id, as flat arrays (see Input.values).
 */
export type ImportValues = { [variableId: string]: (number | null)[] };

export type ImportCellState = 'same' | 'added' | 'different' | 'empty';

/** 'clear' is only offered for a blank sheet: it empties a site which has data. */
export type ImportDecision = 'keep' | 'replace' | 'clear';

export interface ImportCounts {
  same: number;
  added: number;
  replaced: number;
  cleared: number;
}

const isEmpty = (value: number | null | undefined) => value === null || value === undefined;

export function classifyCell(existing: number | null | undefined, incoming: number | null | undefined): ImportCellState {
  if (isEmpty(existing)) {
    return isEmpty(incoming) ? 'empty' : 'added';
  }
  return existing === incoming ? 'same' : 'different';
}

export function countChanges(existing: ImportValues | null, incoming: ImportValues): ImportCounts {
  const counts: ImportCounts = { same: 0, added: 0, replaced: 0, cleared: 0 };

  Object.keys(incoming).forEach(variableId => {
    incoming[variableId].forEach((value, index) => {
      const current = existing && existing[variableId] ? existing[variableId][index] : null;
      const state = classifyCell(current, value);
      if (state === 'same') {
        counts.same += 1;
      } else if (state === 'added') {
        counts.added += 1;
      } else if (state === 'different') {
        if (isEmpty(value)) {
          counts.cleared += 1;
        } else {
          counts.replaced += 1;
        }
      }
    });
  });

  return counts;
}

export function hasExistingData(existing: ImportValues | null): boolean {
  return !!existing && Object.keys(existing).some(id => existing[id].some(value => !isEmpty(value)));
}

export function hasChanges(counts: ImportCounts): boolean {
  return counts.added + counts.replaced + counts.cleared > 0;
}

/**
 * Keep leaves a site as it is, including its empty cells, so any change on a site
 * which has data needs a decision, even if the file would only fill empty cells.
 */
export function needsDecision(existing: ImportValues | null, counts: ImportCounts): boolean {
  return hasExistingData(existing) && hasChanges(counts);
}

/** Does this decision write the site? A site with no data has nothing to keep: its values are simply added. */
export function willWrite(existing: ImportValues | null, counts: ImportCounts, decision: ImportDecision | null): boolean {
  if (!hasChanges(counts)) {
    return false;
  }
  return !hasExistingData(existing) || decision === 'replace' || decision === 'clear';
}

export interface ImportPreviewCell {
  existing: number | null;
  incoming: number | null;
  state: ImportCellState;
}

export interface ImportPreviewTable {
  name: string;
  /** Column labels, one list per level, with the number of value columns each label spans. */
  headerRows: { label: string; span: number }[][];
  rowLabelColumns: number;
  rows: { labels: string[]; cells: ImportPreviewCell[] }[];
}

interface PreviewVariable {
  id: string;
  name: string;
  distribution: number;
  partitions: { elements: { name: string }[] }[];
}

/** All combinations of the elements of some partitions, the last partition varying fastest. */
function combinations(partitions: { elements: { name: string }[] }[]): string[][] {
  return partitions.reduce<string[][]>(
    (result, partition) => {
      const next: string[][] = [];
      result.forEach(prefix => partition.elements.forEach(element => next.push([...prefix, element.name])));
      return next;
    },
    [[]]
  );
}

/**
 * Lay out a variable for the preview: first partitions are rows and last ones are columns,
 * with values in the same order as the edit grid and the Excel export.
 */
export function buildPreviewTable(
  variable: PreviewVariable,
  existing: ImportValues | null,
  incoming: ImportValues
): ImportPreviewTable {
  const rowPartitions = variable.partitions.slice(0, variable.distribution);
  const colPartitions = variable.partitions.slice(variable.distribution);
  const rowCombinations = combinations(rowPartitions);
  const numberCols = combinations(colPartitions).length;

  const headerRows = colPartitions.map((partition, level) => {
    const span = colPartitions.slice(level + 1).reduce((m, p) => m * p.elements.length, 1);
    const repeat = colPartitions.slice(0, level).reduce((m, p) => m * p.elements.length, 1);
    const row: { label: string; span: number }[] = [];
    for (let i = 0; i < repeat; i += 1) {
      partition.elements.forEach(element => row.push({ label: element.name, span }));
    }
    return row;
  });

  const current = existing && existing[variable.id] ? existing[variable.id] : [];
  const values = incoming[variable.id] || [];

  const rows = rowCombinations.map((labels, rowIndex) => {
    const cells: ImportPreviewCell[] = [];
    for (let colIndex = 0; colIndex < numberCols; colIndex += 1) {
      const position = rowIndex * numberCols + colIndex;
      const existingValue = isEmpty(current[position]) ? null : current[position];
      const incomingValue = isEmpty(values[position]) ? null : values[position];
      cells.push({ existing: existingValue, incoming: incomingValue, state: classifyCell(existingValue, incomingValue) });
    }
    return { labels, cells };
  });

  return { name: variable.name, headerRows, rowLabelColumns: rowPartitions.length, rows };
}

/** The sheet name the all-sites export gives to a site. */
export function exportedSheetName(siteName: string): string {
  return siteName.replace(/[/\\?*[\]]/g, '-');
}

/** Excel keeps 31 characters at most in a sheet name. */
const MAX_SHEET_NAME = 31;

/**
 * Suggest the sheet of each site, by name. Sheets don't hold any site id, so whenever several sites
 * or sheets could match, the site is left without a sheet instead of guessing: a wrong
 * match would write a site's data on another one.
 *
 * @return sheet name by site id.
 */
export function matchSheets(sites: { id: string; name: string }[], sheetNames: string[]): { [siteId: string]: string } {
  const result: { [siteId: string]: string } = {};
  const usedSheets = new Set<string>();

  const matchBy = (siteKey: (name: string) => string) => {
    const remainingSites = sites.filter(site => !result[site.id]);
    const remainingSheets = sheetNames.filter(sheet => !usedSheets.has(sheet));

    remainingSites.forEach(site => {
      const key = siteKey(site.name);
      const sheets = remainingSheets.filter(sheet => sheet.toLowerCase() === key);
      const rivals = remainingSites.filter(other => siteKey(other.name) === key);
      if (sheets.length === 1 && rivals.length === 1) {
        result[site.id] = sheets[0];
        usedSheets.add(sheets[0]);
      }
    });
  };

  matchBy(name => exportedSheetName(name).toLowerCase());
  matchBy(name => exportedSheetName(name).slice(0, MAX_SHEET_NAME).toLowerCase());

  return result;
}

/** Tell if a sheet's name looks like it belongs to a site: nothing else in the file identifies its site. */
export function sheetMatchesSite(sheetName: string, siteName: string): boolean {
  const expected = exportedSheetName(siteName).toLowerCase();
  const sheet = sheetName.toLowerCase();
  return sheet === expected || sheet === expected.slice(0, MAX_SHEET_NAME);
}

export interface ImportError {
  key: string;
  extra?: { element?: string; [name: string]: unknown };
}

export interface ImportErrorGroup {
  site?: string;
  /** Errors which concern the sheet as a whole. */
  messages: string[];
  /** Errors of each table, in the order of the sheet. */
  tables: { name: string; messages: string[] }[];
}

/** Put each error under its table, using the given function to translate it. */
export function groupImportErrors(
  errors: ImportError[],
  translate: (key: string, extra?: object) => string,
  site?: string
): ImportErrorGroup {
  const group: ImportErrorGroup = { site, messages: [], tables: [] };

  errors.forEach(error => {
    const message = translate(error.key, error.extra);
    const name = error.extra?.element;
    if (!name) {
      group.messages.push(message);
      return;
    }

    let table = group.tables.find(t => t.name === name);
    if (!table) {
      table = { name, messages: [] };
      group.tables.push(table);
    }
    table.messages.push(message);
  });

  return group;
}
