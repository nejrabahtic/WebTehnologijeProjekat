const Sequelize = require("sequelize");
const sequelize = new Sequelize("wtprojekat","root","root",{
  host:"localhost",
  dialect:"mysql",
});
module.exports = sequelize;
