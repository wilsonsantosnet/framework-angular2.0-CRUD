import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination'
import { ModalModule } from 'ngx-bootstrap/modal';

import { BindCustomComponent } from './components/bind-custom.component';
import { MakePaginationComponent } from 'app/common/components/pagination.component';
import { ConfirmModalComponent } from 'app/common/components/confirm-modal.component';
import { DataSourceDirective } from './directives/select-datasource.directive';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PaginationModule.forRoot(),
        ModalModule.forRoot(),
    ],
    declarations: [
        BindCustomComponent,
        MakePaginationComponent,
        ConfirmModalComponent,
        DataSourceDirective
    ],
    providers: [],
    exports: [BindCustomComponent,
        MakePaginationComponent,
        ConfirmModalComponent, DataSourceDirective]
})
export class CommonSharedModule {

}
