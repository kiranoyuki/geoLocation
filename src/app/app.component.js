"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var http_1 = require("@angular/http");
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
    }
    AppComponent.prototype.getState = function () {
        var _this = this;
        this.requestState().then(function (data) {
            _this.states = data;
        });
    };
    AppComponent.prototype.requestState = function () {
        var _this = this;
        return (new Promise(function (resolve, reject) {
            var params = new http_1.URLSearchParams();
            var url = "/api/states";
            params.set("latitude", _this.latitude.toString());
            params.set("longitude", _this.longitude.toString());
            _this.http.get(url, {
                search: params
            }).subscribe(function (res) {
                res = res.json();
                resolve(res);
            }, function (error) {
                reject(error);
            });
        }));
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map