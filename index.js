//require('dotenv').config(); //init dotenv
const {token} = require('./config.json');
const {Client, GatewayIntentBits} = require('discord.js'); //import discord.js

const client = new Client({
    intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    ]
}); // create new client

const channels = [];

client.once('ready', () => {
    console.log(`Bow is online`);
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
	} else if (commandName === 'user') {
		await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
	} else if (commandName === 'clrbow') {
        let currentChannel = interaction.channel;
        currentChannel.messages.fetch()
            .then(messages => messages.forEach(msg => {
                msg.delete();
            })).then(
                 interaction.reply(
                    {content: `${currentChannel} has been cleared!`, ephemeral: true}
        ))
        // interaction.guild.channels.fetch()
        // .then(channels => channels.each);
        // await interaction.reply(
        //     { content:`Delete messages in ${c.name}`, ephemeral: true}
        //     )
        //}
        //await interaction.reply({content:`doing thing in ${currentChannel.name}`, ephemeral : true});
    }
});


client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (message.channel.name == 'bow') {
       return message.reply(`hello! and welcome to the ${message.channel}`)
    }
    })

//this has to be the last line
client.login(token); //login bot using token 