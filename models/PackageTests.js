const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const PackageTests = sequelize.define("PackageTests", 
    {}, 
    {
        timestamps: false
    });
    return PackageTests;
}