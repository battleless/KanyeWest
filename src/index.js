const {
    Client,
    GatewayIntentBits,
    Collection
} = require('discord.js');

const fs = require('node:fs');

const config = require('../config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds
    ],
	presence: { 
		status: 1,
		activities: [{
			name: 'with Kayne West',
			type: 0
		}]
	}
});

client.commands = new Collection();
const commands = fs.readdirSync('./interactions/commands').filter(file => file.endsWith('.js'));

for (const file of commands) {
	const command = require('./interactions/commands/' + file);
	client.commands.set(command.data.name, command);
}

client.components = new Collection();
const components = fs.readdirSync('./interactions/components').filter(file => file.endsWith('.js'));

for (const file of components) {
	const component = require('./interactions/components/' + file);
	client.components.set(component.id, component);
}

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of events) {
	const event = require('./events/' + file);
	if (event.once) {
		client.once(event.name, (...args) => event.run(...args));
	} else {
		client.on(event.name, (...args) => event.run(...args));
	}
}

client.login(config.token);
