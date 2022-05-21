const Discord = require("discord.js");

module.exports = {
  name: "kick",
  usage: ["Kick a user from your server. \n \n ```{prefix}kick <@user> <reason goes here>```"],
  enabled: true,
  aliases: [],
  category: "Admin",
  memberPermissions: ["ADMINISTRATOR"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 5000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
    try {

      // [ End Of Logging ]

      if (args[0]) {
        var targetUser = await message.mentions.members.first();
    } else {
        message.reply("You must mention a member to kick.")
        return;
    }
    if (targetUser === message.author) {
        message.reply("You cant kick yourself, even though I would like to kick you...")
        return;
    }
    if (!targetUser.kickable) {
        message.reply("You cannot kick this fella.")
    }
    if (args[1]) {
        var reason = message.content.slice(message.content.indexOf(args[1]), message.content.length) || "No reason provided."
    }
    try {
        targetUser.kick(reason)
        const kickedEmbed = new Discord.MessageEmbed()
        .setAuthor(`🛠️ Kicked User 🛠️`, message.guild.iconURL())
        .setColor("GREEN")
        .setThumbnail(targetUser.displayAvatarURL({ dynamic: true }))
        .setFooter(message.guild.name, message.guild.iconURL())
        .addField("**Moderation**", "kick")
        .addField("**User Kicked**", `<@${targetUser.id}>`)
        .addField("**Kicked By**", message.author.username)
        .addField("**Reason**", `${reason || "**No Reason**"}`)
        .addField("**Date**", message.createdAt.toLocaleString())
        .setTimestamp()
        message.reply({ embeds: [kickedEmbed] })
        loggingCh.send({ embeds: [kickedEmbed] });
    } catch (err) {
        console.log(err)
        message.reply(err)
    }
    } catch (err) {
      client.logger.error(`Ran into an error while executing ${data.cmd.name}`);
      console.log(err);
      message.reply(
        "You must mention a channel such as... `#chatbot`. Please avoid general channels."
      );
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
