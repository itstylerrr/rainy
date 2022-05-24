const { MessageEmbed } = require("discord.js");
const slotItems = ["🍇", "🍉", "🍌", "🍎", "🍒"];

module.exports = {
  name: "slots",
  usage: ["Play a game of slots to try to multiply your money!"],
  enabled: true,
  aliases: ["gamble"],
  category: "Economy",
  memberPermissions: [],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  // cooldown: 60000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
    try {
      let user = message.author;
      let money = parseInt(args[0]);
      let win = false;

      if (!money) {
        const noMoney = new MessageEmbed()
          .setTitle("🎰 you gotta bet something! 🎰")
          .setColor("RED");
        message.reply({ embeds: [noMoney] });
        return;
      }

      if (money > data.user.cash) {
        const noDBMoney = new MessageEmbed()
          .setTitle("🎰 oh you poor looser! 🎰")
          .setDescription(
            "you really think you can come to my casino with no money? LEAVE!"
          )
          .setColor("RED");
        message.reply({ embeds: [noDBMoney] });
        return;
      }

      let number = [];
      for (let i = 0; i < 3; i++) {
        number[i] = Math.floor(Math.random() * slotItems.length);
      }

      if (number[0] == number[1] && number[1] == number[2]) {
        money *= 9;
        win = true;
      } else if (
        number[0] == number[1] ||
        number[0] == number[2] ||
        number[1] == number[2]
      ) {
        money *= 3;
        win = true;
      }

      if (win) {
        let slotsWin = new MessageEmbed()
          .setDescription(
            `${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
              slotItems[number[2]]
            }\n\nYou won ${money} coins`
          )
          .setColor("GOLD");
        message.reply({ embeds: [slotsWin] });
        data.user.cash = Number(data.user.cash) + Number(money);
        data.user.save();
      } else {
        let slotsLoose = new MessageEmbed()
          .setDescription(
            `${slotItems[number[0]]} | ${slotItems[number[1]]} | ${
              slotItems[number[2]]
            }\n\nYou lost ${money} coins`
          )
          .setColor("RED");
        message.reply({ embeds: [slotsLoose] });
        data.user.cash = Number(data.user.cash) - Number(money);
        data.user.save();
      }
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
