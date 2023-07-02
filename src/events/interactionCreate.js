module.exports = {
    name: 'interactionCreate',
    once: false,
    run: async (interaction) => {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);

            if (!command) return;
                
            try {
                await command.run(interaction);
            } catch (error) { 
                console.error(error); 
                
                if (interaction.replied || interaction.deferred) {
                    await interaction.editReply({
                        content: `${interaction.client.user.username} encountered an issue while executing this command.\n${error.name}: ${error.message}`,
                        ephemeral: true
                    });
                } else await interaction.reply({
                    content: `${interaction.client.user.username} encountered an issue while executing this command.\n${error.name}: ${error.message}`,
                    ephemeral: true
                });
            }
        }
    }
}
