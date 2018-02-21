Framework  Angular 2.0 

# GRID

## JS
```
var vm = new ViewModel({
    
      filterResult: [
        { nome: 'teste', id: 10 },
        { nome: 'teste', id: 11 },
        { nome: 'teste', id: 12 },
        { nome: 'teste', id: 13 },
        { nome: 'teste', id: 14 },
        { nome: 'teste', id: 15 },
        { nome: 'teste', id: 16 },
        { nome: 'teste', id: 17 },
        { nome: 'teste', id: 18 },
      ],
 
      grid: [
        { key: 'nome', info: { label: 'valor1', type: "string" } },
        { key: 'id', info: { label: 'codigo', type: "int" } }
      ],
 
    });
```
## HTML

```
<make-grid [(vm)]="vm" [checkboxProperty]="'id'" [showDelete]="false" [showEdit]="false" [showAction]="false" [showCheckbox]="true" [showDetails]="false" [showPrint]="false" (edit)="onEdit($event)"></make-grid>
```

# TAG 

## permite utilizar uma string separada por virgulas como tags

## JS
```
var model = "valor1,valor2,valor3"

```
## HTML
```
<tag-custom [ngModel] ="model" (tagChange)="model=$event"></tag-custom>
```

### DEPENDECY

```
npm install ngx-chips@1.5.9
service.base.ts 

```

### MODULE
```
import { TagInputModule } from 'ngx-chips';

@NgModule({
    imports: [
    
        TagInputModule,
        
    ]]
})
```

