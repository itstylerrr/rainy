const mongoose = require("mongoose");

const guildModel = new mongoose.Schema({
  guildID: { type: String, require: true, unique: true },
  ownerID: { type: String },
  prefix: { type: String },
  adminroleID: { type: String, unique: true },
  modroleID: { type: String, unique: true},
  modchannelID: { type: String, unique: true},
  autoroleID: { type: String, unique: true},
  botType: { type: String, default: "None" }
});

const model = mongoose.model("GuildModels", guildModel);

module.exports = model;