import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { GlobalService } from "app/global.service";
import { ViewModel } from '../model/viewmodel';
import { ServiceBase } from '../services/service.base';


@Component({
    selector: 'tag-custom',
    template: `<tag-input [(ngModel)]='value' [placeholder]="placeholder" [secondaryPlaceholder]="secondaryPlaceholder" [disabled]="disabled"></tag-input>`,
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TagCustomComponent),
        multi: true
    }]
   
})
export class TagCustomComponent implements ControlValueAccessor {

    @Input() readOnly: boolean;

    model: any
    onTouched: any;
    onChange: any;
    placeholder: string;
    secondaryPlaceholder: string;
    disabled: boolean;
    
    constructor(private serviceBase: ServiceBase) {
        if (this.readOnly)
        {
            this.placeholder = "";
            this.secondaryPlaceholder = "";
            this.disabled = true;
        }
    }

    //get accessor
    get value(): any {
        return this.serviceBase.tagTransformToShow(this.model);
    };

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

}