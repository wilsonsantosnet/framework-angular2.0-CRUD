import { Directive, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgModel } from '@angular/forms';
import { GlobalService, NotificationParameters } from "../../global.service";
declare var $: any;

@Directive({
    selector: '[editorhtml]',
    providers: [NgModel]
})

export class EditorHtmlDiretive implements OnInit {
    @Output() editorKeyup = new EventEmitter<number>();

    constructor(private el: ElementRef, private ngModel: NgModel) {
        
    }

    ngOnInit() {
        this.render();

        GlobalService.notification.subscribe((not) => {
            if (not.event == "edit") {
                let element = $(this.el.nativeElement);
                var selector = element.attr("editorhtml");
                tinymce.get(selector).getBody().innerHTML = not.data.model[selector];
                
            }
        })
    }

    render() {

        let element = $(this.el.nativeElement);

        tinymce.init({
            selector: '[editorhtml=' + element.attr("editorhtml") + ']',
            plugins: ['link', 'paste', 'table'],
            skin_url: '/assets/css/skins/lightgray',
            setup: editor => {
                editor.on('change', () => {
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
