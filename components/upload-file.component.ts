import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
import { GlobalService } from "app/global.service";
import { ApiService } from "app/common/services/api.service";
import { ViewModel } from '../model/viewmodel';

@Component({
    selector: 'upload-custom',
    template: `
    <div class='row'>     
      <section class="col-md-12" [formGroup]="vm.form">
          <label>{{ label }}</label><br>
          <input type='file' accept="{{accept}}" #file name="{{ctrlName}}" hidden (change)="onChange($event)"/>
          <div class="input-group">
            <input type="text" readonly="readonly" [(ngModel)]='fileNameOld' class="form-control" placeholder="Selecionar arquivo..." formControlName="{{ctrlName}}" />
            <span class="btn-group">
              <button class="btn btn-secondary" (click)="file.click()" type="button">Procurar</button>
              <button class='btn btn-secondary' [hidden]="!fileName" type='button' (click)='onDelete()'>Excluir</button>
            </span>
          </div>
          <br>
          <img *ngIf='fileName' src='{{downloadUri}}{{folder}}/{{fileName}}' />
      </section>
    </div>`,
    providers: [ApiService],
})
export class UploadCustomComponent implements OnInit {

    @ViewChild('file') fileUpload: any;
    @Output() onChangeUploadExternal = new EventEmitter<any>();

    @Input() label: string;
    @Input() accept: string;
    @Input() ctrlName: string;
    @Input() vm: ViewModel<any>
    @Input() folder: string;
    @Input() enabledUploadExternal: boolean;

    fileName: string;
    fileNameOld: string;
    downloadUri: string;
    fileUri: string;

    constructor(private api: ApiService<any>, private ref: ChangeDetectorRef) {

        this.downloadUri = GlobalService.getEndPoints().DOWNLOAD;
        this.fileUri = this.downloadUri + this.folder + "/" + this.fileName;
        this.enabledUploadExternal = false;
        this.accept = "image/*";

    }


    ngOnInit(): void {
        console.log("upload");
        GlobalService.getNotificationEmitter().subscribe((not) => {
            if (not.event == "edit") {
                console.log("upload")
                this.fileNameOld = this.vm.model[this.ctrlName];        
                this.fileName = this.vm.model[this.ctrlName]
            }
        })

    }

    ngAfterViewChecked(): void {
        this.ref.detectChanges();
    }

    onChange(event) {

        if (event.target.files.length == 0)
            return false;

        let file: File = event.target.files[0];
        this.fileNameOld = file.name; 
        
        if (this.enabledUploadExternal) 
            return this.uploadCustom(file);
        
        return this.uploadDefault(file);
    }

    uploadCustom(event) {
        this.onChangeUploadExternal.emit(event)
        this.reset();
        return true;
    }
    uploadDefault(file: File) {

        this.api.setResource('upload').upload(file, this.folder).subscribe(result => {
            this.vm.model[this.ctrlName] = result.data[0];
            this.fileName = result.data[0]
        });
        return true;
    }

    onDelete() {
        this.api.setResource('upload').deleteUpload(this.folder, this.fileName).subscribe(() => {
            this.reset();
        });
    }

    reset() {
        this.fileUpload.nativeElement.value = '';
        this.vm.model[this.ctrlName] = null;
        this.fileName = null;
        this.fileNameOld = null;
    }

    ngOnChanges() {
        this.ref.detectChanges()
    }
}
