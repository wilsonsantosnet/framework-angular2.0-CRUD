import { FormGroup, FormControl } from '@angular/forms';

export class ViewModel {


    constructor(init: any) {

        this.mostrarFiltros = init.mostrarFiltros;
        this.actionTitle = init.actionTitle;
        this.actionDescription = init.actionDescription;
        this.downloadUri = init.downloadUri;
        this.filterResult = init.filterResult;
        this.modelFilter = init.modelFilter;
        this.summary = init.summary;
        this.model = init.model;
        this.infos = init.infos;
        this.grid = init.grid;
        this.form = init.form;

    }

    mostrarFiltros: boolean;
    actionTitle: string;
    actionDescription: string;
    downloadUri: string;
    filterResult: any[];
    modelFilter: {};
    summary: any;
    model: {};
    infos: any;
    grid: any;
    form: FormGroup;
}





