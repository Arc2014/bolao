(function (module) {
    "use strict";

    console.log(module);

    module.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "./master/master.html",
            controller: "MasterController"
        }).when("/cartela", {
            templateUrl: "./cartela/cartela.html",
            controller: "CartelaController"
        });
    }]);

})(angular.module('bolao', ['ngRoute', 'ngResource']));