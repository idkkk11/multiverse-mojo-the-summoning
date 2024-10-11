const {db, Model, DataTypes} = require('../db/config');

class Attack extends Model {};

Attack.init(
    {
        title: DataTypes.STRING,
        mojoCost: DataTypes.INTEGER,
        staminaCost: DataTypes.INTEGER,
        imgUrl: DataTypes.STRING
    },
    {
        sequelize: db,
        modelName: "Attack"
    }
)

module.exports = {
    Attack
}