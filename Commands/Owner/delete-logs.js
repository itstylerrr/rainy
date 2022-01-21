const { MessageEmbed } = require("discord.js");
const logs = require("../../Database/Schema/Log");

module.exports = {
  name: "delete-logs",
  usage: ["Clear all logs."],
  enabled: true,
  aliases: ["dellogs"],
  category: "Owner",
  memberPermissions: [],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: true,
  // cooldown: 600000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
      try {
          logs.deleteMany()
          message.reply('deleted all cmd logs')
      } catch(err) {
          console.log(err)
          message.channel.send('err clearing logs')
      }
  },
};
