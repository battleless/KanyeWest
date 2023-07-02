const {
    REST,
    Routes
} = require('discord.js');

const fs = require('node:fs');

const config = require('../config.json');

const commands = [];
const commandFiles = fs.readdirSync('./interactions/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require('./interactions/commands/' + file);
	commands.push(command.data);
}

const rest = new REST({ version: '10' }).setToken(config.token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
            Routes.applicationCommands(config.id), {
				body: commands
			});

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error); 
	};
})()