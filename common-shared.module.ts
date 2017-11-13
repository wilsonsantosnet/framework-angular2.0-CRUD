import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination'
import { ModalModule } from 'ngx-bootstrap/modal';
import { TagInputModule } from 'ngx-chips';
import { TextMaskModule } from 'angular2-text-mask';

import { DataSourceDirective } from './directives/select-datasource.directive';
import { MaskInputDirective } from './directives/mask-input.directive';
import { DateDirective } from './directives/date.directive';
import { DateTimeDirective } from './directives/date.time.directive';
import { BindCustomComponent } from './components/bind-custom.component';
import { MakeGridComponent } from './components/grid.component'
import { MakePaginationComponent } from 'app/common/components/pagination.component';
import { CepComponent } from 'app/common/components/cep.component';
import { TreeViewComponent } from 'app/common/components/tree-view.component';
import { UploadCustomComponent } from 'app/common/components/upload-file.component';
import { MultiSelectComponent } from 'app/common/components/multiselect.component';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { MaskFormatPipe } from './pipes/mask.pipe';
import { EditorHtmlDiretive } from './directives/editor-html.directive';
import { TagCustomComponent } from 'app/common/components/tag.component';
import { Select2Component } from 'angular-select2-component';
import { SelectCustomComponent } from 'app/common/components/select.component';
import { DomElemetAppendDirective } from 'app/common/directives/dom-elemet-apped.directive';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        ModalModule.forRoot(),
        FormsModule,
        TextMaskModule,
        TagInputModule,
    ],
    declarations: [
        BindCustomComponent,
        MakePaginationComponent,
        DataSourceDirective,
        MaskInputDirective,
        DateDirective,
        DateTimeDirective,
        EditorHtmlDiretive,
        DomElemetAppendDirective,
        MakeGridComponent,
        CepComponent,
        TreeViewComponent,
        UploadCustomComponent,
        MultiSelectComponent,
        DateFormatPipe,
        MaskFormatPipe,
        TagCustomComponent,
        SelectCustomComponent,
        Select2Component
    ],
    providers: [
    ],
    exports: [
        BindCustomComponent,
        MakePaginationComponent,
        MakeGridComponent,
        CepComponent,
        TreeViewComponent,
        UploadCustomComponent,
        DataSourceDirective,
        MaskInputDirective,
        DateDirective,
        DateTimeDirective,
        EditorHtmlDiretive,
        DomElemetAppendDirective,
        MultiSelectComponent,
        TextMaskModule,
        TagInputModule,
        TagCustomComponent,
        SelectCustomComponent
	]
})
export class CommonSharedModule {

}
