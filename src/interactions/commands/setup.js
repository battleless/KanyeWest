const Schemas = require('../../utils/schemas.js');
const { Emojis } = require('../../utils/globals.js');

module.exports = {
    data: {
        name: 'setup',
        description: 'Manages the Kayne West quotes system.',
        options: [
            {
                name: 'set',
                description: 'Sets up the daily Kanye West quotes.',
                type: 1,
                options: [
                    {
                        name: 'channel',
                        description: 'The channel to send the daily Kanye West quotes to.',
                        type: 7,
                        channel_types: ['0'],
                        required: true
                    }
                ]
            },
            {
                name: 'delete',
                description: 'Deletes your setup for daily Kanye West quotes.',
                type: 1
            }
        ]
    },
    run: async (interaction) => {
        const subcommand = interaction.options.getSubcommand();

        switch (subcommand) {
            case 'set': {
                const channel = interaction.options.getChannel('channel').toJSON();
                const guildQuote = Schemas.getGuildQuoteChannel.get(interaction.guild.id);

                if (channel.id === guildQuote?.channel) {
                    return interaction.reply({
                        content: `${Emojis.RedKanyeWest} This channel is already setup for the daily Kanye West quotes.`,
                        ephemeral: true
                    });
                }

                if (guildQuote) {
                    Schemas.setGuildQuoteChannel.run(channel.id, interaction.guild.id);
                } else if (!guildQuote) {
                    Schemas.createGuildQuoteChannel.run(interaction.guild.id, channel.id);
                }

                return interaction.reply({
                    content: `${Emojis.GreenKanyeWest} The daily Kanye West quotes will now be sent to <#${channel.id}>!`,
                    ephemeral: true
                });
            }
            case 'delete': {
                const guildQuote = Schemas.getGuildQuoteChannel.get(interaction.guild.id);

                if (!guildQuote) {
                    return interaction.reply({
                        content: `${Emojis.RedKanyeWest} This server does not have the daily Kanye West quotes setup.`,
                        ephemeral: true
                    });
                }

                Schemas.deleteGuildQuoteChannel.run(interaction.guild.id);

                return interaction.reply({
                    content: `${Emojis.GreenKanyeWest} The daily Kanye West quotes will no longer be sent to <#${guildQuoteChannel}>!`,
                    ephemeral: true
                });
            }
        }
    }
}