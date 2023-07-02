const { Emojis } = require('../../utils/globals.js');

module.exports = {
    data: {
        name: 'help',
        description: 'Sends the list of Kanye West\'s commands.'
    },
    run: async (interaction) => {
        await interaction.reply({
            content: `${Emojis.KanyeWest} **Kayne West - The greatest bot in history!**\n\n\`/help\` - Sends the list of Kanye West\'s commands.\n\`/setup set\` - Sets up the daily Kanye West quotes.\n\`/setup delete\` - Deletes your setup for daily Kanye West quotes.`,
            ephemeral: true
        });
    }
}