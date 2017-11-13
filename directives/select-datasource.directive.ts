import { Directive, ElementRef, Renderer, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { GlobalService } from '../../global.service'


@Directive({
    selector: '[datasource]',
    providers: [NgModel]
})

export class DataSourceDirective implements OnInit {

    @Input() dataitem: string;
    @Input() endpoint: string;
    @Input() datafilters: any;

    options: any[];
    accessor: any;

    constructor(private _elemetRef: ElementRef, private _renderer: Renderer, private api: ApiService<any>, private ngModel: NgModel) {

        this.options = [];
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

    private addOption(el, value, text) {
        let option = document.createElement("option");
        option.text = text;
        option.value = value;
        el.add(option);
        this.options.push(value);
    }

    private datasource(el, parentFilter?: any) {

        if (this.options.length > 0)
            return; 

        var filters = Object.assign(this.datafilters || {}, parentFilter || {});

        this.addOption(el, undefined, "Selecione");
        this.api.setResource(this.dataitem, this.endpoint).getDataitem(filters).subscribe((data) => {

            for (var i = 0; i < data.dataList.length; i++) {
                this.addOption(el, data.dataList[i].id, data.dataList[i].name);
            }

            if (this.ngModel.valueAccessor) {
                this.accessor = this.ngModel.valueAccessor;
                if (this.accessor.value) {
                    el.value = this.accessor.value;
                }
            }

        });

    }

}
