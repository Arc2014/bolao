(function (module) {

    'use strict';

    module.controller('MasterController', ['$scope', function ($scope) {
        $scope.usuario = {};

        $scope.imprimir = function imprimir() {
            console.log($scope.usuario);
        }
    }]);

})(angular.module('bolao'));