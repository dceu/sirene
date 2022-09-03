const {SlashCommandBuilder, Routes} = require('discord.js');
const {REST} = require('@discordjs/rest');
const { clientId, guildId, token} = require('./config.json');

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('replies with Pong!'),
    new SlashCommandBuilder().setName('server').setDescription('replies with server info'),
    new SlashCommandBuilder().setName('user').setDescription('replies with user info'),
    new SlashCommandBuilder().setName('clrbow').setDescription('clears messages on the bow')
]

    .map( command => command.toJSON() );

const rest = new REST({version: '10'}).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
    .then((data) => console.log(`Successfully registerd ${data.length} application commands!`))
    .catch(console.error);