import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatLegacyOption as MatOption } from '@angular/material/legacy-core';
import { MatLegacyDialogRef as MatDialogRef, MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA } from '@angular/material/legacy-dialog';
import { TranslateService } from '@ngx-translate/core';
import { Parser } from 'expr-eval';
import * as _ from 'lodash';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Form } from 'src/app/models/classes/form.model';
import { PartitionElement } from 'src/app/models/classes/partition-element.model';
import { COPY_FORMULA, CUSTOM_FORMULA, PERCENTAGE_FORMULA, PERMILLE_FORMULA } from 'src/app/models/classes/project-indicator.model';

@Component({
  selector: 'app-indicator-modal',
  templateUrl: './indicator-modal.component.html',
  styleUrls: ['./indicator-modal.component.scss']
})
export class IndicatorModalComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['parameter', 'variable', 'disaggregations'];
  dataSource = new BehaviorSubject<any[]>([]);
  private initValue: any;
  private parser: Parser;
  private symbols: string[];
  dataChanged = false;
  private initDataSource: any;
  allOption: PartitionElement = new PartitionElement({id: '0', name: 'All'});
  public isCC = false;
  public canSaveWithoutChanges = false;

  private subscription: Subscription = new Subscription();

  public computationTypes = [
    {
      value: 'unavailable',
      display: 'Enum.Computation.unavailable'
    },
    {
      value: 'fixed',
      display: 'Enum.Computation.fixed'
    },
    {
      value: 'copy',
      display: 'Enum.Computation.copy'
    },
    {
      value: 'percentage',
      display: 'Enum.Computation.percentage'
    },
    {
      value: 'permille',
      display: 'Enum.Computation.permille'
    },
    {
      value: 'formula',
      display: 'Enum.Computation.formula'
    },
  ];
  get type() {
    return this.data.indicator.value.type;
  }
  get currentLang(): string {
    return this.translateService.currentLang ? this.translateService.currentLang : this.translateService.defaultLang;
  }

  @ViewChild('allSelected') private allSelected: MatOption;
  constructor(
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<IndicatorModalComponent>,
    private translateService: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: { indicator: UntypedFormGroup, forms: Form[], isCC?: boolean }
  ) { }

  ngOnInit(): void {
    if (this.data.isCC) {
      this.isCC = true;
    }
    this.loadData();
    // Creation of the init value for the reset
    this.initValue = _.cloneDeep(this.data.indicator) as UntypedFormGroup;
    this.initDataSource = this.dataSource.getValue();
    if (this.data.isCC && this.data.indicator.value.configured === false) {
      this.dataChanged = true;
    }
  }

  loadData(): void {
    // Getting the formula and setting the symbols to update the parameter part in the DOM in case we already have a formula.
    this.parser = new Parser();
    this.parser.consts = {};
    try {
      this.symbols = this.data.indicator.value.computation.formula ?
      this.parser.parse(this.data.indicator.value.computation.formula).variables() : [];
      const newDataSource = [];
      this.symbols.forEach(symbol => {
        newDataSource.push({
          symbol,
        });
      });
      this.dataSource.next(newDataSource);
    }
    catch (e) {
      this.symbols = [];
    }

    // Updating all the variable part in the DOM in case we already have variables
    const parameters = this.data.indicator.value.computation.parameters;
    if (parameters && Object.keys(parameters).length > 0) {
      const newDataSource = this.dataSource.getValue();
      newDataSource.forEach(data => {
        // We look for the variable in every dataSources
        data.filter = this.lookForVariable(this.data.forms, parameters[`${data.symbol}`].elementId);
      });

      // Filling the partitionElement list with PartitionElement objects.
      this.symbols.forEach(symbol => {
        const listPartitionDataSource = newDataSource.filter(parameter => parameter.symbol === symbol)[0].filter.partitions;
        listPartitionDataSource.forEach(partition => {
          const filterForm = this.data.indicator.controls.computation.get('parameters').get(`${symbol}`).get('filter') as UntypedFormGroup;
          // If there is no value, we put an empty json.
          let filterValueList = filterForm.get(`${partition.id}`) ? filterForm.get(`${partition.id}`).value : {};
          const newList = [];

          // If not formated yet, we format everything
          const newListOfValue = [];
          // If filterValueList is not an array, this means that all element have been selected.
          // We are sending the data in the backend in this way now, but as it was done before, it was
          // the only way that we had in order to keep the old data in this new version
          if ((filterValueList instanceof Array) && typeof (filterValueList[0]) !== 'string') {
            filterValueList.forEach(value => newListOfValue.push(value.id));
          }
          if (newListOfValue.length > 0) { filterValueList = newListOfValue; }

          partition.elements.forEach(partitionElement => {
            if (!(filterValueList instanceof Array) || filterValueList.indexOf(partitionElement.id) !== -1) {
              newList.push(partitionElement);
            }
          });

          // if all partitions are selected we must add the 'allOption' to the list
          if (newList.length === partition.elements.length || !(filterValueList instanceof Array)){
            newList.push(this.allOption);
          }

          filterForm.setControl(`${partition.id}`, new UntypedFormControl(newList));
        });
      });

      this.dataSource.next(newDataSource);
    } else if (parameters && this.isCC) {
      this.onFormulaChange();
    }
    this.dataChanged = false;
    this.subscription.add(
      this.data.indicator.valueChanges.subscribe(() => {
        this.dataChanged = true;
      })
    );
  }

  onReset(): void {
    this.data.indicator = _.cloneDeep(this.initValue) as UntypedFormGroup;
    this.dataSource.next(this.initDataSource);
    this.loadData();
  }

  onTypeChange(type: any): void {
    const computation = this.data.indicator.controls.computation as UntypedFormGroup;
    // Updating the formula in function of the type
    if (type.value === 'fixed' && isNaN(computation.value.formula)) {
      computation.controls.formula.setValue('0');
    }
    else if (type.value === 'copy') {
      computation.controls.formula.setValue(COPY_FORMULA);
    }
    else if (type.value === 'percentage') {
      computation.controls.formula.setValue(PERCENTAGE_FORMULA);
    }
    else if (type.value === 'permille') {
      computation.controls.formula.setValue(PERMILLE_FORMULA);
    }
    else if (type.value === 'unavailable') {
      computation.controls.formula.setValue(null);
    }
    else if (type.value === 'formula'){
      computation.controls.formula.setValue(CUSTOM_FORMULA);
    }
    this.onFormulaChange();
  }

  onFormulaChange(): void {
    // Getting the formula and setting the symbols to update the parameter part in the DOM.
    let newSymbols = [];
    try {
      newSymbols = this.parser.parse(this.data.indicator.get('computation').value.formula).variables();
    }
    catch (e) {
      newSymbols = [];
    }
    this.symbols = newSymbols;
    // Updating the variable part
    const parametersFormGroup = new UntypedFormGroup({});

    this.symbols.forEach(symbol => {
      parametersFormGroup.addControl(`${symbol}`, this.fb.group({
        elementId: ['', Validators.required],
        filter: this.fb.group({}),
      }));
    });

    (this.data.indicator.get('computation') as UntypedFormGroup).setControl('parameters', parametersFormGroup);

    const newDataSource = [];
    this.symbols.forEach(symbol => {
      newDataSource.push({
        symbol,
      });
    });
    this.dataSource.next(newDataSource);
  }

  onVariableSelected(event, element): void {
    const newDataSource = this.dataSource.getValue();

    // Updating the disaggregation part
    // We create a new filter in order to remove all the controls that we could have gotten before.
    const newFilter = this.fb.group({});
    newDataSource.forEach(data => {
      if (data.symbol === element.symbol) {

        // We look for the variable in every dataSources
        data.filter = this.lookForVariable(this.data.forms, event.value);

        data.filter.partitions.forEach(partition => {
          // add all the partitions and the 'allOption' as default
          newFilter.addControl(`${partition.id}`, new UntypedFormControl([...partition.elements, this.allOption]));
        });
      }
      // Adding this new filter
      (
        this.data.indicator.controls.computation
          .get('parameters')
          .get(`${element.symbol}`) as UntypedFormGroup
      ).setControl('filter', newFilter);
    });

    this.dataSource.next(newDataSource);
  }

  private lookForVariable(listDataSource, targetValue): any {
    let variable;
    listDataSource.forEach(form => {
      const valueFound = form.elements.filter(partitionData => partitionData.id === targetValue)[0];

      if (valueFound) { variable = valueFound; }
    });
    return variable;
  }

  // this is only used by the mat-chip-list
  getPartitions(symbol, partitionId) {
    const allPartitions = this.data.indicator.controls.computation
      .get('parameters')
      .get(`${symbol}`)
      .get('filter')
      .get(`${partitionId}`).value;

    // if the 'allOption' is selected it should be the only one displayed
    if (allPartitions.includes(this.allOption)){
      return [this.allOption];
    }

    return allPartitions;
  }

  onPartitionElementRemoved(symbol, partitionId, partitionElementId): void {
    const partitionElements = this.data.indicator.controls.computation
      .get('parameters')
      .get(`${symbol}`)
      .get('filter')
      .get(`${partitionId}`).value;

    // if we remove the 'allOption' we remove all the others too
    if (partitionElementId === this.allOption.id){
      this.data.indicator.controls.computation
      .get('parameters')
      .get(`${symbol}`)
      .get('filter').get(`${partitionId}`).setValue([]);
    }else{
      // if we remove a normal option we dont remove any other
      this.data.indicator.controls.computation
      .get('parameters')
      .get(`${symbol}`)
      .get('filter').get(`${partitionId}`).setValue(partitionElements.filter(p => p.id !== partitionElementId));
    }
  }


  toggleAllSelection(symbol, partition): void{
    const currentPartitions = this.data.indicator.controls.computation.get('parameters').get(symbol).get('filter').get(partition.id);

    // when the 'all' option is selected we select all the others too
    if (currentPartitions.value.includes(this.allOption)){
      currentPartitions.setValue([...partition.elements, this.allOption]);
    }
    // when it its unselected we remove all the others
    else{
      currentPartitions.setValue([]);
    }
  }

  toggleNormalOption(symbol, partition, partitionElement): void{
    const currentPartitions = this.data.indicator.controls.computation.get('parameters').get(symbol).get('filter').get(partition.id);
    // this means it is selecting a new option
    if (currentPartitions.value.includes(partitionElement)){
      if (currentPartitions.value.length === partition.elements.length){
        currentPartitions.setValue( [...currentPartitions.value, this.allOption]);
      }
    // this means we are deselecting an option
    }else{
      // if the 'allOption' is selected and we click on a normal option, we have to remove the 'allOption'
      currentPartitions.setValue(currentPartitions.value.filter(p => p.id !== this.allOption.id));
    }
  }

  onSubmit(): void {
    // on submitting the form we need to remove the 'allOption' if it is selected anywhere
    for (const symbol of Object.keys(this.data.indicator.controls.computation.get('parameters').value)){
      for (const partitionId of Object.keys(this.data.indicator.controls.computation.get('parameters').get(symbol).get('filter').value)){
        this.data.indicator.controls.computation
          .get('parameters')
          .get(symbol)
          .get('filter')
          .get(partitionId)
          .setValue(
            this.data.indicator.controls.computation
            .get('parameters')
            .get(symbol)
            .get('filter')
            .get(partitionId).value.filter(element => element.id !== this.allOption.id)
          );
      }
    }
    this.dialogRef.close({ indicator: this.data.indicator });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
