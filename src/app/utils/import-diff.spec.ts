import {
  groupImportErrors, buildPreviewTable, classifyCell, countChanges, exportedSheetName, hasExistingData, matchSheets, needsDecision, sheetMatchesSite, willWrite
} from './import-diff';

const site = (id: string, name: string) => ({ id, name });

describe('import-diff', () => {
  describe('classifyCell', () => {
    it('classifies each case', () => {
      expect(classifyCell(5, 5)).toBe('same');
      expect(classifyCell(0, 0)).toBe('same');
      expect(classifyCell(null, 5)).toBe('added');
      expect(classifyCell(null, 0)).toBe('added');
      expect(classifyCell(5, 6)).toBe('different');
      expect(classifyCell(5, null)).toBe('different');
      expect(classifyCell(0, null)).toBe('different');
      expect(classifyCell(null, null)).toBe('empty');
      expect(classifyCell(undefined, null)).toBe('empty');
    });
  });

  describe('countChanges', () => {
    it('counts each kind of change', () => {
      expect(countChanges({ a: [1, 2, 3, null, null] }, { a: [1, 9, null, 4, null] }))
        .toEqual({ same: 1, added: 1, replaced: 1, cleared: 1 });
    });

    it('counts everything as added with no existing input', () => {
      expect(countChanges(null, { a: [1, null], b: [2] })).toEqual({ same: 0, added: 2, replaced: 0, cleared: 0 });
    });
  });

  describe('decisions', () => {
    const counts = (added = 0, replaced = 0, cleared = 0) => ({ same: 0, added, replaced, cleared });

    it('tells existing data from an input with no values', () => {
      expect(hasExistingData(null)).toBe(false);
      expect(hasExistingData({ a: [null, null] })).toBe(false);
      expect(hasExistingData({ a: [null, 0] })).toBe(true);
    });

    it('asks for a decision even if the file only fills empty cells', () => {
      expect(needsDecision({ a: [1, null] }, counts(1))).toBe(true);
    });

    it('asks for no decision with no data, or nothing to change', () => {
      expect(needsDecision(null, counts(2))).toBe(false);
      expect(needsDecision({ a: [null] }, counts(1))).toBe(false);
      expect(needsDecision({ a: [1] }, counts())).toBe(false);
    });

    it('writes a site only when it changes and the decision allows it', () => {
      expect(willWrite(null, counts(1), null)).toBe(true);
      expect(willWrite({ a: [1, null] }, counts(1), 'keep')).toBe(false);
      expect(willWrite({ a: [1, null] }, counts(1), null)).toBe(false);
      expect(willWrite({ a: [1, null] }, counts(1), 'replace')).toBe(true);
      expect(willWrite({ a: [1] }, counts(0, 0, 1), 'clear')).toBe(true);
      expect(willWrite({ a: [1] }, counts(), 'replace')).toBe(false);
    });
  });

  describe('buildPreviewTable', () => {
    const partition = (...names: string[]) => ({ elements: names.map(name => ({ name })) });

    it('lays out an unpartitioned variable', () => {
      const table = buildPreviewTable({ id: 'v', name: 'V', distribution: 0, partitions: [] }, { v: [1] }, { v: [2] });
      expect(table.headerRows).toEqual([]);
      expect(table.rowLabelColumns).toBe(0);
      expect(table.rows).toEqual([{ labels: [], cells: [{ existing: 1, incoming: 2, state: 'different' }] }]);
    });

    it('places values row by row, the last partition varying fastest', () => {
      const incoming = { v: Array.from({ length: 16 }, (_, i) => i) };
      const table = buildPreviewTable(
        { id: 'v', name: 'V', distribution: 2, partitions: [partition('a', 'b'), partition('c', 'd'), partition('e', 'f'), partition('g', 'h')] },
        null, incoming
      );

      expect(table.headerRows).toEqual([
        [{ label: 'e', span: 2 }, { label: 'f', span: 2 }],
        [{ label: 'g', span: 1 }, { label: 'h', span: 1 }, { label: 'g', span: 1 }, { label: 'h', span: 1 }]
      ]);
      expect(table.rows.map(row => row.labels)).toEqual([['a', 'c'], ['a', 'd'], ['b', 'c'], ['b', 'd']]);
      expect(table.rows[0].cells.map(cell => cell.incoming)).toEqual([0, 1, 2, 3]);
      expect(table.rows[3].cells.map(cell => cell.incoming)).toEqual([12, 13, 14, 15]);
      expect(table.rows[0].cells[0].state).toBe('added');
    });
  });

  describe('matchSheets', () => {
    it('matches on the name given by the export, ignoring case', () => {
      expect(exportedSheetName('A/B?C')).toBe('A-B-C');
      expect(matchSheets([site('1', 'A/B'), site('2', 'Paris')], ['PARIS', 'a-b', 'Extra'])).toEqual({ 1: 'a-b', 2: 'PARIS' });
    });

    it('leaves sites with no sheet alone', () => {
      expect(matchSheets([site('1', 'Lyon')], ['Paris'])).toEqual({});
    });

    it('matches a name cut by Excel when it is unique', () => {
      const long = 'A very long collection site name, over the limit';
      expect(matchSheets([site('1', long)], [long.slice(0, 31)])).toEqual({ 1: long.slice(0, 31) });
    });

    it('does not guess between sites sharing the first 31 characters', () => {
      const prefix = 'x'.repeat(31);
      expect(matchSheets([site('1', prefix + 'A'), site('2', prefix + 'B')], [prefix])).toEqual({});
    });

    it('does not give a site the sheet of another one', () => {
      const prefix = 'x'.repeat(31);
      // Site 1's own sheet matches exactly, so site 2 must not fall back on it.
      expect(matchSheets([site('1', prefix), site('2', prefix + 'B')], [prefix])).toEqual({ 1: prefix });
    });

    it('does not guess between sites with the same name', () => {
      expect(matchSheets([site('1', 'Same'), site('2', 'same')], ['Same'])).toEqual({});
    });
  });

  describe('groupImportErrors', () => {
    const translate = (key: string, extra?: any) => key + (extra?.row ? ':' + extra.row : '');

    it('puts each error under its table, keeping the order of the sheet', () => {
      const group = groupImportErrors([
        { key: 'a', extra: { element: 'T1', row: 1 } },
        { key: 'b', extra: { element: 'T2', row: 2 } },
        { key: 'c', extra: { element: 'T1', row: 3 } }
      ], translate, 'Paris');
      expect(group).toEqual({
        site: 'Paris',
        messages: [],
        tables: [{ name: 'T1', messages: ['a:1', 'c:3'] }, { name: 'T2', messages: ['b:2'] }]
      });
    });

    it('keeps errors of the sheet itself apart', () => {
      const group = groupImportErrors([{ key: 'outside', extra: { row: 9 } }, { key: 'locked' }], translate);
      expect(group).toEqual({ site: undefined, messages: ['outside:9', 'locked'], tables: [] });
    });
  });

  it('warns on a sheet with the name of another site only', () => {
    expect(sheetMatchesSite('paris', 'Paris')).toBe(true);
    expect(sheetMatchesSite('Lyon', 'Paris')).toBe(false);
    expect(sheetMatchesSite('x'.repeat(31), 'x'.repeat(40))).toBe(true);
  });
});
