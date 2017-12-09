﻿import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild } from '@angular/core';
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
              <button class="btn btn-secondary" (click)="file.click()" type="button" >Procurar</button>
              <button class='btn btn-secondary' [hidden]="!fileName" type='button' (click)='onDelete()'>Excluir</button>
            </span>
          </div>
          <br>
          <a *ngIf='fileName' href='{{downloadUri}}{{folder}}/{{fileName}}'>{{fileNameOld}}</a>
          <br>
          <img *ngIf='fileName' src='{{downloadUri}}{{folder}}/{{fileName}}' style='max-width:100%' />
          <div *ngIf='pasteArea' class='upload-component-paste-area upload-component-drop-area' id='upload-component-paste-area'>
          <p class='muted'>Arraste e solte arquivos ou cole PrintScreans de telas<p>
          </div>
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
    @Input() rename: boolean;
    @Input() pasteArea: boolean;

    fileName: string;
    fileNameOld: string;
    downloadUri: string;
    fileUri: string;

    constructor(private api: ApiService<any>, private ref: ChangeDetectorRef) {

        this.downloadUri = GlobalService.getEndPoints().DOWNLOAD;
        this.fileUri = this.downloadUri + this.folder + "/" + this.fileName;
        this.enabledUploadExternal = false;
        this.accept = "image/*";
        this.rename = true;
        this.pasteArea = false;

    }


    ngOnInit(): void {

        GlobalService.getNotificationEmitter().subscribe((not) => {
            if (not.event == "edit") {
                this.fileNameOld = this.vm.model[this.ctrlName];
                this.fileName = this.vm.model[this.ctrlName]
            }
            if (not.event == "init" || not.otherEvents.filter((event) => event == "init").length > 0) {
                this.fileNameOld = null;
                this.fileName = null;
            }
        })

        if (this.pasteArea) {

            let area = document.getElementById("upload-component-paste-area");
            area.addEventListener("paste", (e) => this.handlePaste(e));

            area.ondragover = function () { this.className = 'upload-component-paste-area'; return false; };
            area.ondrop = (e) => { this.handleDrop(e) }
        }

    }

    handleDrop(e)
    {
        e.preventDefault();
        e.dataTransfer.files
        this.uploadFileOnPaste(e.dataTransfer.files[0]);
    }
    
    handlePaste(e) {

        for (var i = 0; i < e.clipboardData.items.length; i++) {
            var item = e.clipboardData.items[i];
            this.uploadFileOnPaste(item.getAsFile());
        }
    }

    uploadFileOnPaste(file) {

        this.fileNameOld = file.name;

        if (this.enabledUploadExternal)
            this.uploadCustom(file, this.rename);
        else
            this.uploadDefault(file, this.rename);

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
            return this.uploadCustom(file, this.rename);

        return this.uploadDefault(file, this.rename);
    }

    uploadCustom(event, rename) {

        this.fileName = event.name;
        this.onChangeUploadExternal.emit(event)
        this.pasteArea = false;
        return true;
    }

    uploadDefault(file: File, rename: boolean) {

        this.api.setResource('upload').upload(file, this.folder, rename).subscribe(result => {
            this.vm.model[this.ctrlName] = result.data[0];
            this.fileName = result.data[0]
            this.pasteArea = false;
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
        this.pasteArea = true;
    }

    ngOnChanges() {
        this.ref.detectChanges()
    }
}
