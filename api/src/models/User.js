const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('user', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    }, 

    dni: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },


    email: {
        type: DataTypes.STRING,
        allowNull: false
    },


    adress: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    userType:{
      type: DataTypes.ENUM("Manager", "Client", "Trainer", "Usersadminister"),
      allowNull: true
    }


});
};