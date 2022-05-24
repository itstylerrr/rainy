const { MessageEmbed } = require("discord.js");
const { subtract } = require("lodash");

module.exports = {
  name: "deposit",
  usage: ["Deposit cash into your bank!"],
  enabled: true,
  aliases: ["dep"],
  category: "Economy",
  memberPermissions: [],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 5000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
    const amount = args[0];
    if (amount % 1 != 0 || amount <= 0)
      return message.reply("Deposit must be a whole number.");
    try {
      if (amount > data.user.cash)
        return message.reply(
          "Pfft... Who do you think you are? You dont have that kind of money!"
        );
      data.user.bank = Number(data.user.bank) + Number(amount)
      data.user.cash = Number(data.user.cash) - Number(amount)
      await data.user.save()
      const finishedEmbed = new MessageEmbed()
        .setTitle("New deposit!")
        .setDescription(
          `You have just deposited $${amount} into your bank account.`
        )
        .setThumbnail(
          "https://freepngimg.com/download/dollar/64058-united-dollar-sign-states-design-icon.png"
        )
        .setColor("GREEN")
        .setFooter(
          `Cash deposited into ${message.author.tag}'s account || Economy by rainy`
        );
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
