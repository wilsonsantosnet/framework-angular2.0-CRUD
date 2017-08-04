import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { GlobalService } from 'app/global.service';
import { ApiService } from '../services/api.service';

@Component({
	selector: 'cep',
	template: `<div class="row" [formGroup]="vm.form">
  <section class="col-md-6">
    <div class='form-group'>
      <label>{{ vm.infos.cep.label }}</label>
      <input type='text' class='form-control'[(ngModel)]='vm.model.cep' name='cep'  formControlName='cep' maski='99999-999' (change)="onChange(vm.model.cep)" />
    </div>
  </section>
  <section class="col-md-6">
    <div class='form-group'>
      <label>{{ vm.infos.rua.label }}</label>
      <input type='text' class='form-control'[(ngModel)]='vm.model.rua' name='rua'  formControlName='rua'  />
    </div>
  </section>
  <section class="col-md-6">
    <div class='form-group'>
      <label>{{ vm.infos.numero.label }}</label>
      <input type='text' class='form-control'[(ngModel)]='vm.model.numero' name='numero'  formControlName='numero'  />
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
      <input type='text' class='form-control'[(ngModel)]='vm.model.cidade' name='cidade'  formControlName='cidade'  />
    </div>
  </section>
  <section class="col-md-6">
    <div class='form-group'>
      <label>{{ vm.infos.estado.label }}</label>
      <input type='text' class='form-control'[(ngModel)]='vm.model.estado' name='estado'  formControlName='estado'  />
    </div>
  </section>
  <section class="col-md-6">
    <div class='form-group'>
      <label>{{ vm.infos.bairro.label }}</label>
      <input type='text' class='form-control'[(ngModel)]='vm.model.bairro' name='bairro'  formControlName='bairro'  />
    </div>
  </section>
</div>`
})
export class CepComponent implements OnInit {

	@Input() vm: any;
	@Output() cepChange = new EventEmitter<any>();
	private endpoint: string;

	constructor(private api: ApiService<any>) {
		this.endpoint = "https://cep.cnabox.com.br/api/";
	}

	onChange(cep) {

		if (cep) {
			this.api.setResource("log_logradouro/GetDataListCustom", this.endpoint).get({ cep: cep }).subscribe((result) => {

                if (result.DataList != null && result.DataList.length > 0) {

					this.vm.model.cep = result.DataList[0].cep;
					this.vm.model.rua = result.DataList[0].logradouro;
					this.vm.model.cidade = result.DataList[0].cidade;
					this.vm.model.estado = result.DataList[0].uf;
					this.vm.model.bairro = result.DataList[0].bairro;

					this.cepChange.emit(result.DataList[0]);
				}
			})
		}

	}

	ngOnInit(): void {

	}
}
