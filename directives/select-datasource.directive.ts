import { Directive, ElementRef, Renderer, Input, Output, OnInit, EventEmitter, OnDestroy, Optional, Self } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { GlobalService } from '../../global.service'

declare var $: any;

@Directive({
    selector: '[datasource]',
    providers: [NgModel],
    host: {
        '(change)': 'onChange($event.target)'
    }
})

export class DataSourceDirective implements OnInit, OnDestroy {

    @Input() dataitem: string;
    @Input() endpoint: string;
    @Input() datafilters: any;
    @Input() fieldFilterName: any;

    accessor: any;

    constructor(private _elemetRef: ElementRef, private _renderer: Renderer, private api: ApiService<any>, private ngModel: NgModel, @Optional() @Self() private controlName: FormControlName) {

    }

    ngOnInit() {

        this.datasource(this._elemetRef.nativeElement);

        GlobalService.notification.subscribe((not) => {
            if (not.event == "create" || not.event == "edit") {
                this.datasource(this._elemetRef.nativeElement);
            }
            if (not.event == "change") {
                if (not.data.dataitem == this.dataitem)
                    this.datasource(this._elemetRef.nativeElement, not.data.parentFilter);
            }
        });
    }

    onChange(target) { }

    private addOption(el, value, text) {

        if (this.existsItem(el, value))
            return;

        let option = document.createElement("option");
        option.text = text;
        option.value = value;
        el.add(option);
    }

    private existsItem(el, value) {

        let found = false;
        if (el.options) {
            for (var i = 0; i < el.options.length; i++) {
                if (el.options[i].value == value)
                    found = true;
            }
        }
        return found;
    }

    private existsDefaultItem(el) {

        let found = false;
        if (el.options) {
            for (var i = 0; i < el.options.length; i++) {
                if (el.options[i].text == "Selecione")
                    found = true;
            }
        }
        return found;
    }

    private datasource(el, parentFilter?: any) {

        let filters = Object.assign(this.datafilters || {}, parentFilter || {});
        let selectedValue = null;
        if (this.ngModel.valueAccessor) {
            this.accessor = this.ngModel.valueAccessor;
            if (this.accessor.value) {
                selectedValue = this.accessor.value;
            }
        }

        if (!this.existsDefaultItem(el))
            this.addOption(el, undefined, "Selecione");

        if (selectedValue) {
            this.api.setResource(this.dataitem, this.endpoint).getDataitem(filters).subscribe((data) => {

                for (var i = 0; i < data.dataList.length; i++) {
                    this.addOption(el, data.dataList[i].id, data.dataList[i].name);
                }

                if (selectedValue) 
                    el.value = this.accessor.value;

                this.select2Config(filters, selectedValue)
            });
        }
        else {
            this.select2Config(filters, selectedValue)
        }

    }

    private select2Config(filters: any, selectedValue: any) {

        let element = $(this._elemetRef.nativeElement);
        let ultimoValor = 0;
        let config = {
            ajax: this.api.setResource(this.dataitem, this.endpoint)
                .getUrlConfig(true, this.fieldFilterName, "GetDataItem", filters)
        }
        $(element)
            .select2(selectedValue ? {} : config)
            .on("select2:select", (e) => {
                let valor = $(e.currentTarget).val()
                this.updateValue(valor, ultimoValor);
                ultimoValor = valor;
            });
    }

    private updateValue(value, valueold) {

        if (this.ngModel) {
            this.ngModel.viewToModelUpdate(value);

            if (value != valueold) {
                this.ngModel.control.markAsDirty();
            }
        }

        if (this.hasFormControl()) {
            this.control.setValue(value);

            if (value != valueold) {
                this.control.markAsDirty();
            }
        }

    }

    hasFormControl() {
        return this.controlName && this.controlName.control;
    }

    get control() {

        if (!this.controlName) {
            return null;
        }

        return this.controlName.control;
    }

    ngOnDestroy() {
        $(this._elemetRef.nativeElement).select2('destroy');
    }

}
