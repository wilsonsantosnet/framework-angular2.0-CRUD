import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GlobalService } from 'app/global.service';

@Component({
    selector: 'make-grid',
    templateUrl: './grid.component.html'
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
