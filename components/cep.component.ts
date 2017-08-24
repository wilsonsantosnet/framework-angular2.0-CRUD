import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ApiService } from '../services/api.service';
import { GlobalService } from 'app/global.service';
import { ViewModel } from '../model/viewmodel';

@Component({
	selector: 'cep',
	template: `<div class="row" [formGroup]="vm.form">
  <section class="col-md-2">
    <div class='form-group'>
      <label>{{ vm.infos.cep.label }}</label>
      <input type='text' class='form-control'[(ngModel)]='vm.model.cep' name='cep'  formControlName='cep' [textMask]="{mask: vm.masks.maskCEP}" (change)="onChange(vm.model.cep)" required />      
    </div>
  </section>
  <section class="col-md-6">
    <div class='form-group busca-cep'>
      <span>
        <a href='http://www.buscacep.correios.com.br/sistemas/buscacep/buscaCepEndereco.cfm' target='_blank'>Não sei o meu CEP.</a>
      </span>
    </div>
  </section>
  <section class="col-md-6">
    <div class='form-group'>
      <label>{{ vm.infos.rua.label }}</label>
      <input type='text' class='form-control'[(ngModel)]='vm.model.rua' name='rua'  formControlName='rua' required />
    </div>
  </section>
  <section class="col-md-6">
    <div class='form-group'>
      <label>{{ vm.infos.bairro.label }}</label>
      <input type='text' class='form-control'[(ngModel)]='vm.model.bairro' name='bairro'  formControlName='bairro' required />
    </div>
  </section>
  <section class="col-md-2">
    <div class='form-group'>
      <label>{{ vm.infos.numero.label }}</label>
      <input type='text' class='form-control'[(ngModel)]='vm.model.numero' name='numero' maski='9999999999' formControlName='numero' required />
    </div>
  </section>
  <section class="col-md-6">
    <div class='form-group'>
      <label>{{ vm.infos.complemento.label }}</label>
      <input type='text' class='form-control'[(ngModel)]='vm.model.complemento' name='complemento'  formControlName='complemento'  />
    </div>
  </section>
  <section class="col-md-6">
    <div class='form-group'>
      <label>{{ vm.infos.cidade.label }}</label>
      <input type='text' class='form-control'[(ngModel)]='vm.model.cidade' name='cidade'  formControlName='cidade' required />
    </div>
  </section>
  <section class="col-md-1">
    <div class='form-group'>
      <label>{{ vm.infos.estado.label }}</label>
      <input type='text' class='form-control'[(ngModel)]='vm.model.estado' name='estado'  formControlName='estado' required />
    </div>
  </section>  
</div>`
})
export class CepComponent implements OnInit {

	@Input() vm: ViewModel<any>
	@Output() cepChange = new EventEmitter<any>();
	private endpoint: string;

	constructor(private api: ApiService<any>) {
		this.endpoint = "http://target-cep.azurewebsites.net/api/";
	}

	onChange(cep) {

		if (cep != null) {
			this.api.setResource("log_logradouro/GetDataListCustom", this.endpoint).get({ cep: cep }).subscribe((result) => {

				if (result.DataList == null || result.DataList.length < 1) {
					result.DataList = [{
						bairro: null, cep: null, cidade: null, logradouro: null, tipo: null, uf: null
					}];
				}

				this.vm.model.rua = result.DataList[0].logradouro;
				this.vm.model.cidade = result.DataList[0].cidade;
				this.vm.model.estado = result.DataList[0].uf;
				this.vm.model.bairro = result.DataList[0].bairro;

				this.cepChange.emit(result.DataList[0]);
			})
		}
	}

	ngOnInit(): void {

	}
}