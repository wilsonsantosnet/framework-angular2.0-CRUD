import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DatePipe, DecimalPipe, PercentPipe, CurrencyPipe } from "@angular/common";



import { ApiService } from "app/common/services/api.service";

@Component({
    selector: 'bind-custom',
    template: `
      <span *ngIf="tag === 'span' || !tag">{{ value }}</span>
      <label *ngIf="tag === 'label'">{{ value }}</label>
      <p *ngIf="tag === 'p'">{{ value }}</p>
      <div *ngIf="tag === 'div'">{{ value }}</div>
    `,
    providers: [DatePipe, DecimalPipe, PercentPipe, CurrencyPipe, ApiService],
})
export class BindCustomComponent implements OnInit, OnChanges {



    value: any;

    @Input() model: any;
    @Input() format: string;
    @Input() tag: string;
    @Input() instance: string;
    @Input() endpoint: string;
    @Input() filterid: string;
    @Input() aux: any;

    //datePipe: DatePipe;

    constructor(
        private decimalPipe: DecimalPipe,
        private percentPipe: PercentPipe,
        private currencyPipe: CurrencyPipe,
        private api: ApiService<any>) {

        //this.datePipe = new DatePipe("pt-BR");

    }

    ngOnChanges(changes: SimpleChanges): void {


        //console.log(moment().format('MMMM Do YYYY, h:mm:ss a'));
        //if (this.format.toLocaleLowerCase() === 'date')
        //    this.value = this.datePipe.transform(this.model, 'dd/MM/yyyy');

        //else if (this.format.toLocaleLowerCase() === 'time')
        //    this.value = this.datePipe.transform(this.model, 'HH:mm');

        //else if (this.format.toLocaleLowerCase() === 'datetime' || this.format.toLocaleLowerCase() === 'datetime?')
        //     this.value = this.datePipe.transform(this.model, 'dd/MM/yyyy HH:mm');


        if (this.format.toLocaleLowerCase() === 'decimal' && !isNaN(this.model))
            this.value = this.decimalPipe.transform(this.model, '1.2-2');
        else if ((this.format.toLocaleLowerCase() === 'integer' || this.format.toLocaleLowerCase() === 'int' || this.format.toLocaleLowerCase() === 'int?') && !isNaN(this.model))
            this.value = this.decimalPipe.transform(this.model, '1.0-0');
        else if (this.format.toLocaleLowerCase() === 'percent' && !isNaN(this.model))
            this.value = this.percentPipe.transform(this.model, '1.2-2');
        else if (this.format.toLocaleLowerCase() === 'currency' && !isNaN(this.model))
            this.value = this.currencyPipe.transform(this.model, 'BRL', true, '1.2-2');
        else if (this.format.toLocaleLowerCase() === 'bool' || this.format.toLocaleLowerCase() === 'bool?')
            this.value = (this.model == true ? "Sim" : "Não");
        else if (this.format.toLocaleLowerCase() === 'instance')
            this._getInstance();
        else if (this.format.toLocaleLowerCase() === 'dataitem')
            this.value = this._getInDataItem(this.model, this.aux);
        else if (this.format.toLocaleLowerCase() === 'changevalue')
            this.value = this._getChangeForThis(this.model, this.aux);
        else
            this.value = this.model;
    }

    ngOnInit(): void {

    }

    private _getInDataItem(model, dataitem) {

        var result = dataitem.filter(function (item) {
            return model == item.id;
        });
        return result.length > 0 ? result[0].name : "--";
    }

    private _getChangeForThis(model, newValue) {
        return newValue;
    }

    private _getInstance() {


        if (!this.instance || !this.model) {
            return;
        }

        if (this.instance != undefined && this.model != undefined) {
            this.api.setResource(this.instance, this.endpoint).getDataitem({ filterid: this.model }).subscribe(data => {
                this.value = data.dataList[0].name;
            });
        }
    }

}
