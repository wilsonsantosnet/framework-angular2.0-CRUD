import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { GlobalService } from "app/global.service";
import { ApiService } from "app/common/services/api.service";

@Component({
  selector: 'upload-custom',
  template: `
    <div class='row'>     
  <section class="col-md-12" [formGroup]="vm.form">
        <label>{{ label }}</label><br>
        <input type='file' accept="image/*" #file name="{{ctrlName}}" hidden (change)="onChange($event)"/>
        <div class="input-group">
          <input type="text" readonly="readonly" [(ngModel)]='fileName' class="form-control" placeholder="Selecionar arquivo..." formControlName="{{ctrlName}}" />
          <span class="btn-group">
            <button class="btn btn-secondary" (click)="file.click()" type="button">Procurar</button>
            <button class='btn btn-secondary' [hidden]="!model" type='button' (click)='onDelete()'>Excluir</button>
          </span>
        </div>
        <br>
        <img *ngIf='model' src='{{downloadUri}}{{folder}}/{{model}}' />
    </section></div>`,
  providers: [ApiService],
})
export class UploadCustomComponent implements OnInit {

  @ViewChild('file') fileUpload: any;
  @Input() label: string;
  @Input() ctrlName: string;
  @Input() model: any;
  @Input() form: any;
  @Input() vm: any;
  @Input() folder: string;

  private fileName: string;
  private imagem: string;
  private downloadUri: string;

  constructor(private api: ApiService<any>, private ref: ChangeDetectorRef) {
    this.downloadUri = GlobalService.getEndPoints().DOWNLOAD;
  }


  ngOnInit(): void {

  }

  ngAfterViewChecked(): void {
    this.ref.detectChanges();
  }

  onChange(event) {
    if (event.target.files.length == 0)
      return false;

    let file: File = event.target.files[0];
    this.fileName = file.name;
    this.api.setResource('upload');

    this.api.upload(file, this.folder).subscribe(result => {
      this.imagem = result.data[0];
      this.vm.model.imagemUrl = this.imagem;
    });
  }

  onDelete() {
    this.api.setResource('upload');
    this.api.deleteUpload(this.folder, this.imagem).subscribe(() => {
      this.reset();
    });
  }

  reset() {
    this.fileUpload.nativeElement.value = '';
    this.vm.model.imagemUrl = null;
    this.imagem = null;
  }

  ngOnChanges() {
       this.ref.detectChanges()
	}
}
