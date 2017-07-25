import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import * as moment from 'moment';

declare var $: any;


@Directive({
    selector: '[datetimepicker]',
    providers: [NgModel]
})
export class DateDirective {
    
    @Input() saUiDateTimePicker: any; //configuração do plugin
    @Output() change = new EventEmitter();

    constructor(private el: ElementRef, private ngModel: NgModel) {
       this.render();
    }

    render() {
        let element = $(this.el.nativeElement);

        //iniciando plugin
        $.datetimepicker.setLocale('pt-BR'); //idioma plugin
        let options = $.extend(this.saUiDateTimePicker, {
            mask: '39/19/2999 29:59',
            format: 'd/m/Y H:i',
            todayButton: true,
            defaultSelect: true,
            step: 30
        });
        element.datetimepicker(options);
        this.change.emit(); //necessário para emitir o evento change

        let ultimoValor = '';
        $(element).on('change', ret => {
            let valor = $(element).val();
            if (valor != ultimoValor) {
                ultimoValor = valor;
                this.ngModel.update.emit(valor); // necessário para atualizar o valor do 'model' no angular
                this.change.emit(); //necessário para emitir o evento change
            }
        });
    }

}
