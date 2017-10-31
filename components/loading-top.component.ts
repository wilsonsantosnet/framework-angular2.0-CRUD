import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/global.service';

@Component({
    selector: 'loadingTop',
    template: `
    <div class="loader" [hidden]="!requesting">
        <img src="../../../assets/img/loader.gif" alt="carregando..." />
    </div>`,
    styles: [`
    .loader {
      opacity: .90;
      filter: alpha(opacity=90);
      }

    .loader img {
      width: 160px;
      heigth: 30px;
      margin: 10px;
     }
  `]
})
export class LoadingTopComponent implements OnInit {


    requesting: boolean;

    ngOnInit() {
        GlobalService.getOperationRequestingEmitter().subscribe(_requesting => {

            this.requesting = _requesting;
        })
    }
    

    constructor() { }

}
