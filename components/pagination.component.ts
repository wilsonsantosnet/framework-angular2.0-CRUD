import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GlobalService } from 'app/global.service';
import { ApiService } from '../services/api.service';

@Component({
    selector: 'make-pagination',
    template: `
        <pagination 
            (pageChanged)="onPageChanged($event)" 
            itemsPerPage="10" 
            totalItems="{{vm.summary.total}}" 
            previousText="Anterior"
            nextText="Próximo" 
            maxSize="5" 
            rotate="true">
        </pagination>

        <div class="pull-right">
            <h4>
                Total de registros: <span class="label label-primary">{{ vm.summary.total }}</span>
            </h4>
        </div>
    `,
})
export class MakePaginationComponent {

    @Input() vm: any;
    @Output() pageChanged = new EventEmitter<any>();
    constructor() { }

    onPageChanged(e: any) {

        this.pageChanged.emit({
            PageIndex: e.page,
            PageSize: e.itemsPerPage,
        })
    }

}
