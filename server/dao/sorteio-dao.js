const Sequelize = require('sequelize').Sequelize;
const db = require('../db/db.js');
const Cartela = require('./cartela-dao').Cartela;

const Sorteio = db.sequelize.define('sorteio', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    dataSorteio: {type: Sequelize.DATE, allowNull: false, field: 'data_sorteio'},
    descricaoValidade: {type: Sequelize.TEXT, field: 'data_validade'}
}, {undescored: true});

Sorteio.belongsTo(Cartela, {foreignKey: 'cartela_id', target: 'id', as: 'cartela', allowNull: false});
/*const Jogo = db.sequelize.define('jogo', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    numeroSerie: {type: Sequelize.INTEGER, allowNull: false},
    numeros: {type: Sequelize.ARRAY, allowNull: false},
    sorteio: {
        type: Sequelize.INTEGER,
        references: {
            model: Sorteio,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
});*/

db.sequelize.sync();

//Sorteio.hasMany(Jogo, {foreignKey: 'jogo', sourceKey: 'jogos'});

var save = function salvar(sorteio) {
    var cartela = sorteio.cartela;
    sorteio.cartela_id = sorteio.cartela.id;
    return Sorteio.create(sorteio)
        .then((sorteio) => {
            sorteio.dataValues.cartela = cartela;
            return sorteio.toJSON();
        }).catch((err) => {
            console.log("Ocorreu um erro ao tentar salvar a sorteio", err);
            return null;
        });
};

var update = function update(sorteio) {
    var cartela = sorteio.cartela;
    sorteio.cartela_id = sorteio.cartela.id;
    return Sorteio.update(sorteio, {returning: true, plain: true, where: {id: sorteio.id}})
        .then((sorteio) => {
            sorteio = JSON.parse(JSON.stringify(sorteio[1]));
            sorteio.cartela = cartela;
            return sorteio;
        }).catch((err) => {
            console.log("Ocorreu um erro ao tentar atualizar a sorteio", err);
            return null;
        });
};

var remove = function remove(idSorteio) {
    return Sorteio.destroy({force: true, where: {id: idSorteio}})
        .then(() => {
            return {};
        }).catch((err) => {
            console.log("Ocorreu um erro ao tentar atualizar a sorteio", err);
            return null;
        });
};

var findAll = function findAll() {
    return Sorteio.findAll({include: 'cartela'})
        .then(sorteios => {
            return JSON.parse(JSON.stringify(sorteios));
        }).catch((err) => {
            console.log("Erro ao buscar sorteios", err);
            return [];
        });
};

module.exports = {
    save: save,
    findAll: findAll,
    update: update,
    remove: remove
};