import { Http, RequestOptions, Response, Headers, URLSearchParams } from '@angular/http';
import { Router } from '@angular/router';
import { Inject, Injectable, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';

import { ECacheType } from 'app/common/type-cache.enum';
import { GlobalService } from 'app/global.service';
import { CacheService } from 'app/common/services/cache.service';
import { NotificationsService } from 'angular2-notifications';

@Injectable()
export class ApiService<T> {

    protected _resource: string;
    private _enableNotifification: boolean;
    private _enableLoading: boolean;
    private _apiDefault: string;
    private _cacheType: ECacheType;

    constructor(private http: Http, private notificationsService: NotificationsService, private router: Router) {

        this._apiDefault = GlobalService.getEndPoints().DEFAULT
        this._enableNotifification = true;
        this._enableLoading = true;
        this._cacheType = GlobalService.getAuthSettings().CACHE_TYPE;
    }

    public get(filters?: any, onlyDataResult?: boolean): Observable<T> {

        return this.getBase(this.makeBaseUrl(), filters);

    }

    public uploadCustom(formData: FormData, folder: string, url?: string): Observable<T> {


        let _url = url || this.makeBaseUrl();

        this.loading(_url, true);
        let headers = new Headers();
        headers.append('Authorization', "Bearer " + CacheService.get('TOKEN_AUTH', this._cacheType))
        console.log("uploadCustom", headers)
        let options = new RequestOptions({ headers: headers });

        return this.http.post(_url,
            formData,
            options)
            .map(res => {
                this.notification(res);
                return this.successResult(res);
            })
            .catch(error => {
                return this.errorResult(error);
            })
            .finally(() => {
                this.loading(_url, false);
            });
    }

    public upload(file: File, folder: string, rename: boolean): Observable<T> {

        let formData: FormData = new FormData();
        formData.append('files', file, file.name);
        formData.append('folder', folder);
        formData.append('rename', rename ? "true" : "false");

        let url = this.makeResourceUpload();
        return this.uploadCustom(formData, folder, url);


    }

    public deleteUpload(folder: string, fileName: string): Observable<T> {


        let url = this.makeResourceDeleteUpload(folder, fileName);
        this.loading(url, true);

        return this.http.delete(url,
            this.requestOptions())
            .map(res => {
                this.notification(res);
                return this.successResult(res);
            })
            .catch(error => {
                return this.errorResult(error);
            })
            .finally(() => {
                this.loading(url, false);
            });
    }

    public post(data: any): Observable<T> {

        let url = this.makeBaseUrl();
        this.loading(url, true);

        return this.http.post(this.makeBaseUrl(),
            JSON.stringify(data),
            this.requestOptions())
            .map(res => {
                this.notification(res);
                return this.successResult(res);
            })
            .catch(error => {
                return this.errorResult(error);
            })
            .finally(() => {
                this.loading(url, false);
            });
    }

    public delete(data: any): Observable<T> {

        let url = this.makeBaseUrl();
        this.loading(url, true);
        
        var ro = this.requestOptions().merge(new RequestOptions({
            search: this.makeSearchParams(data)
        }));

        console.log("delete", data, url, ro);

        return this.http.delete(url, ro)
            .map(res => {
                console.log("delete map");
                this.notification(res);
                return this.successResult(res);
            })
            .catch(error => {
                console.log("delete Error", error);
                return this.errorResult(error);
            })
            .finally(() => {
                console.log("delete finally");
                this.loading(url, false);
            });
    }

    public put(data: any): Observable<T> {

        let url = this.makeBaseUrl();
        this.loading(url, true);

        return this.http.put(url,
            JSON.stringify(data),
            this.requestOptions())
            .map(res => {
                this.notification(res);
                return this.successResult(res);
            })
            .catch(error => {
                return this.errorResult(error);
            })
            .finally(() => {
                this.loading(url, false);
            });
    }

    public export(filters?: any): Observable<T> {

        if (filters == null) filters = {};
        filters.FilterBehavior = 'Export';
        var url = this.makeResourceMore();

        this.loading(url, true);

        return this.http.get(url,
            this.requestOptions().merge(new RequestOptions({
                search: this.makeSearchParams(filters)
            })))
            .map(res => {
                return res;
            })
            .catch(error => {
                return this.errorResult(error);
            })
            .finally(() => {
                this.loading(url, false);
            });
    }

    public getDataListCustom(filters?: any): Observable<T> {
        return this.getMethodCustom('GetDataListCustom', filters);
    }

    public getDetails(filters?: any): Observable<T> {
        return this.getMethodCustom('GetDetails', filters);
    }

    public getDataCustom(filters?: any): Observable<T> {
        return this.getMethodCustom('GetDataCustom', filters);
    }

    public getDataListCustomPaging(filters?: any): Observable<T> {
        return this.getMethodCustom('GetDataListCustomPaging', filters);
    }

    public getFile(file: string): Observable<T> {

        return this.http.get(file)
            .map((res: Response) => {
                return res.json()
            })

    }

    public getDataitem(filters?: any): Observable<T> {

        this._enableLoading = false;
        let result = this.getMethodCustom('GetDataItem', filters);
        return result;
    }

    public getMethodCustom(method: string, filters?: any): Observable<T> {

        if (filters == null)
            filters = {};

        filters.FilterBehavior = method;
        return this.getBase(this.makeResourceMore(), filters);

    }

    public enableNotification(enable: boolean) {
        this._enableNotifification = enable;
    }

    public enableLoading(enable: boolean) {
        this._enableLoading = enable;
    }

    public setResource(resource: string, endpoint?: string): ApiService<T> {

        this._resource = resource;
        this._apiDefault = GlobalService.getEndPoints().DEFAULT;

        if (endpoint)
            this._apiDefault = endpoint;

        return this;
    }

    public getResource(): string {

        if (this._resource == null) {
            throw new Error('resource não definido');
        }

        return this._resource;
    }

    public requestOptions(): RequestOptions {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + CacheService.get('TOKEN_AUTH', this._cacheType)
        });

        return new RequestOptions({ headers: headers });
    }


    private makeGetCustomMethodBaseUrl(method: string): string {

        return this.makeBaseUrl() + `/${method}`;

    }

    private makeResourceMore(): string {

        return this.makeBaseUrl() + "/more";

    }

    private makeResourceUpload(): string {

        return this.makeBaseUrl("document");

    }

    private makeResourceDeleteUpload(folder: string, fileName: string): string {

        return this.makeBaseUrl("document") + "/" + folder + "/" + fileName;
    }

    private makeBaseUrl(subDominio?: string): string {
        let url = ``;
        if (subDominio)
            url = `${this._apiDefault}/${subDominio}/${this.getResource()}`;
        else
            url = `${this._apiDefault}/${this.getResource()}`;

        return url;
    }

    private makeSearchParams(filters?: any): URLSearchParams {
        const params = new URLSearchParams();
        if (filters != null) {
            for (const key in filters) {

                if (key.toLowerCase().startsWith("collection")) {
                    if (filters[key]) {
                        let values = filters[key].toString().split(",");
                        for (let value in values) {
                            params.append(key, values[value]);
                        }
                    }
                }
                else if (filters.hasOwnProperty(key)) {
                    params.set(key, filters[key]);
                }
            }
        }

        return params;
    }

    private getBase(url: string, filters?: any, onlyDataResult?: boolean): Observable<T> {

        if (filters != null && filters.id != null) {
            url += '/' + filters.id;
        }

        this.loading(url, true);

        return this.http.get(url,
            this.requestOptions().merge(new RequestOptions({
                search: this.makeSearchParams(filters)
            })))
            .map(res => {
                return this.successResult(res);
            })
            .catch(error => {
                return this.errorResult(error);
            })
            .finally(() => {
                this.loading(url, false);
            });
    }

    private successResult(response: Response): Observable<T> {

        let _response = response.json();
        this._enableLoading = true;
        return _response;
    }

    private errorResult(response: Response): Observable<T> {

        if (response.status == 401 || response.status == 403)
            this.router.navigate(["/login"]);

        let _response = response.json();
        let erros = "ocorreu um erro!";
        if (_response.result != null) {
            erros = _response.result.errors[0];
        }

        this.notificationsService.error(
            'Erro',
            erros,
            {
                timeOut: 5000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: false,
            }
        )

        return Observable.throw(erros);
    }



    private notification(response) {

        let _response = response.json();

        if (_response.warning) {
            if (_response.warning.warnings) {
                for (var index in _response.warning.warnings) {
                    this.notificationsService.warn(
                        'Atenção',
                        _response.warning.warnings[index],
                        {
                            timeOut: 3000,
                            showProgressBar: true,
                            pauseOnHover: true,
                            clickToClose: false,
                        }
                    )
                }
            }

        }
        else {

            let msg = "Operação realizado com sucesso!";
            if (_response.result != null) {
                msg = _response.result.message;
            }

            this.notificationsService.success(
                'Sucesso',
                msg,
                {
                    timeOut: 1000,
                    showProgressBar: true,
                    pauseOnHover: true,
                    clickToClose: false,
                }
            )
        }
    }

    private loading(url: string, value: boolean) {
        if (this._enableLoading || value == false)
            GlobalService.getOperationRequestingEmitter().emit(value);
    }
}
