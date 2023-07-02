const Database = require('better-sqlite3');
const database = new Database('../database.db');

module.exports = database;