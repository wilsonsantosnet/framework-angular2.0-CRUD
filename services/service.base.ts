import { ViewRef_ } from "@angular/core/src/view";

export class ServiceBase {


    protected getInfoGrid(infos) {

        var list = [];
		for (let key in infos) {
			var info = infos[key];
			if (info.list == true)
				list.push({key: key, info: info});
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
}
