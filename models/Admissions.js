const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Admissions = sequelize.define("Admissions", {
        medicalType: {
            type: DataTypes.STRING,
            allownull: false
        }, 
        totalAmount: {
            type: DataTypes.DOUBLE,
            allownull: false
        }, 
        discount: {
            type: DataTypes.DOUBLE,
            allownull: true
        }, 
        amountToPay: {
            type: DataTypes.DOUBLE,
            allownull: true
        },  
        checkNo: {
            type: DataTypes.STRING,
            allownull: true
        }, 
        checkDate: {
            type: DataTypes.DATEONLY,
            allownull: true
        }, 
        paymentStatus: {
            type: DataTypes.STRING,
            allownull: true,
            defaultValue: "Not Paid"
        }, 
        remarks: {
            type: DataTypes.STRING,
            allownull: true
        }, 
        medicalStatus: {
            type: DataTypes.STRING,
            allownull: true
        }

    });

    return Admissions;
}