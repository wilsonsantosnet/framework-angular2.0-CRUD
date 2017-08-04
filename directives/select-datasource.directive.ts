import { Directive, ElementRef, Renderer, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

import { NgModel } from '@angular/forms';

@Directive({
    selector: '[datasource]',
    providers: [NgModel]
})

export class DataSourceDirective implements OnInit {

    @Input() dataitem: string;
    @Input() endpoint: string;
    @Input() label: string;
    private options: any[];
    private accessor: any;

    constructor(private _elemetRef: ElementRef, private _renderer: Renderer, private api: ApiService<any>, private ngModel: NgModel) {


    }

    ngOnInit() {
        this.datasource(this._elemetRef.nativeElement);
    }

    private addOption(el, value, text) {
        let option = document.createElement("option");
        option.text = text;
        option.value = value;
        el.add(option);
    }

    private datasource(el) {

        this.addOption(el, undefined, "Selecione");
        this.api.setResource(this.dataitem, this.endpoint).getDataitem().subscribe((data) => {

            for (var i = 0; i < data.dataList.length; i++) {
                this.addOption(el, data.dataList[i].id, data.dataList[i].name);
            }

            this.accessor = this.ngModel.valueAccessor;
            if (this.accessor.value != null && this.accessor.value != undefined) {
                el.value = this.accessor.value;
            }

        });

    }

}
