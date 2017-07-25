import { Directive, ElementRef, EventEmitter, Input } from '@angular/core';
import { NgModel } from '@angular/forms';
declare var $: any;

@Directive({
    selector: '[editorhtml]',
    providers: [NgModel]
})

export class EditorHtmlDiretive {
    @Input() elementId: String;

    constructor(private el: ElementRef, private ngModel: NgModel) {
        this.render();
    }


    render() {

        let element = $(this.el.nativeElement);

        tinymce.init({
            selector: '[editorhtml=' + element.attr("editorhtml") + ']',
            plugins: ['link', 'paste', 'table'],
            skin_url: 'assets/skins/lightgray',
            setup: editor => {
                editor.on('keyup', () => {
                    const content = editor.getContent();
                    // this.onEditorKeyup.emit(content);
                    this.ngModel.update.emit(content);
                });
            }
        });
    }

    ngOnDestroy() {
        //tinymce.remove(this.editor);
    }
}