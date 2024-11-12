module.exports = (sequelize, DataTypes) => {
    const Jobs = sequelize.define("Jobs", {
        job: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        } 
    }, {
        timestamps: false
    })

    return Jobs;
} 