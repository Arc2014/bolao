
(function (module) {

    'use strict';

    module.service('CartelaService', function () {

        var ipcRenderer = require('electron').ipcRenderer;

        var salvar = function salvarCartela(cartela) {
            return ipcRenderer.sendSync('cartela-save', cartela);
        };

        var atualizar = function salvarCartela(cartela) {
            return ipcRenderer.sendSync('cartela-update', cartela);
        };

        var remover = function salvarCartela(idCartela) {
            return ipcRenderer.sendSync('cartela-remove', idCartela);
        };

        var buscarTodas = function buscarTodasCartelas() {
            return ipcRenderer.sendSync('cartela-find-all');
        };

        var buscarPorId = function buscarPorId(idCartela) {
            return ipcRenderer.sendSync('cartela-find-by-id', idCartela);
        };

        return {
            salvar: salvar,
            buscarTodas: buscarTodas,
            atualizar: atualizar,
            remover: remover,
            buscarPorId: buscarPorId
        }
    });

})(angular.module('bolao'));