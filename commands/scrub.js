const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('scrub')
    .setDescription('Cleans the deck!')
    .toJSON(),

  async execute(interaction) {
    let { channel } = interaction;
    let messages = await channel.messages.fetch();
    if (!messages) {
      await interaction.reply({
        content: `${channel} has already been scrubbed`,
        ephemeral: true,
      });
    } else {
      await messages.forEach((msg) => {
        msg.delete();
      });
      await interaction.reply({
        content: `${channel} has been scrubbed!`,
        ephemeral: true,
      });
    }
  },
};
