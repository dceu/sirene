const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('server')
    .setDescription('Replies with info about the server')
    .toJSON(),
  async execute(interaction) {
    // interaction.guild is the object representing the Guild in which the command was run
    await interaction.reply(
      `\`\`\`diff \n + ${interaction.guild.name} \n + population: ${interaction.guild.memberCount} scallys! \n\`\`\``
    );
  },
};
