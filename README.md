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

## multiselect-funnel
## componente que permite fazer uma pré seleção de itens de uma lista , seleciona-los e separa-los em uma segunda lista.

## C# API 4.5
```
	[ActionName("GetDataItem")]
        public async Task<HttpResponseMessage> GetDataItem([FromUri]PC_BannerFilter filters)
        {
            var result = new HttpResult<object>();

            try
            {
                var token = HelperAuth.GetHeaderToken();
                this.app = new PC_BannerApp(token);
                var data = await this.app.GetDataItem(filters);
                this.app.Dispose();
                result.Warnings = await this.app.GetDomainWarning(filters);
                result.Success(data);
                return Request.CreateResponse(result.StatusCode, result);

            }
            catch (Exception ex)
            {
                result.ReturnCustomException(ex, filters);
                return Request.CreateResponse(result.StatusCode, result);
            }

        }

```
## JS
```
var vm = {
others: "",
collectionSampleType : [
		{typeId : 1},
		{typeId : 2}
	]
}
```
## HTML

- [dataitem]="'SampleType'" -- Nome do Recurso na API (Controller com Metodod getDataItem Implementado)
- [ctrlName]="'collectionSampleType'" -- Nome da propriedade da vm onde sera adicionado os dados a vm sera a view model que sera enviada no POSt
- [vm]="vm" -- model da tela que console o componete e que sera usada para o post
- [ctrlNameItem]="'typeId'" -- nome do campo do item da collection collectionSampleType
- [fieldFilterName]="'name'" -- Campo usado para fazer o filtro do itens

```
<multiselect-funnel [dataitem]="'SampleType'" [ctrlName]="'collectionSampleType'" [vm]="vm" [ctrlNameItem]="'typeId'" [fieldFilterName]="'name'"></multiselect-funnel>
```


