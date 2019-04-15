const userRoutes = require('./user_routes');

module.exports = (app, db) => {
    userRoutes(app, db)
};