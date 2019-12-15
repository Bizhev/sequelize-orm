process.env.db_timezone = 'Etc/GMT+3';

const { Sequelize, Model, DataTypes } = require('sequelize');

let config = {
    dialect: 'mariadb',
    database: 'nuts',
    username: 'jarvis',
    password: 'Jarvis01',
    host: 'localhost',
    port: 3306,
};

// const sequelize = new Sequelize('mariadb://jarvis:Jarvis01@localhost:3306/nuts');

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        logging: false,
        connectTimeout: 20000,
        dialectOptions: {
            // useUTC: false, //for reading from database
            // dateStrings: true,
            // typeCast: true
        },
        timezone: process.env.db_timezone, //for writing to database
    }
);

class LoyaltyCard extends Model {}

//OPT1
LoyaltyCard.init({
    series: DataTypes.INTEGER(4).ZEROFILL,
    number: DataTypes.INTEGER(6).ZEROFILL,
    date_release: DataTypes.DATE,
    date_end_active: DataTypes.DATE,
    status: DataTypes.BOOLEAN
}, { sequelize , modelName: 'cards'});

//OPT2
const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING
        // allowNull defaults to true
    }
}, {
    // options
});
sequelize.sync();
/////////////

let cmd = 'delete';
if (cmd==='update') {
    // Change everyone without a last name to "Doe"
    User.update({ firstName: "Dolet" }, {
        where: {
            id: 3
        }
    }).then(() => {
        console.log("Done");
    });

}
if (cmd==='insertOrUpdate') {

}
if (cmd==='findAll') {
// Find all users
    User.findAll().then(users => {
        console.log("All users:", JSON.stringify(users, null, 4));
    });
}
if (cmd==='delete') {
// Delete everyone named "Jane"
    User.destroy({
        where: {
            firstName: "Jane"
        }
    }).then(() => {
        console.log("Done");
    });
}
if (cmd==='insert') {
    // Create a new user

    User.create({ firstName: "Jane", lastName: "Doe" })
    .then(jane => {
        console.log("Jane's auto-generated ID:", jane.id);
    });

}
if (cmd==="init") {


    sequelize.sync()
        .then(() => {
                return LoyaltyCard.create({
                    series: 7110,
                    number: 65593,
                    date_release: new Date(2020, 12, 10),
                    date_end_active: new Date(2020, 12, 20),
                    status: 1
                })
            }
        )
        .then(jane => {
            console.log(jane.toJSON());
        });
}
if (cmd==='update') {

}