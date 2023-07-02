const cron = require('node-cron');
const sendKanyeQuote = require('../utils/functions/sendKanyeQuote.js');

module.exports = {
    name: 'ready',
    once: true,
    run: async (client) => {
        console.log(`${client.user.username} is ready!`);

        cron.schedule('* * * * *', async () => {
            await sendKanyeQuote(client);
        });
    }
}