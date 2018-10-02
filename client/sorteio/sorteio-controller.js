(function (module) {

    'use strict';

    const _ = require('underscore');

    module.controller('SorteioController', ['$scope', 'SorteioService', 'CartelaService', function ($scope, SorteioService, CartelaService) {
        var indexLista = -1;
        $scope.sorteio = {};
        $scope.sorteios = SorteioService.buscarTodas();
        $scope.cartelas = CartelaService.buscarTodas();

        $scope.salvar = function salvar() {
            $scope.sorteios.push(SorteioService.salvar($scope.sorteio));
            $scope.sorteio = {};
            $scope.isInsertOrUpdate = false;
        };

        $scope.setEdicao = function edit(sorteio, index) {
            $scope.sorteio = sorteio;
            $scope.sorteio.dataSorteio = new Date(sorteio.dataSorteio);
            indexLista = index;
            $scope.isInsertOrUpdate = true;
        };

        $scope.atualizar = function atualizar() {
            $scope.sorteios[indexLista] = SorteioService.atualizar($scope.sorteio);
            $scope.sorteio = {};
            $scope.isInsertOrUpdate = false;
        };

        $scope.remover = function remover(idSorteio) {
            SorteioService.remover(idSorteio);
            $scope.sorteios = _.reject($scope.sorteios, (sorteio) => {return sorteio.id == idSorteio});
            $scope.isInsertOrUpdate = _.isEmpty($scope.sorteios);
        };

        $scope.novo = function novo () {
            $scope.isInsertOrUpdate = true;
        };

        $scope.voltar = function novo () {
            $scope.sorteio = {};
            $scope.isInsertOrUpdate = false;
        };

        $scope.isInsertOrUpdate = _.isEmpty($scope.sorteios);
    }]);

})(angular.module('bolao'));