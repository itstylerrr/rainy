const { Message, MessageEmbed, WebhookClient } = require("discord.js");
const { Webhooks, ownerid } = require("../../config.json");
const keygen = require("keygen");
const DB = require("../../Database/Schema/Guild");

module.exports = {
  name: "chatbot",
  usage: [
    "Set the channel that the chatbot will work in. ```{prefix}chatbot #<channel>``` To disable: ```{prefix}chatbot remove```",
  ],
  enabled: true,
  aliases: [],
  category: "Admin",
  memberPermissions: ["ADMINISTRATOR"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 5000,

  // Execute contains content for the command
  /**
   * @param {Client} client
   * @param {Message} message 
   */
  async execute(client, message, args, data) {
    const channelId = await client.tools.resolveChannel(args[0], message.guild);
    try {
      const guildDB = await DB.findOne({
        id: message.guild.id,
      });
      if (!args[0]) {
        message.reply({ embeds: [new MessageEmbed().setDescription("You must set a channel for the bot to interact in. To disable, make the first argument `remove`, ```{prefix}chatbot remove```").setColor("RED")] });
        return;
      }

      if (!data.guild.addons.settings) {
         data.guild.addons.settings = { cbChId: "none" };
        await data.guild.markModified("addons.settings");
        await guild.data.save();
      }

      if (args[0] === "remove") {
        if (guildDB.addons.settings.cbChId === null) return;
        const fetchedId = guildDB.addons.settings.cbChId;
        const oldCbCh = client.channels.cache.get(fetchedId);
        await oldCbCh.send({ content: `**Chatbot has been disabled by: <@${message.author.id}>.**` })
        await DB.findOneAndUpdate({ id: message.guild.id }, { "addons.settings.cbChId": null });
        message.reply({ embeds: [new MessageEmbed().setTitle("✅ Removed chatbot successfully.").setColor("GREEN")] });
        return;
      }

      if (channelId.id) {
        data.guild.addons.settings.cbChId = channelId.id;
        data.guild.markModified("addons.settings");
        await data.guild.save();
        const newCbCh = client.channels.cache.get(channelId.id)
        message.reply({ embeds: [new MessageEmbed().setDescription(`✅ Set chatbot to interact with the specified channel: <#${channelId.id}>.`).setColor("GREEN")]});
        newCbCh.send({ content: `**Chatbot has been enabled by: <@${message.author.id}>.**` })
        return;
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
          { name: "Command:", value: "chatbot" },
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
