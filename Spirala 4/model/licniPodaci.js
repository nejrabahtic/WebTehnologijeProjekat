const Sequelize = require("sequelize");
const sequelize = require("../baza.js");

const licniPodaci = sequelize.define('LicniPodaci',{
  naziv: Sequelize.STRING,
  index: Sequelize.STRING,
  nastavnaGrupa: Sequelize.INTEGER,
  brojGrupa: Sequelize.INTEGER,
  imeRepozitorija: Sequelize.STRING,
  email: Sequelize.STRING,
  regex: Sequelize.STRING,
  semestar: Sequelize.STRING,
  akGod: Sequelize.STRING,
  bitURL: Sequelize.STRING,
  bitSSH: Sequelize.STRING,
})

module.exports = function(sequelize,DataTypes){
    return licniPodaci;
}
