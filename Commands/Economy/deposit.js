const { MessageEmbed } = require("discord.js");

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
      data.user.bank = data.user.bank + amount
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
      console.log(err);
    }
  },
};
