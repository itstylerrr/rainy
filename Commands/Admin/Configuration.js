const Discord = require('discord.js')

module.exports = {
  name: "configuration",
  usage: [
    "Get the current configurations for this server.",
    "Get list of configurations ```{prefix}configuration```",
  ],
  enabled: true,
  aliases: ["config"],
  category: "Admin",
  memberPermissions: ["ADMINISTRATOR"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 5000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
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
    try {
      let welcome = !data.guild.addons.welcome
        ? `Enabled: False`
        : `Enabled: True\nChannel: <#${data.guild.addons.welcome.channel}>\nImage: ${data.guild.addons.welcome.image}\nEmbed: ${data.guild.addons.welcome.embed}`;
      let goodbye = !data.guild.addons.goodbye
        ? `Enabled: False`
        : `Enabled: True\nChannel: <#${data.guild.addons.goodbye.channel}>\nImage: ${data.guild.addons.goodbye.image}\nEmbed: ${data.guild.addons.goodbye.embed}`;
      return client.embed.send(message, {
        description: `Use admins commands to change these settings`,
        fields: [
          {
            name: `Prefix`,
            value: `${data.guild.prefix}`,
            inline: true,
          },
          {
            name: `Welcome settings`,
            value: welcome,
            inline: true,
          },
          {
            name: `Goodbye settings`,
            value: goodbye,
            inline: true,
          },
        ],
        author: {
          name: `Guild Configurations`,
          icon_url: `${message.guild.iconURL()}`,
          url: "",
        },
      });
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
