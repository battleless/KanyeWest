const database = require('./data/database.js');

module.exports = {
    getGuildQuoteChannel: database.prepare('SELECT * FROM quotes WHERE guild = ?'),
    createGuildQuoteChannel: database.prepare('INSERT INTO quotes VALUES (?, ?)'),
    setGuildQuoteChannel: database.prepare('UPDATE quotes SET channel = ? WHERE guild = ?'),
    deleteGuildQuoteChannel: database.prepare('DELETE FROM quotes WHERE guild = ?'),
    getAllQuoteChannels: database.prepare('SELECT * FROM quotes')
}