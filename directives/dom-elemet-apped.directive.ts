import { Directive, ElementRef, Renderer, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';

import { ApiService } from '../services/api.service';
import { GlobalService } from '../../global.service'


@Directive({
    selector: '[dom-element-append]',
    providers: [NgModel]
})

export class DomElemetAppendDirective implements OnInit {

    @Input() dataitem: any[];

    constructor(private _elemetRef: ElementRef, private _renderer: Renderer, private api: ApiService<any>, private ngModel: NgModel) {

    }

    ngOnInit() {

        this.renderTree(this.dataitem);
    }

    renderTree(tree : any[]) {
        for (var item in tree) {
            if (tree[item].tree) {
                this.renderTree(tree[item].tree);
            }
            var result = this._elemetRef.nativeElement.insertAdjacentHTML("beforeend", "<li>" + tree[item].name + "</li>");
            console.log("insertAdjacentHTML", result);
        }
    }
}
