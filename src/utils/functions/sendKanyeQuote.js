const Schemas = require('../schemas.js');
const Globals = require('../globals.js');

const { randomInt } = require('node:crypto');

const { PermissionFlagsBits } = require('discord.js');

const sendKanyeQuotes = async client => {
    const quoteChannels = Schemas.getAllQuoteChannels.all();

    for (const quoteChannel of quoteChannels) {
        const guild = client.guilds.cache.get(quoteChannel.guild);
        const channel = guild.channels.cache.get(quoteChannel.channel);

        if (!guild || !channel) {
            Schemas.deleteGuildQuoteChannel.run(quoteChannel.guild);

            continue;
        }

        if (!channel.viewable || !channel.permissionsFor(guild.members.me).has(PermissionFlagsBits.SendMessages)) {
            Schemas.deleteGuildQuoteChannel.run(quoteChannel.guild);

            continue;
        }

        const quote = Globals.Quotes[randomInt(Globals.Quotes.length)];

        await channel.send({
            content: `${Globals.Emojis.KanyeWest} ${quote}`
        });
    }
};

module.exports = sendKanyeQuotes;