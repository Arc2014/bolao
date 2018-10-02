(function (module) {

    'use strict';

    const _ = require('underscore');

    module.controller('CartelaController', ['$scope', 'CartelaService', function ($scope, CartelaService) {
        var indexLista = -1;
        $scope.cartela = {};
        $scope.cartelas = CartelaService.buscarTodas();

        $scope.salvar = function salvar() {
            $scope.cartelas.push(CartelaService.salvar($scope.cartela));
            $scope.cartela = {};
            $scope.isInsertOrUpdate = false;
        };

        $scope.setEdicao = function edit(cartela, index) {
            $scope.cartela = cartela;
            indexLista = index;
            $scope.isInsertOrUpdate = true;
        };

        $scope.atualizar = function atualizar() {
            $scope.cartelas[indexLista] = CartelaService.atualizar($scope.cartela);
            $scope.cartela = {};
            $scope.isInsertOrUpdate = false;
        };

        $scope.remover = function remover(idCartela) {
            CartelaService.remover(idCartela);
            $scope.cartelas = _.reject($scope.cartelas, (cartela) => {return cartela.id == idCartela});
            $scope.isInsertOrUpdate = _.isEmpty($scope.cartelas);
        };

        $scope.nova = function nova () {
          $scope.isInsertOrUpdate = true;
        };

        $scope.voltar = function novo () {
            $scope.cartela = {};
            $scope.isInsertOrUpdate = false;
        };

        $scope.isInsertOrUpdate = _.isEmpty($scope.cartelas);

    }]);

})(angular.module('bolao'));