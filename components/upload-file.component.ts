import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';

import { GlobalService } from "app/global.service";
import { ApiService } from "app/common/services/api.service";

@Component({
    selector: 'upload-custom',
    template: `
      <section class="col-md-12" [formGroup]="vm.form">
        <label>{{ label }}</label><br>
        <input type='file' name="{{ctrlName}}" hidden formControlName="imagem" (change)="onChange($event)">
        <div class="input-group">
          <input type="text" [(ngModel)]='model' class="form-control" placeholder="Selecionar aqrquivo..." formControlName="imagem">
          <span class="input-group-btn">
            <button class="btn btn-secondary" type="button">Procurar</button>
          </span>
        </div>
        <br>
        <img *ngIf='model' src='{{downloadUri}}{{model}}' />
        <br>
        <button class='btn btn-default' type='button' (click)='onDelete()'>Excluir</button>
    </section>`,
    providers: [ApiService],
})
export class UploadCustomComponent implements OnInit {


    @Input() label: string;
    @Input() ctrlName: string;
    @Input() model: any;
    @Input() form: any;

    @Input() vm: any;
    //@Input() field: string;

    private downloadUri: string;

    constructor(private api: ApiService<any>, private ref: ChangeDetectorRef) {

        this.downloadUri = GlobalService.getEndPoints().DOWNLOAD;

    }


    ngOnInit(): void {

    }

    ngAfterViewChecked(): void {

        this.ref.detectChanges();
    }

    onChange(event)
    {

    }

    onDelete() {


    }



}
