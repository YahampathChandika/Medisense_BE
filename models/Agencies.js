const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Agencies = sequelize.define("Agencies", {
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        fax: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        contactPerson: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        labourLicence: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        commision: {
            type: DataTypes.INTEGER,
            allowNull: true,
        }
    });
    return Agencies;
}