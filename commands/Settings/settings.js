const guildProfile = require("../../models/guildSchema");

const {
  MessageActionRow,
  MessageButton,
  Permissions,
  MessageEmbed,
} = require("discord.js");

module.exports = {
  name: "settings",
  aliases: ["s"],
  emoji: "⚙️",
  description: "Use this command to view and change setttings in the server",
  /**
   *
   * @param {Client} rainy
   * @param {Message} message
   * @param {String} args
   * @returns
   */
  run: async (rainy, message, args) => {
    let guildData = await guildProfile.findOne({ guildID: message.guild.id });
  },
};
