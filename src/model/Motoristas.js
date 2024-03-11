const Sequelize = require('sequelize');
const db = require('../config/database');

const Motoristas = db.define('motoristas', {
    motorista_id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
}, {
    Sequelize,
    timestamps: false
});

module.exports = Motoristas;