import { ViewRef_ } from "@angular/core/src/view";
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { GlobalServiceCulture, Translated, TranslatedField } from '../../global.service.culture';
import { MainService } from '../../main/main.service';

export class ServiceBase {

      
    protected getInfoGrid(infos) {
        var list = [];
        for (let key in infos) {
            var info = infos[key];
            if (info.list == true)
                list.push({ key: key, info: info });
        }
        return list;
    }

    protected objectToArray(infos) {

        var list = [];
        for (let key in infos) {
            var info = infos[key];
            list.push(info);
        }
        return list;
    }

    public pagingConfig(modelFilter, pageConfig) {

        return Object.assign(modelFilter, {
            PageIndex: pageConfig.PageIndex,
            PageSize: pageConfig.PageSize,
            IsPagination: true
        });

    }

    public orderByConfig(modelFilter, order) {

        return  Object.assign(modelFilter, {
            OrderByType: order.asc ? "OrderBy" : "OrderByDescending",
            OrderFields: [order.field]
        });

    }

    public detectChanges(changeDetector: any) {

        changeDetector.detach();

        setInterval(() => {
        	changeDetector.reattach();

        	if (changeDetector && !(changeDetector as ViewRef_).destroyed) {
        		changeDetector.detectChanges();
        	}

        	changeDetector.detach();
        }, 250);
    }

    public masksConfig() {

        let decimalMask = createNumberMask({
            prefix: '',
            allowDecimal: true,
            includeThousandsSeparator: false,
        })

        return {
            maskCEP: [/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
            maskCPF: [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/],
            maskCNPJ: [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/],
            maskTelefone: ['(', /\d/, /\d/, ')', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, /\d/],
            maskHorario: [/\d/, /\d/, ':', /\d/, /\d/],
            maskDecimal: decimalMask
        }

    }

    public tagTransformToShow(value) {
        var tagItems = value ? value.split(',') : value;
        var tags = [];
        if (tagItems) {
            for (var i = 0; i < tagItems.length; i++) {
                tags.push({
                    display: tagItems[i],
                    value: tagItems[i],
                    readonly: true
                })
            }
        }
        return tags;
    }

    public tagTransformToSave(value)
    {
        if (value) {
            return value.map((item) => {
                return item.value
            }).toString();
        }
        return value;
    }
    
}
