(function (module) {

    'use strict';

    module.controller('CartelaController', ['$scope', function ($scope) {
        $scope.cartela = {};
        $scope.cartelas = [];

        $scope.imprimir = function imprimir() {
            console.log($scope.usuario);
        }
    }]);

})(angular.module('bolao'));