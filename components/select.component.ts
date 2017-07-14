import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ApiService } from '../services/api.service';

/**
 * Cria um select - tem dependência de ApiService
 * Exemplo
 * `<make-select (ngModelChange)="crud.filter.MidiaId = $event" [dataitem]="'Midia'" [value]="crud.model.MidiaId"></make-select>`
 * Injetar esse component no módulo onde for utilizar
 * @constructor
 */
@Component({
    selector: 'make-select',
    template: `
        <select [(ngModel)]="value" class="form-control" (change)="onChange()">
            <option [value]="undefined">Selecione</option>
            <option *ngFor="let option of options" [value]="option.id">{{ option.name }}</option>
        </select>
    `,
    providers: [ApiService],
})
export class MakeSelectComponent implements OnInit {

    /**
    * Resource onde será feito o request
    * Exemplo `[dataitem]="'Midia'"`
    */
    @Input()
    dataitem: string;

    /**
    * Changes do feitos no select
    * Exemplo `(ngModelChange)="crud.filter.MidiaId = $event"`
    */
    @Output()
    ngModelChange = new EventEmitter<number>();

    /**
    * Valor inicial que virá no select
    * Exemplo `[value]="crud.model.MidiaId"`
    */
    @Input()
    value?: number;

    public options: any[];

    constructor(public api: ApiService<any>) { }

    onChange() {
        this.ngModelChange.emit(this.value);
    }

    ngOnInit() {
        
        this.api.setResource(this.dataitem).getDataitem().subscribe((data) => {

            console.log("MakeSelectComponent", data);

            this.options = data.dataList
        });
    }

}
