const { Message, MessageEmbed, WebhookClient } = require("discord.js");
const { Webhooks, ownerid } = require("../../config.json");
const DB = require("../../Database/Schema/Guild");

module.exports = {
  name: "test",
  usage: ["dev test cmd... who knows what code will be in here"],
  enabled: true,
  aliases: [],
  category: "Owner",
  memberPermissions: ["ADMINISTRATOR"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 5000,

  // Execute contains content for the command
  /**
   * @param {Message} message
   */
  async execute(client, message, args, data) {
    try {
      const guildDB = await DB.findOne({
        id: message.guild.id,
      });
      if (args[0] === "remove") {
        console.log("inside if statement");
        await DB.findOneAndUpdate({ id: message.guild.id }, { test: "none" });
        console.log("saved");
        message.reply({
          embeds: [
            new MessageEmbed()
              .setTitle("✅ Removed chatbot successfully.")
              .setColor("GREEN"),
          ],
        });
        console.log("embed sent");
        return;
        console.log("if you get this message you should quit");
      }
    } catch (err) {
      const currentDate = new Date();
      const errKey = keygen.url(10);
      const errorLog = new WebhookClient({
        url: Webhooks.errors,
      });
      const devEmbed = new MessageEmbed()
        .setTitle("⛈️ Rainy | Errors ⛈️")
        .setDescription(`**Error:**\n\n${err}\n`)
        .addFields(
          { name: "Command:", value: "test" },
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
    }
  },
};
