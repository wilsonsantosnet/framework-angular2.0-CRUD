export class ComponentBase 
{
    protected _showContainerCreate: Boolean;
    protected _showContainerEdit: Boolean;
    protected _showContainerDetails: Boolean;
    protected _showContainerFilters: Boolean;

    constructor() {
        this.hideComponents();
    }

    hideComponents(): void {
        this._showContainerCreate = false;
        this._showContainerEdit = false;
        this._showContainerDetails = false;
    }

    hideContainerCreate() {
        this._showContainerCreate = false;
    }

    hideContainerEdit() {
        this._showContainerEdit = false;
    }

    showContainerCreate() {
        this._showContainerCreate = true;
    }

    showContainerEdit() {
        this._showContainerEdit = true;
    }

    showContainerDetails() {
        this._showContainerDetails = true;
    }

    showContainerFilters() {
        this._showContainerFilters = true;
    }

}