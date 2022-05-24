const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "balance",
  usage: ["Check your balance for the server economy."],
  enabled: true,
  aliases: ["bal"],
  category: "Economy",
  memberPermissions: [],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 5000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
    try {
      if (args[0])
        return message.reply(
          `Sorry! But at this moment you are only allowed to check your own balance (the IRS told us to do this) HOWEVER, you are able to do !richest to see who the most bouge.`
        );

      const balEmbed = new MessageEmbed()
        .setTitle("⛈️rainys bank⛈️")
        .addFields(
          { name: "📤 Wallet", value: `💵 ${data.user.cash}`, inline: true },
          { name: "🏦 Bank", value: `💵 ${data.user.bank}`, inline: true }
        )
        .setColor(message.guild.me.displayHexColor)
        .setThumbnail(
          "https://freepngimg.com/download/dollar/64058-united-dollar-sign-states-design-icon.png"
        )
        .setFooter(`Your assets at rainy's bank || Economy by rainy *'invite*`);

      message.reply({ embeds: [balEmbed] });
    } catch (err) {
      client.logger.error(`Ran into an error while executing ${data.cmd.name}`);
      console.log(err);
      const { WebhookClient, MessageEmbed } = require("discord.js");
      const { Webhooks } = require("../../config.json");
      const currentDate = new Date();
      const keygen = require("keygen");
      const errKey = keygen.url(10);
      const errorLog = new WebhookClient({
        url: Webhooks.errors,
      });
      const devEmbed = new MessageEmbed()
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
            value: `<t:${parseInt(message.createdTimestamp / 1000)}:R>`,
          }
        )
        .setColor("RED");

      const userEmbed = new MessageEmbed()
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
