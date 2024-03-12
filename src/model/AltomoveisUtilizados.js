const Sequelize = require('sequelize');
const Motoristas = require('./Motoristas');
const Automoveis = require('./Automoveis');
const db = require('../config/database');


const AutomoveisUtilizados = db.define('automoveis_utilizados', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  data_inicio: {
    type: Sequelize.DATE,
    allowNull: false
  },
  data_termino: {
    type: Sequelize.DATE,
    allowNull: true
  },
  motorista_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'motoristas',
      key: 'motorista_id'
    },
    allowNull: false
  },
  placa: {
    type: Sequelize.STRING(7),
    references: {
      model: 'automoveis',
      key: 'placa'
    },
    allowNull: false
  },
  motivo: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  Sequelize,
  timestamps: false
});

Motoristas.hasMany(AutomoveisUtilizados, { foreignKey: 'motorista_id' });
AutomoveisUtilizados.belongsTo(Motoristas, { foreignKey: 'motorista_id' });

Automoveis.hasMany(AutomoveisUtilizados, { foreignKey: 'placa' });
AutomoveisUtilizados.belongsTo(Automoveis, { foreignKey: 'placa' });

module.exports = AutomoveisUtilizados;
