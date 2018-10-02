const Sequelize = require('sequelize').Sequelize;
const db = require('../db/db.js');

const Cartela = db.sequelize.define('cartela', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    nome: {type: Sequelize.STRING, allowNull: false},
    qtdNumeros: {type: Sequelize.INTEGER, allowNull: false, field:'qtd_numeros'},
    inicio: {type: Sequelize.INTEGER, allowNull: false},
    fim: {type: Sequelize.INTEGER, allowNull: false},
    descricao: Sequelize.TEXT
}, {undescored: true});

db.sequelize.sync();

var save = function salvar(cartela) {
    return Cartela.create(cartela)
        .then((cartela) => {
            return cartela.toJSON();
        }).catch((err) => {
            console.log("Ocorreu um erro ao tentar salvar a cartela", err);
            return null;
        });
};

var update = function update(cartela) {
    return Cartela.update(cartela, {returning: true, plain: true, where: {id: cartela.id}})
        .then((cartela) => {
            return cartela[1].dataValues;
        }).catch((err) => {
            console.log("Ocorreu um erro ao tentar atualizar a cartela", err);
            return null;
        });
};

var remove = function remove(idCartela) {
    return Cartela.destroy({force: true, where: {id: idCartela}})
        .then(() => {
            return {};
        }).catch((err) => {
            console.log("Ocorreu um erro ao tentar atualizar a cartela", err);
            return null;
        });
};

var findAll = function findAll() {
    return Cartela.findAll({raw: true})
        .then(cartelas => {
            return cartelas;
        }).catch((err) => {
            console.log("Erro ao buscar cartelas", err);
            return [];
        });
};

var findById = function findById(idCartela) {
    return Cartela.findById(idCartela)
        .then(cartelas => {
            return cartelas;
        }).catch((err) => {
            console.log("Erro ao buscar cartelas", err);
            return [];
        });
};

module.exports = {
    Cartela: Cartela,
    save: save,
    findAll: findAll,
    update: update,
    remove: remove,
    findById: findById
};