const {
  getMediaByCode,
  getUserByUsername,
  getMediaByLocation,
  getMediaByTag,
  getMediaLikesByCode,
  getMediaCommentsByCode,
  generalSearch,
  getUserIdFromUsername,
  getUserProfilePicture,
  getTaggedUsersByCode,
  getMediaOwnerByCode,
} = require("instapro");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "instagram",
  usage: [
    "Get instagram stats from an instagram account```{prefix}instagram <user>```",
  ],
  enabled: false,
  aliases: ["insta"],
  category: "Stats",
  memberPermissions: [],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 7000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
    try {
        message.reply('❌ Disabled for now... ❌')
    } catch (err) {
      client.logger.error(`Ran into an error while executing ${data.cmd.name}`);
      console.log(err);
      return client.embed.send(message, {
        description: `An issue has occured while running the command. If this error keeps occuring please contact our development team.`,
        color: `RED`,
        author: {
          name: `Uh Oh!`,
          icon_url: `${message.author.displayAvatarURL()}`,
          url: "",
        },
      });
    }
  },
};
