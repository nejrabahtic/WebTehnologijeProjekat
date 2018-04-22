const Sequelize = require("sequelize");
const bcrypt = require('bcrypt');
const sequelize = require("../baza.js");
const Role = sequelize.import(__dirname+"/role.js");
const Korisnik = sequelize.define('Korisnik',{
    username: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    password: Sequelize.STRING,
    verified: Sequelize.BOOLEAN,
  },
  {
    hooks: {
      beforeCreate: (user) => {
        //user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
      }
    }
  }

)

Korisnik.belongsTo( Role );

module.exports = function(sequelize,DataTypes){
    return Korisnik;
}
