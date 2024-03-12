const Sequelize = require('sequelize');
const db = require('../config/database');

const Automoveis = db.define('automoveis', {
  placa: {
    type: Sequelize.STRING(7),
    allowNull: false,
    primaryKey: true
  },
  cor: {
    type: Sequelize.STRING(20),
    allowNull: false
  },
  marca: {
    type: Sequelize.STRING(50),
    allowNull: false
  }
}, {
  Sequelize,
  timestamps: false
});

module.exports = Automoveis;
