import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'app/global.service';

@Component({
    selector: 'loading',
    template: `
    <div class="loader" [hidden]="!requesting">
        <img src="../../../assets/img/loader.gif" alt="carregando..." />
    </div>`,
    styles: [`
    .loader {
      position: fixed;
      z-index: 9999;
      background-color: #fff;
      opacity: .90;
      filter: alpha(opacity=90);
      width: 100%;
      height: 100%; }

    .loader img {
      display: block;
      margin: 200px auto; }
  `]
})
export class LoadingComponent implements OnInit {


    requesting: boolean;

    ngOnInit() {
        GlobalService.operationRequesting.subscribe(_requesting => {

            this.requesting = _requesting;
        })
    }
    

    constructor() { }

}
