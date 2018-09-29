(function (module) {

    'use strict';

    module.controller('SorteioController', ['$scope', function ($scope) {
        $scope.sorteio = {};
        $scope.sorteios = [];

        $scope.imprimir = function imprimir() {
            console.log($scope.usuario);
        }
    }]);

})(angular.module('bolao'));