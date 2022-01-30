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
      const loggingId = data.guild.addons.settings.loggingId;
      if (loggingId == false) return;
      const loggingCh = client.channels.cache.get(loggingId);
      const currentDate = new Date();
      const logEmbed = new Discord.MessageEmbed()
        .setTitle("📜 rainy's logging 📜")
        .addFields(
          { name: "Command Name:", value: data.cmd.name },
          { name: "Command Type:", value: data.cmd.category },
          { name: "Ran By:", value: `<@${message.author.id}>` },
          { name: "Ran In:", value: `<#${message.channel.id}>` },
          { name: "Time Ran:", value: `${currentDate.toLocaleString()} CST` }
        )
        .setFooter(`Ran by: ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      loggingCh.send({ embeds: [logEmbed] });

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
