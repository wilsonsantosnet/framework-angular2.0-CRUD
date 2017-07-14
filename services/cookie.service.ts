import { Injectable } from '@angular/core';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class CookieService {

    public static get(key: string) {
        return Cookie.get(key);
    }

    public static add(key: string, data: any, expiresTime?: number) {
        Cookie.set(key, data, expiresTime);
    }

    public static update(key: string, data: any) {
        Cookie.delete(key);
        Cookie.set(key, data);
    }

    public static remove(key: string) {
        Cookie.delete(key);
    }

    public static reset() {
        Cookie.deleteAll();
    }

}
