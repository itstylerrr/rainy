const fs = require("fs");
const Discord = require("discord.js");
const rainyConfig = require('./rainy.json')


const rainy = new Discord.Client({
  intents: ["32767"],
});

module.exports = rainy;
rainy.commands = new Discord.Collection();
rainy.aliases = new Discord.Collection();
rainy.slash_commands = new Discord.Collection();
fs.readdirSync("./handler").forEach((file) => {
  require(`./handler/${file}`);
});

rainy.login(rainyConfig.token);
