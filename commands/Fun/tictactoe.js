const { MessageEmbed, Message, Client } = require("discord.js");
const simplydjs = require('simply-djs')

module.exports = {
  name: "tictactoe",
  aliases: ["ttt"],
  emoji: "❌",
  description: "Play tic tac toe against a user in your server!",
  /**
   *
   * @param {Client} rainy
   * @param {Message} message
   * @param {String} args
   * @returns
   */
  run: async (rainy, message, args) => {
    simplydjs.tictactoe(message);
  },
};
