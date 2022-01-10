const Discord = require("discord.js");
const rainy = require("../rainy");
const rainyConfig = require('../rainy.json')

rainy.on("messageCreate", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefix = rainyConfig.prefix;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  if (!message.content || !message.content.toLowerCase().startsWith(prefix))
    return;
  const cmd = args.shift();
  let command = rainy.commands.get(cmd);
  if (!command) command = rainy.aliases.get(cmd);

  if (command) {
    command.run(rainy, message, args);
  }
});
