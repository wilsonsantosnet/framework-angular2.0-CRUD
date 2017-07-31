import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GlobalService } from 'app/global.service';

@Component({
    selector: 'make-grid',
    template: `
    <table class="table">
      <thead>
        <tr>
          <th *ngFor="let info of vm.grid">
            <button class="btn btn-sm btn-default pull-right" (click)="onOrderBy(info.label)">
              <i class="fa fa-arrows-v"></i>
            </button> {{ info.label }}
          </th>
          <th width="175" class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let item of vm.filterResult">
          <td *ngFor="let info of vm.grid">
            <bind-custom [model]="item[info.label]" [format]="info.type" [tag]="'span'"></bind-custom>
          </td>

          <td>
            <button (click)="onEdit(item)" tooltip-placement="top" uib-tooltip="Editar" class="btn btn-sm btn-default">
              <i class="fa fa-pencil"></i>
            </button>
            <button (click)="onDetails(item)" tooltip-placement="top" uib-tooltip="Detalhes" class="btn btn-sm">
              <i class="fa fa-table"></i>
            </button>
            <button (click)="onPrint(item)" tooltip-placement="top" uib-tooltip="Imprimir" class="btn btn-sm btn-success">
              <i class="fa fa-print"></i>
            </button>
            <button (click)="onDeleteConfimation(item)" tooltip-placement="top" uib-tooltip="Excluir" class="btn btn-sm btn-danger">
              <i class="fa fa-trash-o"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>`
})
export class MakeGridComponent {

    @Input() vm: any;

    @Output() edit = new EventEmitter<any>();
    @Output() details = new EventEmitter<any>();
    @Output() print = new EventEmitter<any>();
    @Output() deleteConfimation = new EventEmitter<any>();

    constructor() { }


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
