// node deploy-commands.js

const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('node:fs');

const commands = [];

// Grab all the command files from the commands dir
const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));
console.log(commandFiles);

// Grab the SlashCommandBuilder#toJson output of each command's data for deployment
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  //console.log(`data: ${JSON.stringify(command.data)}`);
  commands.push(command.data);
  console.log(commands);
}

// Construct and prepare an instace of the REST module
const rest = new REST({ version: '10' }).setToken(token);

// deploy!
(async () => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands`
    );

    // The put method is used to fully reresh all commands in the guild with the current set
    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );

    console.log(
      `Successfully reloaded ${data.length} application (/) commands!`
    );
  } catch (error) {
    // Log any errors
    console.log(error);
  }
})();
