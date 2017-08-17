import { Component, NgModule, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewChecked, AfterViewInit, DoCheck, AfterContentChecked, AfterContentInit } from '@angular/core';

import { ApiService } from "app/common/services/api.service";
import { GlobalService } from "../../global.service";

@Component({
    selector: 'multiselect',
    template: ` <section class="col-md-12 section-scroll" >
    <div class='checkbox' *ngFor="let option of _datasource">
      <label>
          <input type='checkbox' [(ngModel)]='option.checked' name='{{ctrlNameItem}}'  value='{{option.id}}' (change)='onChange($event)' /> {{ option.name }}
      </label>
    </div>
  </section>`
})
export class MultiSelectComponent implements OnInit {

    @Input() dataitem: string;
    @Input() vm: any;
    @Input() endpoint: string;
    @Input() ctrlName: string;
    @Input() ctrlNameItem: string;
    @Input() type: string;


    private _datasource: any[];
    private _modelOutput: any;
    private _collectionjsonTemplate
    private _modelInput: any;

    constructor(private api: ApiService<any>) {
        this.type = "filter";
    }

    ngOnInit() {

        this.init();
        this._getInstance();

        GlobalService.notification.subscribe((selector) => {
            if (selector == "multiselect") {
                this.init();
                this._getInstance();
            }
        })
    }

    init() {
        this._modelOutput = [];
        this._datasource = [];
        this._modelInput = this.vm.model[this.ctrlName];
        this._collectionjsonTemplate = "";
    }

    onChange(e) {

        this.addItem(e.target.value, e.target.checked);

        if (this.type.toLowerCase() == "filter")
            return this.vm.modelFilter[this.ctrlName] = this.serializeToFilter();

        this.vm.model[this.ctrlName] = this.serializeToSave();

    }


    private addItem(value: any, checked: boolean) {

        if (checked) {
            this._modelOutput.push(value);
        }
        else {
            this._modelOutput = this._modelOutput.filter((item) => {
                return item != value;
            });
        }
    }

    private serializeToSave() {

        console.log("serializeToSave", this._modelOutput);
        let items: any = [];

        for (let item in this._modelOutput) {
            items.push(`{ "${this.ctrlNameItem}" : "${this._modelOutput[item]}"}`);
        }

        this._collectionjsonTemplate = `[ ${items.join()} ]`;

        return JSON.parse(this._collectionjsonTemplate);
    }

    private serializeToFilter() {
        return this._modelOutput.join()
    }

    private _getInstance() {


        this.api.setResource(this.dataitem, this.endpoint).getDataitem().subscribe(result => {
            this._datasource = [];
            for (let item in result.dataList) {
                this._datasource.push({
                    id: result.dataList[item].id,
                    name: result.dataList[item].name,
                    checked: this._modelInput ? this._modelInput.filter((selecteds) => {
                        let checked = selecteds[this.ctrlNameItem] == result.dataList[item].id;
                        if (checked)
                            this.addItem(result.dataList[item].id, checked);
                        return checked;
                    }).length > 0 : false
                });
            }

        });
    }
}
