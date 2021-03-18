
const Sequelize = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
	host: 'localhost',
	dialect: 'sqlite',
	logging: false,
	storage: 'database.sqlite',
});
const User = require('./models/User')(sequelize,Sequelize.DataTypes)
const Messages = require('./models/User')(sequelize,Sequelize.DataTypes)



module.exports = {User, Messages};
