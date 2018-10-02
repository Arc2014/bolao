
(function (module) {

    'use strict';

    module.service('SorteioService', function () {

        var ipcRenderer = require('electron').ipcRenderer;

        var salvar = function salvar(sorteio) {
            return ipcRenderer.sendSync('sorteio-save', sorteio);
        };

        var atualizar = function salvar(sorteio) {
            return ipcRenderer.sendSync('sorteio-update', sorteio);
        };

        var remover = function salvar(idsorteio) {
            return ipcRenderer.sendSync('sorteio-remove', idsorteio);
        };

        var buscarTodas = function buscarTodas() {
            return ipcRenderer.sendSync('sorteio-find-all');
        };

        return {
            salvar: salvar,
            buscarTodas: buscarTodas,
            atualizar: atualizar,
            remover: remover
        }
    });

})(angular.module('bolao'));