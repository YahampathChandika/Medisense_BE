const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const ReferenceNumbers = sequelize.define("ReferenceNumbers", {
        attribute: {
            type: DataTypes.STRING,
            allowNull: false
        },
        referenceNo: {
            type: DataTypes.INTEGER(4).ZEROFILL,
            allowNull: false,
        }
    }, {
        timestamps: false
    });

    return ReferenceNumbers;
}