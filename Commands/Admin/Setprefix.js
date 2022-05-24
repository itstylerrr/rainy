const Discord = require('discord.js');
const { Webhooks, ownerid } =require("../../config.json");

module.exports = {
  name: "setprefix",
  usage: ["Set the prefix for your server```{prefix}setprefix <prefix>```"],
  enabled: true,
  aliases: ["prefix"],
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
      if (!args[0]) {
        return client.embed.usage(message, data);
      }
      let prefix = args.join(" ");
      data.guild.prefix = prefix;
      await data.guild.save();
      message.guild.prefix = prefix.toLowerCase();
      return message.channel.send(`Prefix has been updated to \`${prefix}\``);
    } catch (err) {
      client.logger.error(`Ran into an error while executing ${data.cmd.name}`);
      console.log(err);
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
