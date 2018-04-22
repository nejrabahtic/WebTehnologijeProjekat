const Sequelize = require("sequelize");
const sequelize = require("../baza.js");
const Role = sequelize.define('Role',{
    role: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },

})
module.exports = function(sequelize,DataTypes){
    return Role;
}
