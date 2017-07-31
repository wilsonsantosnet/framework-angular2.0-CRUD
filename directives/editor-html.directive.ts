import { Directive, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgModel } from '@angular/forms';
declare var $: any;

@Directive({
    selector: '[editorhtml]',
    providers: [NgModel]
})

export class EditorHtmlDiretive implements OnInit {
    @Input() elementId: String;
    @Output() editorKeyup = new EventEmitter<number>();

    constructor(private el: ElementRef, private ngModel: NgModel) {
        
    }

    ngOnInit() {
        this.render();
    }

    render() {

        let element = $(this.el.nativeElement);
        console.log(element.attr("editorhtml"), tinymce);

        tinymce.init({
            selector: '[editorhtml=' + element.attr("editorhtml") + ']',
            plugins: ['link', 'paste', 'table'],
            skin_url: 'assets/css/skins/lightgray',
            setup: editor => {
                editor.on('keyup', () => {
                    const content = editor.getContent();
                    this.editorKeyup.emit(content);
                  });
            }
        });
    }

    ngOnDestroy() {
        //tinymce.remove(this.editor);
    }
}