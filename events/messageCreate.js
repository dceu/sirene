const { Events } = require('discord.js');

module.exports = {
  name: Events.MessageCreate,
  execute(message) {
    if (message.author.bot || message.channel.name !== 'bow') return;
    return message.reply(
      `Welcome to the ${message.channel}! My personal channel`
    );
  },
};
