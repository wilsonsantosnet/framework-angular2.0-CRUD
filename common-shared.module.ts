import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination'
import { ModalModule } from 'ngx-bootstrap/modal';

import { BindCustomComponent } from './components/bind-custom.component';
import { MakeGridComponent } from './components/grid.component'
import { MakePaginationComponent } from 'app/common/components/pagination.component';

import { CepComponent } from 'app/common/components/cep.component';
import { UploadCustomComponent } from 'app/common/components/upload-file.component';
import { MultiSelectComponent } from 'app/common/components/multiselect.component';

import { DateFormatPipe } from './pipes/date-format.pipe';
import { MaskFormatPipe } from './pipes/mask.pipe';

import { DataSourceDirective } from './directives/select-datasource.directive';
import { MaskInputDirective } from './directives/mask-input.directive';
import { DateDirective } from './directives/date.directive';
import { DateTimeDirective } from './directives/date.time.directive';
import { EditorHtmlDiretive } from './directives/editor-html.directive';

import { TextMaskModule } from 'angular2-text-mask';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        ModalModule.forRoot(),
        FormsModule,
        TextMaskModule
    ],
    declarations: [
        BindCustomComponent,
        MakePaginationComponent,
        DataSourceDirective,
        MaskInputDirective,
        DateDirective,
        DateTimeDirective,
        EditorHtmlDiretive,
        MakeGridComponent,
        CepComponent,
        UploadCustomComponent,
        MultiSelectComponent,
        DateFormatPipe,
        MaskFormatPipe
    ],
    providers: [
    ],
    exports: [
        BindCustomComponent,
        MakePaginationComponent,
        MakeGridComponent,
        CepComponent,
        UploadCustomComponent,
        DataSourceDirective,
        MaskInputDirective,
        DateDirective,
        DateTimeDirective,
        EditorHtmlDiretive,
        MultiSelectComponent,
		TextMaskModule
	]
})
export class CommonSharedModule {

}
