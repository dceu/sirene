const fs = require('node:fs');
const path = require('node:path');

//require('dotenv').config(); //init dotenv
const { token } = require('./config.json');
const { Client, Collection, GatewayIntentBits, Events } = require('discord.js'); //import discord.js

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
}); // create new client

// Loading Command Files
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  // Set new item in the Collection with the key as the command name and the value as the exported module
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] THE COMMAND AT ${filePath} is missing a required "data"/"execute" property.`
    );
  }
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.js'));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}
// client.once(Events.ClientReady, (c) => {
//   console.log(`${c.user.username} is live!`);
// });

// Init Slash Commands
// client.on(Events.InteractionCreate, async (interaction) => {

// });
// End Loading Commands

// client.on('messageCreate', (message) => {
//   if (message.author.bot) return;
//   if (message.channel.name == 'bow') {
//     return message.reply(`hello! and welcome to the ${message.channel}`);
//   }
// });

//this has to be the last line
client.login(token); //login bot using token
