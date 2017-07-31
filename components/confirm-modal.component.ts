import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { GlobalService } from '../../global.service';

@Component({
    selector: 'confirm-modal',
    template: `
              <div bsModal #_confirmModal="bs-modal" class="gc-modal modal fade">
                <div class="modal-dialog modal-lg">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h3 class="modal-title">Confirmação</h3>
                    </div>
                    <div class="card">
                      <h5 class="card-block">
                        {{ vm.messageConfirmation }}
                      </h5>
                    </div>
                    <div class="modal-footer">
                      <button class="btn btn-danger" type="button" (click)="onConfimationYes()">Sim</button>
                      <button class="btn btn-default" type="button" (click)="onCancel()">Cancelar</button>
                    </div>
                  </div>
                </div>
              </div>
            ` 
})
export class ConfirmModalComponent implements OnInit {


    
    @ViewChild('_confirmModal') private _confirmModal: ModalDirective;

    vm: any;

    _openationConfimationYes: any;
    _operationService: any;
    _operationVM: any;

    constructor() {
        this.vm = {};
        this.vm.messageConfirmation = "tem certeza que deseja Executar Essa operação?"
    }


    ngOnInit() {

        
        GlobalService.operationExecuted.subscribe((result) => {
            if (result.selector == "confirm-modal") {
                this.vm.messageConfirmation = result.message || this.vm.messageConfirmation;
                this.show();
                this._openationConfimationYes = result.operation;
                this._operationService = result.service;
                this._operationVM = result.vm;
            };
        })

    }

    show() {
        this._confirmModal.show();
    }

    onConfimationYes() {
        this._openationConfimationYes(this._operationService, this._operationVM);
        this._confirmModal.hide();
    }

    onCancel() {
        this._confirmModal.hide();
    }

}
