const Discord = require("discord.js");

module.exports = {
  name: "testlogs",
  usage: ["Test logging for your server."],
  enabled: false,
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
        message.reply('Server logs tested... If enabled, check your logging channel that you set for rainy. If disabled, nothing besides this should be sent anywhere when this was ran.')
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
