import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';




import { ApiService } from "app/common/services/api.service";

@Component({
    selector: 'upload-custom',
    template: `
      <section class="col-md-12">
        <label>{{ vm.infos.foto.label }}</label><br>
        <input type='file' multiple name="foto" hidden>
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Selecionar aqrquivo...">
          <span class="input-group-btn">
            <button class="btn btn-secondary" type="button">Procurar</button>
          </span>
        </div>
        <br>
        <img src='{{vm.downloadUri}}{{vm.model.foto}}' />
        <br>
        <button class='btn btn-default' type='button' (click)='vm.delete(vm.model.foto, vm.model)'>Excluir</button>
    </section>`,
    providers: [ApiService],
})
export class BindCustomComponent implements OnInit {

    
    constructor(private api: ApiService<any>) {

        

    }

   
    ngOnInit(): void {


    }


    
}
