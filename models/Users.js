const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        image: {
            type: DataTypes.STRING,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        contactNo: { 
          type: DataTypes.STRING,
          allowNull: false,
        },
        dob: {
          type: DataTypes.STRING,
          allowNull: true, 
        },
        address: {
          type: DataTypes.STRING,
          allowNull: true, 
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false, 
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
    
    });
    return Users;
};