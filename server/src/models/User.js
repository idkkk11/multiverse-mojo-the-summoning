const {db, Model, DataTypes} = require('../db/config');

class User extends Model {};

User.init(
    {
        username: DataTypes.STRING
    },
    {
        sequelize: db,
        modelName: "User"
    }
)

module.exports = {
    User
}