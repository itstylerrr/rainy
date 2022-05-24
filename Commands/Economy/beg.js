const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "beg",
  usage: ["Try to beg for coins."],
  enabled: true,
  aliases: [],
  category: "Economy",
  memberPermissions: [],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 300000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
    try {
      const randomNumber = Math.floor(Math.random() * 100) + 1;

      data.user.cash = data.user.cash + randomNumber;
      await data.user.save();
      const finishedEmbed = new MessageEmbed()
        .setTitle("⛈️raining cash!")
        .setDescription(`You earned $${randomNumber} by begging!`)
        .setColor("GREEN")
        .setTimestamp();
      message.reply({ embeds: [finishedEmbed] });
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
