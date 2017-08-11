import { Component, NgModule, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { ApiService } from "app/common/services/api.service";

@Component({
    selector: 'multiselect',
    template: ` <section class="col-md-12 section-scroll" >
    <div class='checkbox' *ngFor="let option of _datasource">
      <label>
          <input type='checkbox'  ([ngModel])='option.id' name='{{ctrlNameItem}}'  value='{{option.id}}' (change)='onChange($event)' /> {{ option.name }}
      </label>
    </div>
  </section>
 `
})
export class MultiSelectComponent implements OnInit {

    @Input() dataitem: string;
    @Input() vm: any;
    @Input() endpoint: string;
    @Input() ctrlName: string;
    @Input() ctrlNameItem: string;
    @Input() type: string;


    private _datasource: any;
    private _model: any;
    private _collectionjsonTemplate

    constructor(private api: ApiService<any>) {
        this._model = [];
        this.type = "filter";
        this._collectionjsonTemplate = "";
    }

    onChange(e) {

        this._model.push(e.target.value);

        if (this.type.toLowerCase() == "filter")
            return this.vm.modelFilter[this.ctrlName] = this.serializeToFilter();

        this.vm.model[this.ctrlName] = this.serializeToSave();

    }

    private serializeToSave() {

        let items: any = [];

        for (let item in this._model) {
            items.push(`{ "${this.ctrlNameItem}" : "${this._model[item]}"}`);
        }

        this._collectionjsonTemplate = `[ ${items.join()} ]`;

        return JSON.parse(this._collectionjsonTemplate);
    }

    private serializeToFilter() {
        return this._model.join()
    }

    ngOnInit() {
        this._getInstance();
    }

    private _getInstance() {

        this.api.setResource(this.dataitem, this.endpoint).getDataitem().subscribe(result => {
            this._datasource = result.dataList;
        });
    }
}
