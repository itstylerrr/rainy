const { MessageEmbed } = require("discord.js");
const { subtract } = require("lodash");

module.exports = {
  name: "withdraw",
  usage: ["Take money out of your bank account as cash."],
  enabled: true,
  aliases: ["with"],
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

    if (amount > 10000) return message.reply('For safety reasons we are only allowing withdraws of $10000 at a time.');
    try {
      if (amount > data.user.bank)
        return message.reply(
          "Pfft... Who do you think you are? You dont have that kind of money!"
        );
      data.user.cash = Number(data.user.cash) + Number(amount)
      data.user.bank = Number(data.user.bank) - Number(amount)
      await data.user.save()
      const finishedEmbed = new MessageEmbed()
        .setTitle("New withdraw!")
        .setDescription(
          `You have just withdrawn $${amount} from your bank account.`
        )
        .setThumbnail(
          "https://freepngimg.com/download/dollar/64058-united-dollar-sign-states-design-icon.png"
        )
        .setColor("GREEN")
        .setFooter(
          `Cash withdrawn from ${message.author.tag}'s account || Economy by rainy`
        );
      message.reply({ embeds: [finishedEmbed] });
    } catch (err) {
      console.log(err);
    }
  },
};
