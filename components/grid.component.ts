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
                  <i class="fa fa-sort table-sort__icon" aria-hidden="true" data-mockup="sort-icon" data-icon="fa-sort"></i>
                </span>
              </th>
              <th width="175" class="text-center">Ações</th>
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

    // [{ class: 'btn-success', tooltip: 'Configuracao', icon: 'fa-cog', click: (model) => { this.router.navigate(['/estagio/configuracao', model.estagioId]); } }]
    @Input() customButton: any = [];

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

}
