import { Component, OnInit, Input, forwardRef, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { GlobalService } from "app/global.service";
import { ViewModel } from '../model/viewmodel';
import { ServiceBase } from '../services/service.base';


@Component({
    selector: 'tag-custom',
    template: `<tag-input [(ngModel)]='value' (ngModelChange)="onModelChange($event)" [placeholder]="placeholder" [secondaryPlaceholder]="secondaryPlaceholder" [disabled]="disabled"></tag-input>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TagCustomComponent),
        multi: true
    }]
   
})
export class TagCustomComponent implements ControlValueAccessor, OnDestroy {

    @Input() readOnly: boolean;
    @Input() model: any;
    @Output() tagChange = new EventEmitter<any>();


    onTouched: any;
    onChange: any;
    placeholder: string;
    secondaryPlaceholder: string;
    disabled: boolean;
    
    constructor(private serviceBase: ServiceBase) {
        this.model = {};
        if (this.readOnly)
        {
            this.placeholder = "";
            this.secondaryPlaceholder = "";
            this.disabled = true;
        }
    }

    //get accessor
    get value(): any {
        console.log("value", this.model);
        return this.serviceBase.tagTransformToShow(this.model, this.readOnly);

    };

    onModelChange($event) {
        this.tagChange.emit(this.model)
        console.log("onModelChange", this.model);
    }

    //set accessor including call the onchange callback
    set value(v: any) {
        if (v !== this.model) {
            this.model = this.serviceBase.tagTransformToSave(v);
            this.onChange(v);
        }
    }

    //From ControlValueAccessor interface
    writeValue(value: any) {
        if (value !== this.model) {
            this.model = value;
        }
    }

    //From ControlValueAccessor interface
    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    //From ControlValueAccessor interface
    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    ngOnDestroy() {
        this.model = {};
    }
}