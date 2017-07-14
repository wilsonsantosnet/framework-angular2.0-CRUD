import { Http, RequestOptions, Response, Headers, URLSearchParams } from '@angular/http';
import { Inject, Injectable, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';


import { ECacheType } from 'app/common/type-cache.enum';
import { GlobalVariableService } from 'app/globalvariable.service';
import { CacheService } from 'app/common/services/cache.service';

@Injectable()
export class ApiService<T> {

    protected _resource: string;
    private _enableNotifification: boolean;
    private _apiDefault: string;

    constructor(private http: Http) {

        this._apiDefault = GlobalVariableService.GetEndPoints().DEFAULT
        this._enableNotifification = true;
    }

    public get(filters?: any, onlyDataResult?: boolean): Observable<T> {

        return this.getBase(this.makeBaseUrl(), filters);

    }

    public post(data: any): Observable<T> {

        GlobalVariableService.GetRequestControl().Set(true);

        return this.http.post(this.makeBaseUrl(),
            JSON.stringify(data),
            this.requestOptions())
            .map(res => {
                return this.successResult(res);
            })
            .catch(error => {
                return this.errorResult(error);
            })
            .finally(() => {
                GlobalVariableService.GetRequestControl().Set(false);
            });
    }

    public delete(data: any): Observable<T> {

        GlobalVariableService.GetRequestControl().Set(true);

        return this.http.delete(this.makeBaseUrl(),
            this.requestOptions().merge(new RequestOptions({
                search: this.makeSearchParams(data)
            })))
            .map(res => {
                return this.successResult(res);
            })
            .catch(error => {
                return this.errorResult(error);
            })
            .finally(() => {
                GlobalVariableService.GetRequestControl().Set(false);
            });
    }

    public put(data: any): Observable<T> {

        GlobalVariableService.GetRequestControl().Set(true);

        return this.http.put(this.makeBaseUrl(),
            JSON.stringify(data),
            this.requestOptions())
            .map(res => {
                return this.successResult(res);
            })
            .catch(error => {
                return this.errorResult(error);
            })
            .finally(() => {
                GlobalVariableService.GetRequestControl().Set(false);
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
        return this.getMethodCustom('GetDataItem');
    }

    public getMethodCustom(method: string, filters?: any): Observable<T> {

        if (filters == null) {
            filters = {};
        }

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

        if (filters != null && filters.Id != null) {
            url += '/' + filters.Id;
        }

        GlobalVariableService.GetRequestControl().Set(true)

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
                GlobalVariableService.GetRequestControl().Set(false);
            });
    }

    private successResult(res: Response): Observable<T> {
        return res.json();
    }

    private errorResult(error: Response): Observable<T> {

        //if (error.status == 401 || error.status == 403)
        //    window.location.href = "/login";

        let err = error.json();
        return Observable.throw(err);
    }

    private requestOptions(): RequestOptions {
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + CacheService.get('TOKEN_AUTH', ECacheType.COOKIE)
        });

        return new RequestOptions({ headers: headers });
    }



}
