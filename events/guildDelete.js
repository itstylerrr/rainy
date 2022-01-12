const Discord = require("discord.js");
const rainy = require("../rainy");
const rainyConfig = require("../rainy.json");
const chalk = require("chalk");
const guildModel = require("../models/guildSchema");

rainy.on("guildDelete", async (guild) => {
  // [ Deleating a deleted guilds information to clear space. ]
  guildModel.findOneAndDelete({
    guildID: guild.id,
  }).then(console.log('deleted info'))
});
