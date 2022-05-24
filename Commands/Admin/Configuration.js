const Discord = require('discord.js');
const { Webhooks, ownerid } =require("../../config.json");
const DB = require("../../Database/Schema/Guild");

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
    try {
      const guildDb = await DB.findOne({
        id: message.guild.id,
      });
      chFromDb = guildDb.addons.settings.loggingId;
      const findCh = await client.tools.resolveChannel(chFromDb, message.guild);
      if (!findCh) {
      } else {
        const currentDate = new Date();
        const logEmbed = new Discord.MessageEmbed()
          .setTitle("📜 rainy's logging 📜")
          .addFields(
            { name: "Command Name:", value: data.cmd.name },
            { name: "Command Type:", value: data.cmd.category },
            { name: "Ran By:", value: `<@${message.author.id}>` },
            { name: "Ran In:", value: `<#${message.channel.id}>` },
            { name: "Time Ran:", value: `${currentDate.toLocaleString()} CST` },
            { name : "Timestamp:", value: `<t:${parseInt(message.createdTimestamp / 1000)}:R>`}
          )
          .setFooter(
            `Ran by: ${message.member.displayName}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        findCh.send({ embeds: [logEmbed] });
      }
      var cbCh = data.guild.addons.settings.cbChId;
      if (cbCh ===null) {
        cbCh = "none"
      } else {
        cbCh = `<#${data.guild.addons.settings.cbChId}>`
      }
      var logCh = data.guild.addons.settings.loggingId;
      if (logCh === null) {
        logCh = "none"
      } else {
        logCh = `<#${data.guild.addons.settings.loggingId}>`
      }
      let welcome = !data.guild.addons.welcome
        ? `Enabled: False`
        : `Enabled: True\nChannel: <#${data.guild.addons.welcome.channel}>\nImage: ${data.guild.addons.welcome.image}\nEmbed: ${data.guild.addons.welcome.embed}\nRole: <@&${data.guild.addons.welcome.role}>`;
      let goodbye = !data.guild.addons.goodbye
        ? `Enabled: False`
        : `Enabled: True\nChannel: <#${data.guild.addons.goodbye.channel}>\nImage: ${data.guild.addons.goodbye.image}\nEmbed: ${data.guild.addons.goodbye.embed}`;
      let settings = `Chatbot Channel: ${cbCh}\nLogging Channel: ${logCh}`
      return client.embed.send(message, {
        description: `Use admins commands to change these settings`,
        fields: [
          {
            name: `Prefix`,
            value: `${data.guild.prefix}`,
            inline: true,
          },
          {
            name: `Welcome Settings:`,
            value: welcome,
            inline: true,
          },
          {
            name: `Goodbye Settings:`,
            value: goodbye,
            inline: true,
          },
          {
            name: `Guild Settings:`,
            value: settings,
            inline: true
          }
        ],
        author: {
          name: `Guild Configurations`,
          icon_url: `${message.guild.iconURL()}`,
          url: "",
        },
      });
    } catch (err) {  
      const currentDate = new Date();
      const keygen = require('keygen');
      const errKey = keygen.url(10);
      const errorLog = new Discord.WebhookClient({
        url: Webhooks.errors,
      });
      const devEmbed = new Discord.MessageEmbed()
        .setTitle("⛈️ Rainy | Errors ⛈️")
        .setDescription(`**Error:**\n\n${err}\n`)
        .addFields(
          { name: "Command:", value: data.cmd.name },
          { name: "Error Key:", value: `\`${errKey}\`` },
          {
            name: "Guild:",
            value: `Name: ${message.guild.name} | ID: ${message.guild.id}`,
            inline: true,
          },
          {
            name: "Author:",
            value: `Name: ${message.author.tag} | ID: ${message.author.id}`,
            inline: true,
          },
          {
            name: "Created:",
            value: `<t:${parseInt(message.createdTimestamp / 1000)}:R>`
          }
        )
        .setColor("RED");
  
      const userEmbed = new Discord.MessageEmbed()
        .setTitle("⛈️ Rainy | Errors ⛈️")
        .setDescription(
          `An error has occured running this command. Please DM <@${ownerid}> with the following error key: \`${errKey}\``
        )
        .setColor("RED");
      message.reply({ embeds: [userEmbed] });
      errorLog.send({ embeds: [devEmbed] });
      return;
    }
  },
};
