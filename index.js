const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mariadb://jarvis:Jarvis01@localhost:3306/nuts');

class LoyaltyCard extends Model {}

LoyaltyCard.init({
    series: DataTypes.INTEGER(4).ZEROFILL,
    number: DataTypes.INTEGER(6).ZEROFILL,
    date_release: DataTypes.DATE,
    date_end_active: DataTypes.DATE,
    status: DataTypes.BOOLEAN
}, { sequelize, modelName: 'cards' });


sequelize.sync()
    .then(() => LoyaltyCard.create({
        series: 7110,
        number: 65593,
        date_release: new Date(2020, 12, 10),
        date_end_active: new Date(2020, 12, 20),
        status: 1
    }))
    .then(jane => {
        console.log(jane.toJSON());
    });