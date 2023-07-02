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
        } else if (interaction.isButton() || interaction.isAnySelectMenu() || interaction.isModalSubmit()) {
            const component = interaction.client.components.get(interaction.customId);

            if (!component) return;
                
            try {
                await component.run(interaction);
            } catch (error) { 
                console.error(error);

                if (interaction.replied || interaction.deferred) {
                    await interaction.message.reply({
                        content: `${interaction.client.user.username} encountered an issue while executing this component.\n${error.name}: ${error.message}`
                    });
                } else await interaction.reply({
                    content: `${interaction.client.user.username} encountered an issue while executing this component.\n${error.name}: ${error.message}`,
                    ephemeral: true
                });
            }
        }
    }
}