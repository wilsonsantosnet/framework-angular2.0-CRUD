import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { GlobalService } from 'app/global.service';
import { ViewModel } from '../model/viewmodel';

@Component({
    selector: 'make-grid',
    template: `
    <div class="gc-table-responsive">
        <table class="table table-bordered table-striped">
          <thead class="thead-inverse">
            <tr>
              <th *ngFor="let grid of vm.grid">
                <span class="table-sort">
                  {{ grid.info.label }}
                  <a href='#' (click)='onOrderBy($event,grid.key)'><i class="fa fa-sort table-sort__icon" aria-hidden="true" data-mockup="sort-icon" data-icon="fa-sort"></i></a>
                </span>
              </th>
              <th width="175" class="text-center">Ações</th>
              <th width="65" class="text-center text-nowrap" *ngIf="showCheckbox">
                <input type="checkbox" class="grid-chk" [checked]='_isCheckedAll' (click)='onCheckAll($event)' />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of vm.filterResult">

              <td *ngFor="let grid of vm.grid" class="text-nowrap">
                <bind-custom [model]="bindFields(item, grid.key)" 
                             [format]="grid.info.type" 
                             [tag]="'span'"
                             [aux]="grid.info.aux"></bind-custom>
              </td>

              <td class="text-center text-nowrap">
                <button *ngFor="let btn of customButton" (click)="btn.click(item)" placement="top" title="btn.tooltip" class="btn btn-sm {{ btn.class }}">
                  <i class="fa {{ btn.icon }}"></i>
                </button>
                <button (click)="onEdit($event, item)" *ngIf="showEdit" placement="top" title="Editar" class="btn btn-sm btn-primary">
                  <i class="fa fa-pencil"></i>
                </button>
                <button (click)="onDetails($event, item)" *ngIf="showDetails" placement="top" title="Detalhes" class="btn btn-sm">
                  <i class="fa fa-table"></i>
                </button>
                <button (click)="onPrint($event, item)" *ngIf="showPrint" placement="top" title="Imprimir" class="btn btn-sm btn-success">
                  <i class="fa fa-print"></i>
                </button>
                <button (click)="onDeleteConfimation($event, item)" *ngIf="showDelete" placement="top" title="Excluir" class="btn btn-sm btn-danger">
                  <i class="fa fa-trash-o"></i>
                </button>
              </td>
              
              <td class="text-center text-nowrap" *ngIf="showCheckbox">
                <input type="checkbox" class="grid-chk" name="gridCheckBox" [value]="getPropertyValue(item, checkboxProperty)" (change)='onChange($event)' />
              </td>

            </tr>
          </tbody>
        </table>
    </div>`
})
export class MakeGridComponent implements OnChanges {

    @Input() vm: ViewModel<any>
    @Input() showEdit: boolean = true;
    @Input() showDetails: boolean = true;
    @Input() showPrint: boolean = true;
    @Input() showDelete: boolean = true;
    @Input() showCheckbox: boolean = false;

    // [{ class: 'btn-success', tooltip: 'Configuracao', icon: 'fa-cog', click: (model) => { this.router.navigate(['/estagio/configuracao', model.estagioId]); } }]
    @Input() customButton: any = [];
    @Input() checkboxProperty: string;

    @Output() edit = new EventEmitter<any>();
    @Output() details = new EventEmitter<any>();
    @Output() print = new EventEmitter<any>();
    @Output() deleteConfimation = new EventEmitter<any>();
    @Output() orderBy = new EventEmitter<any>();

    _modelOutput: any;
    _collectionjsonTemplate: any;
    _isCheckedAll: boolean;
    _isAsc: boolean;


    constructor() {
        this.init();
    }

    ngOnChanges(): void { }

    init() {
        this._modelOutput = [];
        this._collectionjsonTemplate = "";
        this._isCheckedAll = false;
        this._isAsc = true;
    }

    bindFields(item, key) {
        if (key.includes(".")) {
            let keys = key.split(".");
            if (keys.length == 2) return item[keys[0]][keys[1]];
            if (keys.length == 3) return item[keys[0]][keys[1]][keys[2]];
        }
        return item[key];
    }

    onChange(evt) {

        this.addItem(parseInt(evt.target.value), evt.target.checked);

        this.vm.gridCheckModel = this.serializeToJson();

        let checkBoxItens = document.getElementsByName('gridCheckBox');

        for (var i = 0; i < checkBoxItens.length; i++) {
            if ((<HTMLInputElement>checkBoxItens[i]).checked == false) {
                this._isCheckedAll = false;
                break;
            }

            if (i == checkBoxItens.length - 1) {
                this._isCheckedAll = true;
            }
        }
    }

    onCheckAll(e) {

        this._isCheckedAll = e.target.checked;

        let checkBoxItens = document.getElementsByName('gridCheckBox');

        for (var i = 0; i < checkBoxItens.length; i++) {

            (<HTMLInputElement>checkBoxItens[i]).checked = e.target.checked;

            this.addItem(parseInt((<HTMLInputElement>checkBoxItens[i]).value), (<HTMLInputElement>checkBoxItens[i]).checked);
        }

        this.vm.gridCheckModel = this.serializeToJson();
    }

    private addItem(value: any, checked: boolean) {

        if (checked) {
            this._modelOutput.push(value);
        }
        else {
            this._modelOutput = this._modelOutput.filter((item) => {
                return item != value;
            });
        }
    }

    private serializeToJson() {

        this.removeDoubled();

        let items: any = [];

        for (let item in this._modelOutput) {
            items.push(`{ "${this.checkboxProperty}" : "${this._modelOutput[item]}"}`);
        }

        this._collectionjsonTemplate = `[ ${items.join()} ]`;

        return JSON.parse(this._collectionjsonTemplate);
    }

    private removeDoubled() {

        let modelOutputDuplicate = this._modelOutput;

        let modelOutputUnique = modelOutputDuplicate.filter(function (item, pos) {
            return modelOutputDuplicate.indexOf(item) == pos;
        });

        this._modelOutput = modelOutputUnique;
    }

    onEdit(evt, model) {
        evt.preventDefault();
        this.edit.emit(model);
    }

    onDetails(evt, model) {
        evt.preventDefault();
        this.details.emit(model);
    }

    onPrint(evt, model) {
        evt.preventDefault();
        this.print.emit(model);
    }

    onDeleteConfimation(evt, model) {
        evt.preventDefault();
        this.deleteConfimation.emit(model);
    }

    onOrderBy(evt, field) {
        this._isAsc = !this._isAsc
        evt.preventDefault();
        this.orderBy.emit({
            field: field,
            asc: this._isAsc
        });
    }

}
