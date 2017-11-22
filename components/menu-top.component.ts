import { Component, OnInit, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'app/common/services/auth.service';

@Component({
  selector: 'app-menu-top',
  template: `
         <div class="gc-menu-top gc-menu-top-app" data-menu="menu-fixed">

            <div class="gc-menu-top__header gc-menu-top__header-app gc-menu-top__header--single-header gc-menu-top__header--single-header-app">

                <!-- gc-header-top -->
                <div class="gc-header-top gc-header-top-app">
                    <nav class="navbar navbar-toggleable navbar-inverse bg-faded d-flex justify-content-between gc-header-top-app__nav">
                        <button type="button" class="btn btn-default btn-toggler" title="Minimizar menu" data-mockup="open-single-header">
                            <span class="fa fa-bars" aria-hidden="true"></span>
                        </button>
                        <a class="navbar-brand p-2" href="#"><img src="../../assets/img/logo-CNA-big.png" alt="Seed"></a>

                        <form class="gc-header-top__search gc-header-top__search-app form-inline p-2">
                            <input class="form-control mr-sm-2" type="text" placeholder="Busca">
                            <button class="btn btn-outline-primary my-2 my-sm-0" type="submit"><span class="fa fa-search"></span></button>
                        </form>
                        <hr>
                    <!-- gc-profile -->
                        <div class="gc-profile gc-profile-app d-flex">
                            <div class="gc-profile__avatar gc-profile__avatar-app">
                                <div [ngStyle]="{'background-image': san(vm.avatar), 'width': '4rem', 'height': '4rem','background-size': 'cover','background-position': 'center','border-radius': '50%', 'position': 'relative', 'top': '-1.5em' }"></div>
                            </div>
                            <div class="gc-profile__title gc-profile__title-app">
                                <a href="#">
                                    <h3 class="gc-profile__name gc-profile__name-app">Ola, <b>{{vm.userName}}</b></h3>
                                    <p class="gc-profile__infos"><b>{{vm.userRole}}</b> </p>
                                </a>
                            </div>
                        </div>
                    <!-- /gc-profile -->
                    </nav>
                </div>
                <!-- /gc-header-top -->
            </div>
            <div class="gc-menu-top__list">
                <ul class="gc-menu-top__listen gc-menu-top__listen-app list-unstyled">
                    <li *ngFor="let item of vm.menu">
                        <a *ngIf="!item.SubMenu || item.SubMenu.length == 0" routerLink="{{item.Value}}">
                            <span class="gc-menu__list__icon {{item.Icon}}"></span>
                            <span class="gc-menu-top__list__text">{{item.Name}}</span>
                        </a>
                        <a *ngIf="item.SubMenu && item.SubMenu.length !== 0">
                            <span class="gc-menu__list__icon {{item.Icon}}"></span>                        
                            <span class="gc-menu-top__list__text">{{item.Name}}</span>
                        </a>
                        <ul class="gc-menu-top__submenu" *ngIf="item.SubMenu && item.SubMenu.length !== 0">
                            <li *ngFor="let subItem of item.SubMenu">
                                <a routerLink="{{subItem.Value}}">
                                    <span class="gc-menu__list__icon {{item.Icon}}"></span>
                                    <span class="gc-menu__list__text">{{subItem.Name}}</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>`,

})
export class MenuTopComponent implements OnInit {
    
    constructor (private sanitizer: DomSanitizer, private authService:AuthService) { }   

    @Input() vm: any;

    ngOnInit() {

    }

    san(fileName) {
        console.log("fileName", fileName);
        var _url = "url('" + this.vm.downloadUri + "/assinante/" + (fileName || 'vazio.png') + "')";
        console.log("url", _url);
        return this.sanitizer.sanitize(SecurityContext.HTML, _url)
    }
    onLogout(e) {
        e.preventDefault();
        this.authService.logout();
    }

}
