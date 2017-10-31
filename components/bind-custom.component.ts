import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SecurityContext  } from '@angular/core';
import { DatePipe, DecimalPipe, PercentPipe, CurrencyPipe } from "@angular/common";
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from "app/common/services/api.service";
import { MaskFormatPipe } from "../pipes/mask.pipe";

@Component({
    selector: 'bind-custom',
    template: `
      <span *ngIf="tag === 'span'" [ngClass]="{'badge-success': badge && model, 'badge-danger': badge && !model, 'badge': badge }">{{ value }}</span>
      <label *ngIf="tag === 'label'">{{ value }}</label>
      <p *ngIf="tag === 'p'">{{ value }}</p>
      <div *ngIf="tag === 'div'">{{ value }}</div>
      <div *ngIf="tag === 'inner'" [innerHTML]='value'></div>
    `,
    providers: [DatePipe, DecimalPipe, PercentPipe, CurrencyPipe, MaskFormatPipe, ApiService],
})
export class BindCustomComponent implements OnInit, OnChanges {

    value: any;
    badge: boolean;

    @Input() model: any;
    @Input() format: string;
    @Input() tag: string;
    @Input() instance: string;
    @Input() endpoint: string;
    @Input() key: string;
    @Input() aux: any;
    @Input() mask: any;

    datePipe: DatePipe;

    constructor(
        private decimalPipe: DecimalPipe,
        private percentPipe: PercentPipe,
        private currencyPipe: CurrencyPipe,
        private maskPipe: MaskFormatPipe,
        private sanitizer: DomSanitizer,
        private api: ApiService<any>) {

        this.datePipe = new DatePipe("pt-BR");
    }

    public convertDate(value) {
        if (value) {
            var datePart = value.toString().split("/");
            var convertedDate = datePart[1] + "/" + datePart[0] + "/" + datePart[2];
            return new Date(convertedDate);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {

        if (this.format.toLocaleLowerCase() === 'date') {
            this.value = this.datePipe.transform(this.convertDate(this.model), 'dd/MM/yyyy');
        }
        else if (this.format.toLocaleLowerCase() === 'time') {
            this.value = this.datePipe.transform(this.convertDate(this.model), 'HH:mm');
        }
        else if (this.format.toLocaleLowerCase() === 'datetime' || this.format.toLocaleLowerCase() === 'datetime?') {
            this.value = this.datePipe.transform(this.convertDate(this.model), 'dd/MM/yyyy HH:mm');
        }
        else if ((this.format.toLocaleLowerCase() === 'integer' || this.format.toLocaleLowerCase() === 'int' || this.format.toLocaleLowerCase() === 'int?') && !isNaN(this.model)) {
            this.value =  this.model;
        }
        else if (this.format.toLocaleLowerCase() === 'decimal' && !isNaN(this.model)) {
            this.value = this.decimalPipe.transform(this.model, '1.2-2');
        }
        else if (this.format.toLocaleLowerCase() === 'percent' && !isNaN(this.model)) {
            this.value = this.percentPipe.transform(this.model, '1.2-2');
        }
        else if (this.format.toLocaleLowerCase() === 'currency' && !isNaN(this.model)) {
            this.value = this.currencyPipe.transform(this.model, 'BRL', true, '1.2-2');
        }
        else if (this.format.toLocaleLowerCase() === 'instance') {
            this._getInstance();
        }
        else if (this.format.toLocaleLowerCase() === 'dataitem') {
            this.value = this._getInDataItem(this.model, this.aux);
        }
        else if (this.format.toLocaleLowerCase() === 'changevalue') {
            this.value = this._getChangeForThis(this.model, this.aux);
        }
        else if (this.format.toLocaleLowerCase() === 'bool' || this.format.toLocaleLowerCase() === 'bool?') {
            this.value = (this.model == true ? "Sim" : "Não"); this.badge = true;
        }
        else if (this.format.toLocaleLowerCase() === 'html') {
            this.tag = "inner";
            this.value = this.sanitizer.sanitize(SecurityContext.HTML, this.model);
        }
        else if (this.format.toLocaleLowerCase() === 'mask' && this.model) {
            this.value = this.maskPipe.transform(this.model, this.mask);
        }   
        else {
            this.value = this.model;
        }

    }

    ngOnInit(): void { }

    private _getInDataItem(model, dataitem) {


        if (dataitem) {
            var result = dataitem.filter(function (item) {
                return model == item.id;
            });
            return result.length > 0 ? result[0].name : "--";
        }
        return "--";
    }

    private _getChangeForThis(model, newValue) {
        return newValue;
    }

    private _getInstance() {

        if (!this.instance || !this.model) {
            return;
        }

        let filters = [];
        filters[this.key] = this.model

        this.api.setResource(this.instance, this.endpoint).getDataitem(filters).subscribe(data => {
            this.value = data.dataList[0].name;
        });

    }

}
