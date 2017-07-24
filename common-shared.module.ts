import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PaginationModule } from 'ngx-bootstrap/pagination'
import { ModalModule } from 'ngx-bootstrap/modal';

import { BindCustomComponent } from './components/bind-custom.component';
import { MakeGridComponent } from './components/grid/grid.component'
import { MakePaginationComponent } from 'app/common/components/pagination.component';
import { ConfirmModalComponent } from 'app/common/components/confirm-modal.component';
import { DataSourceDirective } from './directives/select-datasource.directive';
import { MaskInputDirective } from './directives/mask-input.directive';


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
        DataSourceDirective,
        MaskInputDirective,
        MakeGridComponent
    ],
    providers: [],
    exports: [
        BindCustomComponent,
        MakePaginationComponent,
        ConfirmModalComponent,
        DataSourceDirective,
        MaskInputDirective,
        MakeGridComponent]
})
export class CommonSharedModule {

}
