import { Directive, ElementRef, Renderer, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Directive({
    selector: '[datasource]'
})

export class DataSourceDirective implements OnInit {

    @Input() dataitem: string;
    @Input() label: string;
    private options: any[];

    constructor(private _elemetRef: ElementRef, private _renderer: Renderer, private api: ApiService<any>) {

        
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
        console.log("datasource",this.dataitem);
        this.api.setResource(this.dataitem).getDataitem().subscribe((data) => {
            for (var i = 0; i < data.dataList.length; i++) {
                this.addOption(el, data.dataList[i].id, data.dataList[i].name);
            }
        });

    }

}
