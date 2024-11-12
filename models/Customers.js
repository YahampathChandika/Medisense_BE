const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Customers = sequelize.define("Customers", {
        image: {
            type: DataTypes.STRING,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        mobileNo: {
            type: DataTypes.STRING,
            allowNull: true
        },
        civilStatus: {
            type: DataTypes.STRING,
            allowNull: true
        },
        nic: {
            type: DataTypes.STRING,
            allowNull: true
        },
        passportId: {
            type: DataTypes.STRING,
            allowNull: true
        },
        issuedDate: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        issuedPlace: {
            type: DataTypes.STRING,
            allowNull: true
        },
        timeOfLastMeal: {
            type: DataTypes.TIME,
            allowNull: true
        },
        referredBy: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
    return Customers

}
