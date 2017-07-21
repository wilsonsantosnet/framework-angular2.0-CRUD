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
    private _apiDefault: string;

    constructor(private http: Http, private notificationsService: NotificationsService, private router: Router) {

        this._apiDefault = GlobalService.getEndPoints().DEFAULT
        this._enableNotifification = true;
    }

    public get(filters?: any, onlyDataResult?: boolean): Observable<T> {

        return this.getBase(this.makeBaseUrl(), filters);

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

        return this.http.delete(url,
            this.requestOptions().merge(new RequestOptions({
                search: this.makeSearchParams(data)
            })))
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

    public getDataListCustom(filters?: any): Observable<T> {
        return this.getMethodCustom('GetDataListCustom');
    }

    public getDetails(filters?: any): Observable<T> {
        return this.getMethodCustom('GetDetails');
    }

    public getDataCustom(filters?: any): Observable<T> {
        return this.getMethodCustom('GetDataCustom');
    }

    public getDataitem(filters?: any): Observable<T> {
        return this.getMethodCustom('GetDataItem', filters);
    }

    public getMethodCustom(method: string, filters?: any): Observable<T> {

        if (filters == null)
            filters = {};

        filters.AttributeBehavior = method;
        return this.getBase(this.makeResourceMore(), filters);

    }

    public enableNotification(enable: boolean) {
        this._enableNotifification = enable;
    }

    public setResource(resource: string, endpoint?: string): ApiService<T> {

        this._resource = resource;

        if (endpoint !== undefined) {
            this._apiDefault = endpoint;
        }
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
            'Authorization': "Bearer " + CacheService.get('TOKEN_AUTH', ECacheType.COOKIE)
        });

        return new RequestOptions({ headers: headers });
    }


    private makeGetCustomMethodBaseUrl(method: string): string {

        return this.makeBaseUrl() + `/${method}`;

    }

    private makeResourceMore(): string {

        return this.makeBaseUrl() + "/more";

    }

    private makeBaseUrl(): string {
        return `${this._apiDefault}/${this.getResource()}`;
    }

    private makeSearchParams(filters?: any): URLSearchParams {
        const params = new URLSearchParams();
        if (filters != null) {
            for (const key in filters) {
                if (filters.hasOwnProperty(key)) {
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
                pauseOnHover: false,
                clickToClose: false,
            }
        )
    }

    private loading(url: string, value: boolean) {
        GlobalService.operationRequesting.emit(value);
    }


}
