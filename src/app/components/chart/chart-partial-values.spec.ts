import { ChartComponent } from './chart.component';

describe('Chart partial-value tooltips', () => {
  let component: ChartComponent;

  beforeEach(() => {
    component = new ChartComponent(null, null);
    // Exercise the real tooltip renderer without creating an animated chart.
    (component as any).chart = { canvas: document.createElement('canvas') };
  });

  afterEach(() => {
    document.getElementById('chartjs-tooltip')?.remove();
  });

  function render(points: { datasetIndex: number; index: number }[], labels: string[]) {
    (component.options.tooltips.custom as any)({
      opacity: 1,
      title: ['January'],
      body: labels.map(label => ({ lines: [label] })),
      labelColors: labels.map(() => ({ borderColor: '#005ec5', backgroundColor: '#fff' })),
      dataPoints: points,
      caretX: 0,
      caretY: 0,
      bodyFontSize: 14,
      xPadding: 0,
      yPadding: 0
    });
    return Array.from(document.querySelectorAll('#chartjs-tooltip td.dashed'));
  }

  it('marks partial values and partial zero, leaving complete numeric values plain', () => {
    component.data = { datasets: [{ data: [{ y: '1180' }, { y: 1180 }, { y: '0' }, { y: 0 }] }] };
    const cells = render(
      [0, 1, 2, 3].map(index => ({ datasetIndex: 0, index })),
      ['Visits: 1180', 'Visits: 1180', 'Visits: 0', 'Visits: 0']
    );
    expect(cells.map(cell => !!cell.querySelector('.partial-value'))).toEqual([true, false, true, false]);
    expect(cells[0].textContent).toBe(cells[1].textContent);
    expect(cells[2].textContent).toBe('0');
  });

  it('uses tooltip dataset and point indices when other datasets are hidden', () => {
    component.data = { datasets: [{ data: [12] }, { data: [{ y: 65 }, { y: '65' }] }] };
    const cells = render([{ datasetIndex: 1, index: 1 }], ['Coverage: 65%']);
    expect(cells[0].querySelector('.partial-value')?.textContent).toBe('65%');
    expect(document.querySelector('#chartjs-tooltip td:first-child .partial-value')).toBeNull();
  });

  it('supports numeric-string primitive points and clears styling on the next tooltip', () => {
    component.data = { datasets: [{ data: ['24', 24] }] };
    expect(render([{ datasetIndex: 0, index: 0 }], ['Visits: 24'])[0].querySelector('.partial-value')).not.toBeNull();
    expect(render([{ datasetIndex: 0, index: 1 }], ['Visits: 24'])[0].querySelector('.partial-value')).toBeNull();
  });

  it('does not mark missing or nonnumeric values as partial', () => {
    component.data = { datasets: [{ data: [null, undefined, '', ' ', 'N/A', 'NaN', 'Infinity'] }] };
    const cells = render(
      component.data.datasets[0].data.map((_, index) => ({ datasetIndex: 0, index })),
      component.data.datasets[0].data.map(() => 'Visits: NaN')
    );
    expect(cells.every(cell => !cell.querySelector('.partial-value'))).toBe(true);
  });
});
