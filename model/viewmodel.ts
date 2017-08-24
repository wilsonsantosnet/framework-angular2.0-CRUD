import { FormGroup, FormControl } from '@angular/forms';

export class ViewModel<T> {


    constructor(init: any) {

        this.mostrarFiltros = init.mostrarFiltros;
        this.actionTitle = init.actionTitle;
        this.actionDescription = init.actionDescription;
        this.downloadUri = init.downloadUri;
        this.filterResult = init.filterResult;
        this.modelFilter = init.modelFilter;
        this.summary = init.summary;
        this.model = init.model;
        this.details = init.details;
        this.infos = init.infos;
        this.grid = init.grid;
        this.form = init.form;
        this.masks = init.masks;

    }

    mostrarFiltros: boolean;
    actionTitle: string;
    actionDescription: string;
    downloadUri: string;
    filterResult: T[];
    modelFilter: any;
    summary: any;
    model: T;
    details: T;
    infos: any;
    grid: any;
    form: FormGroup;
    masks : any
}
