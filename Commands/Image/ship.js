const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const rainyConfig = require("../../config.json");

module.exports = {
  name: "ship",
  usage: [
    "Do you ship two people? Add their profile URL's here```{prefix}ship <imageurlUser1> <imageurlUser2>```",
  ],
  enabled: true,
  aliases: ["love"],
  category: "Image Manipulation",
  memberPermissions: [],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 5000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
    try {
      if (args[0]) {
        try {
          let member = await client.tools.resolveMember(args[0], message.guild);
          var imageurl1 = member.displayAvatarURL();
        } catch (err) {
          message.reply(`Please mention a real user! \n \n Error: \`${err}\``);
          return;
        }
      } else {
        message.reply(
          "You must set a picture for the image. To do this, just ping a user!"
        );
        return;
      }
      if (args[1]) {
        try {
          let member = await client.tools.resolveMember(args[1], message.guild);
          var imageurl2 = member.displayAvatarURL();
        } catch (err) {
          message.reply(`Please mention a real user! \n \n Error: \`${err}\``);
          return;
        }
      } else {
        message.reply(
          "You must set a picture for the image. To do this, just ping a user!"
        );
        return;
      }
      const res = await fetch(
        `https://nekobot.xyz/api/imagegen?type=ship&user1=${imageurl1}&user2=${imageurl2}`
      );
      const img = (await res.json()).message;
      const shipEmbed = new MessageEmbed()
        .setImage(img)
        .setFooter(
          message.member.displayName,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor(message.guild.me.displayHexColor);
      message.reply({ embeds: [shipEmbed] });
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
