module.exports = (sequelize, DataTypes) => {
    const Countries = sequelize.define("Countries", {
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gcc: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        timestamps: false
    })
    
    return Countries;
}