const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

const User = sequelize.define('User', {
  name: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  city: DataTypes.STRING,
  postcode: DataTypes.STRING,
  password: DataTypes.STRING,
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'
  },
  points: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  tableName: 'Users' // Explicitly setting table name
});

module.exports = { User };
