import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

import { GlobalService } from 'app/global.service';

@Component({
    selector: 'make-grid',
    template: `
    <div class="table-responsive">
        <table class="table table-bordered table-striped">
          <thead class="thead-inverse">
            <tr>
              <th *ngFor="let grid of vm.grid">
                <span class="table-sort">
                  {{ grid.info.label }}
                  <i class="fa fa-sort table-sort__icon" aria-hidden="true" data-mockup="sort-icon" data-icon="fa-sort"></i>
                </span>
              </th>
              <th width="175" class="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let item of vm.filterResult">

              <td *ngFor="let grid of vm.grid">
                <bind-custom [model]="bindFields(item, grid.key)" 
                             [format]="grid.info.type" 
                             [tag]="'span'"
                             [aux]="grid.info.aux"></bind-custom>
              </td>

              <td class="text-center">
                <button (click)="onEdit(item)" *ngIf="showEdit" tooltip-placement="top" uib-tooltip="Editar" class="btn btn-sm btn-default">
                  <i class="fa fa-pencil"></i>
                </button>
                <button (click)="onDetails(item)" *ngIf="showDetails" tooltip-placement="top" uib-tooltip="Detalhes" class="btn btn-sm">
                  <i class="fa fa-table"></i>
                </button>
                <button (click)="onPrint(item)" *ngIf="showPrint" tooltip-placement="top" uib-tooltip="Imprimir" class="btn btn-sm btn-success">
                  <i class="fa fa-print"></i>
                </button>
                <button (click)="onDeleteConfimation(item)" *ngIf="showDelete" tooltip-placement="top" uib-tooltip="Excluir" class="btn btn-sm btn-danger">
                  <i class="fa fa-trash-o"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>`
})
export class MakeGridComponent implements OnChanges {

    @Input() vm: any;

    @Input() showEdit: boolean = true;
    @Input() showDetails: boolean = true;
    @Input() showPrint: boolean = true;
    @Input() showDelete: boolean = true;

    @Output() edit = new EventEmitter<any>();
    @Output() details = new EventEmitter<any>();
    @Output() print = new EventEmitter<any>();
    @Output() deleteConfimation = new EventEmitter<any>();

    constructor() {
    }

    ngOnChanges(): void { }

    bindFields(item, key) {
        if (key.includes(".")) {
            let keys = key.split(".");
            if (keys.length == 2) return item[keys[0]][keys[1]];
            if (keys.length == 3) return item[keys[0]][keys[1]][keys[2]];
        }
        return item[key];
    }

    onEdit(model) {
        this.edit.emit(model);
    }
    onDetails(model) {
        this.details.emit(model);
    }
    onPrint(model) {
        this.print.emit(model);
    }
    onDeleteConfimation(model) {
        this.deleteConfimation.emit(model);
    }

}
