const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const CustomerTests = sequelize.define("CustomerTests", {
        result: {
            type: DataTypes.STRING,
            allowNull: true
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return CustomerTests;
}