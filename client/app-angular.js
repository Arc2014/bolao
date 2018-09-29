(function (module) {
    "use strict";

    module.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "./master/master.html",
            controller: "MasterController"
        }).when("/cartela", {
            templateUrl: "./cartela/cartela.html",
            controller: "CartelaController"
        }).when("/sorteio", {
            templateUrl: "./sorteio/sorteio.html",
            controller: "SorteioController"
        });
    }]);

})(angular.module('bolao', ['ngRoute', 'ngResource']));