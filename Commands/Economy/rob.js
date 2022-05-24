const { MessageEmbed } = require("discord.js");
const users = require("../../Database/Schema/User");

module.exports = {
  name: "rob",
  usage: ["Try to rob another user for coins."],
  enabled: true,
  aliases: [],
  category: "Economy",
  memberPermissions: [],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  // cooldown: 600000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
    try {
      const targetUser = await message.mentions.members.first();

      if (!targetUser || !args[0]) {
        const targetEmbed = new MessageEmbed()
          .setTitle("🔫 You gotta mention someone to rob! 🔫")
          .setColor("RED");
        message.reply({ embeds: [targetEmbed] });
        return;
      }

      const userId = { id: message.author.id };
      const targetId = { id: targetUser.id };

      if (targetUser.id === message.author.id) {
        const roburselfEmbed = new MessageEmbed()
          .setTitle("🔫 Yes! Lets rob ourselves! no... 🔫")
          .setColor("RED");
        message.reply({ embeds: [roburselfEmbed] });
        return;
      }

      if (message.mentions.users.first().bot) {
        const robbotEmbed = new MessageEmbed()
          .setTitle("🔫 WOW! You are quite the dumb criminal! 🔫")
          .setDescription(
            "how in the world would you rob something that isnt real! you just tried robbing a bot for money."
          )
          .setColor("RED");
        message.reply({ embeds: [robbotEmbed] });
        return;
      }

      const user = await users.find({ id: `${targetUser.id}` });

      if (!user.length) {
        const nonexistingEmbed = new MessageEmbed()
          .setTitle("🔫 Persona non exister 🔫")
          .setDescription(
            "this person does not exist in our database. you can tell them to join the game by running any of rainy's commands!"
          )
          .setColor("RED");
        message.reply({ embeds: [nonexistingEmbed] });
        return;
      }

      if (user[0].cash <= 0) {
        const poorEmbed = new MessageEmbed()
          .setTitle("🔫 Wow... I see who you are, trying to rob a poor man! 🔫")
          .setDescription(
            "or this guy is loaded and not carrying any cash... like a rich man does!"
          )
          .setColor("RED");
        message.reply({ embeds: [poorEmbed] });
        return;
      }

      let number = Number(Math.floor(Math.random() * Math.floor(10)));

      if (number < 7) {
        const stolenMoney = Math.floor(Math.random() * (1 + user[0].cash + 1));
        const userBal = data.user.cash;
        const targetsBal = user[0].cash;
        const succeedEmbed = new MessageEmbed()
          .setTitle("💰 you got away! 💰")
          .setDescription(
            `congrats! you just committed a crime, but got away with it! \n \n You just stole: \n **$**${stolenMoney}`
          )
          .setColor("GOLD")
          .setTimestamp();
        message.reply({ embeds: [succeedEmbed] });
        users.updateOne(userId, { cash: userBal + stolenMoney }, (err) => {
          if (err) {
            message.reply("err, contact devs");
            console.log(err);
            return;
          }
        });
        users.updateOne(targetId, { cash: targetsBal - stolenMoney }, (err) => {
          if (err) {
            message.reply("err, contact devs");
            console.log(err);
            return;
          }
        });
      } else {
        const caughtEmbed = new MessageEmbed()
          .setTitle("👮 the cops are here! 🚔")
          .setDescription(
            `"You have the right to remain silent. Anything you say can and will be used against you in a court of law." you have been caught trying to rob a civilian!`
          )
          .setColor("RED")
          .setTimestamp();
        message.reply({ embeds: [caughtEmbed] });
        return;
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
