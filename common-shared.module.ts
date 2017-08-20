﻿import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination'
import { ModalModule } from 'ngx-bootstrap/modal';

import { BindCustomComponent } from './components/bind-custom.component';
import { MakeGridComponent } from './components/grid.component'
import { MakePaginationComponent } from 'app/common/components/pagination.component';
import { ConfirmModalComponent } from 'app/common/components/confirm-modal.component';
import { CepComponent } from 'app/common/components/cep.component';
import { UploadCustomComponent } from 'app/common/components/upload-file.component';
import { MultiSelectComponent } from 'app/common/components/multiselect.component';

import { DataSourceDirective } from './directives/select-datasource.directive';
import { MaskInputDirective } from './directives/mask-input.directive';
import { DateDirective } from './directives/date.directive';
import { EditorHtmlDiretive } from './directives/editor-html.directive';




@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        ModalModule.forRoot(),
        FormsModule,
    ],
    declarations: [
        BindCustomComponent,
        MakePaginationComponent,
        ConfirmModalComponent,
        DataSourceDirective,
        MaskInputDirective,
        DateDirective,
        EditorHtmlDiretive,
        MakeGridComponent,
        CepComponent,
        UploadCustomComponent,
        MultiSelectComponent
    ],
    providers: [
    ],
    exports: [
        BindCustomComponent,
        MakePaginationComponent,
        ConfirmModalComponent,
        MakeGridComponent,
        CepComponent,
        UploadCustomComponent,
        DataSourceDirective,
        MaskInputDirective,
        DateDirective,
        EditorHtmlDiretive,
        MultiSelectComponent]
})
export class CommonSharedModule {

}
