const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Packages = sequelize.define("Packages", {
        packageCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: true,   
        },
        discription: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        indexes: [
          {unique:true, fields:['packageCode']},
          {unique:true, fields:['name']}
        ]
      });
    return Packages;
}