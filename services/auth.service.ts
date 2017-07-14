import { Injectable } from '@angular/core';
import { Router, NavigationCancel } from '@angular/router';
import { URLSearchParams, } from '@angular/http';

import { ApiService } from 'app/common/services/api.service';
import { ECacheType } from 'app/common/type-cache.enum';
import { GlobalVariableService } from 'app/globalvariable.service';
import { CacheService } from 'app/common/services/cache.service';

@Injectable()
export class AuthService {



    private readonly _nameToken: string;
    private readonly _nameEndPointAuthApi: string;
    private readonly _typeLogin: string;
    private readonly _authorizationUrl: string;
    private readonly _client_id: string;
    private readonly _redirect_uri: string;
    private readonly _response_type: string;
    private readonly _scope: string;

    constructor(private apiAuth: ApiService<any>, private api: ApiService<any>, private router: Router) {



        this._nameToken = "TOKEN_AUTH";
        this._nameEndPointAuthApi = "AUTHAPI";
        this._typeLogin = "SSO";
        this._authorizationUrl = GlobalVariableService.GetEndPoints().AUTH + '/connect/authorize';
        this._client_id = 'Target-spa-v2';
        this._redirect_uri = GlobalVariableService.GetEndPoints().APP;
        this._response_type = "token";
        this._scope = "ssosa";


    }

    public loginResourceOwner(email, password, reload = false) {

        this.apiAuth.setResource("auth", GlobalVariableService.GetEndPoints().AUTHAPI).post({

            ClientId: this._client_id,
            ClientSecret: "******",
            Scope: "openid profile ssosa",
            User: email,
            Password: password

        }).subscribe(data => {

            CacheService.add(this._nameToken, data.Data.Token, ECacheType.COOKIE, 0.1);

            window.location.href = this.makeUrl('/Home');

            if (reload)
                window.location.reload();

        }, err => { });

        this._typeLogin;
    }

    public loginSso() {


          
        let state = Date.now() + "" + Math.random();
        localStorage["state"] = state;

        console.log("<<<<<< loginSso >>>>>", state, localStorage["state"]);

        var url =
            this._authorizationUrl + "?" +
            "client_id=" + encodeURI(this._client_id) + "&" +
            "redirect_uri=" + encodeURI(this._redirect_uri) + "&" +
            "response_type=" + encodeURI(this._response_type) + "&" +
            "scope=" + encodeURI(this._scope) + "&" +
            "state=" + encodeURI(state);

        window.location.href = url;


        return this._typeLogin;

    }

    public getTypeLogin() {
        return this._typeLogin;
    }

    public logout() {

        this._reset();

        if (this._typeLogin == "SSO") {
            var authorizationUrl = GlobalVariableService.GetEndPoints().AUTH + 'account/logout?returnUrl=' + GlobalVariableService.GetEndPoints().APP;
            window.location.href = authorizationUrl;
        }
        else {
            window.location.href = this.makeUrl('/Login');
        }
    }

    public processTokenCallback() {

        if (window.location.href.indexOf("access_token") > -1)
        {

            let hash = window.location.hash.substr(1);

            let result = hash.split('&').reduce(function (result, item) {
                let parts = item.split('=');
                result[parts[0]] = parts[1];
                return result;
            }, {}) as any;

            console.log("processTokenCallback", result);

            if (!result.error) {
                if (result.state !== localStorage["state"]) {
                    console.log("<<<<< invalid state >>>>>>", result.state, localStorage["state"]);
                    localStorage.removeItem("state");
                    this.router.navigate(["/login"]);
                }
                else {
                    console.log("<<<<< VALID STATE >>>>>>", result.state, localStorage["state"]);
                    console.log("<<<<< VALID STATE >>>>>>", result.access_token);
                    localStorage.removeItem("state");
                    this._acceptlogin(result.access_token, false)
                }
            }
        }

    }

    public menu(callback) {

        this.api.setResource('CurrentUser').get().subscribe(data => {
            callback(data)
        });

    }

    public isAuthenticated(): boolean {
        const token = CacheService.get(this._nameToken, ECacheType.COOKIE);
        return token !== null;
    }

    private _acceptlogin(token, reload) {

        console.log("<<<<<<< _acceptlogin >>>>>>>>>>", token)
        CacheService.add(this._nameToken, token, ECacheType.COOKIE, 0.1);

        this.router.navigate(["/home"]);

        if (reload)
            window.location.reload();
    }

    private _reset() {
        CacheService.reset();
    }

    private makeUrl(url, noCache = false) {

        if (noCache)
            return url;

        return url + '?v=' + Math.random();
    }

}
