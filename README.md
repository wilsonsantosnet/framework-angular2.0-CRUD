Framework  Angular 2.0 

# GRID

## JS
```
var vm = new ViewModel({
    
      filterResult: [
        { Nome: 'teste', id: 10 },
        { Nome: 'teste', id: 11 },
        { Nome: 'teste', id: 12 },
        { Nome: 'teste', id: 13 },
        { Nome: 'teste', id: 14 },
        { Nome: 'teste', id: 10 },
        { Nome: 'teste', id: 10 },
        { Nome: 'teste', id: 10 },
        { Nome: 'teste', id: 10 },
      ],
 
      grid: [
        { key: 'chave1', info: { label: 'valor1', type: "string", aux: "" } },
        { key: 'id', info: { label: 'codigo', type: "int", aux: "" } }
      ],
 
    });
```
## HTML

```
<make-grid [(vm)]="vm" [checkboxProperty]="'id'" [showDelete]="false" [showEdit]="false" [showAction]="false" [showCheckbox]="true" [showDetails]="false" [showPrint]="false" (edit)="onEdit($event)"></make-grid>
```

