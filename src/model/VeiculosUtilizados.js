const Sequelize = require('sequelize');
const Motoristas = require('./Motoristas');
const Veiculos = require('./Veiculos');
const db = require('../config/database');


const VeiculosUtilizados = db.define('veiculos_utilizados', {
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
      model: 'veiculos',
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

Motoristas.hasMany(VeiculosUtilizados, { foreignKey: 'motorista_id' });
VeiculosUtilizados.belongsTo(Motoristas, { foreignKey: 'motorista_id' });

Veiculos.hasMany(VeiculosUtilizados, { foreignKey: 'placa' });
VeiculosUtilizados.belongsTo(Veiculos, { foreignKey: 'placa' });

module.exports = VeiculosUtilizados;
