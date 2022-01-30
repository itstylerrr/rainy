const Discord = require("discord.js");

module.exports = {
  name: "chatbot",
  usage: [
    "Set the channel that the chatbot will work in. ```{prefix}chatbot #<channel>``` To disable: ```{prefix}chatbot remove```",
  ],
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
    const channelId = await client.tools.resolveChannel(args[0], message.guild);
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
        .setFooter(
          `Ran by: ${message.member.displayName}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      loggingCh.send({ embeds: [logEmbed] });
      if (!args[0]) {
        message.reply(
          "You must set a channel for the bot to interact in. To disable, make the first argument `remove`, ```{prefix}chatbot remove```"
        );
      }

      if (!data.guild.addons.settings) {
        data.guild.addons.settings = { cbChId: false };
        data.guild.markModified("addons.settings");
        await data.guild.save();
      }

      if (args[0].toLowerCase() === "remove") {
        data.guild.addons.settings.cbChId = false;
        data.guild.markModified("addons.settings");
        await data.guild.save();
        message.reply("Removed chatbot.");
        return;
      }

      if (channelId.id) {
        data.guild.addons.settings.cbChId = channelId.id;
        data.guild.markModified("addons.settings");
        await data.guild.save();
        message.reply(
          `I have set the chatbot to interact with the channel #<${channelId.id}>`
        );
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
