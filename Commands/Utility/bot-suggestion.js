const {
    MessageEmbed,
    Message,
    Client,
    WebhookClient,
    MessageActionRow,
    MessageButton,
  } = require("discord.js");
  const { Webhooks } = require("../../config.json");
  const DB = require("../../Database/Schema/Suggestions");
  const keygen = require("keygen");
  
  module.exports = {
    name: "bot-suggestion",
    usage: [
      "Suggestions for the bot.\n```{prefix}bot-suggestion <Type Of Suggestion or None> <message goes here>```",
    ],
    enabled: true,
    aliases: ["bsuggestion"],
    category: "Utility",
    memberPermissions: [],
    botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 30000,
  
    /**
     *
     * @param {Client} client
     * @param {Message} message
     */
  
    // Execute contains content for the command
    async execute(client, message, args, data) {
      try {
        const identificationId = keygen.url(20);
        const SugWebhook = new WebhookClient({
          url: Webhooks.suggestions,
        });
        if (!args[0])
          return message.reply({
            content:
              "You must provide the type of suggestion that you want. **ONLY ONE WORD OR ELSE IT WILL GO INTO DESCRIPTOIN** (or just type none if it is a general Suggestion):\n\nSuggestion a suggestion to the developers.\n```{prefix}bot-suggestion <Type of Suggestion or None> <message goes here>```",
          });
        if (!args[1])
          return message.reply({
            content:
              "You must give a description of the suggestion:\n\nSend a suggestion to the developers.\n```{prefix}bot-suggestion <Type of Suggestion or None> <message goes here>```",
          });
        var sugType = args[0];
        var text = message.content.slice(message.content.indexOf(args[1]), 4096);
        const Embed = new MessageEmbed()
          .setTitle("🆙 Rainy | Suggestion 🆙")
          .addFields(
            { name: "Author Of Suggestion", value: message.author.id, inline: true },
            { name: "Type Given", value: sugType, inline: true },
            { name: "Database ID:", value: `\`\`\`${identificationId}\`\`\`` }
          )
          .setDescription(`**New Suggestion**:\n\n${text}`)
          .setColor("GREEN");
        await DB.create({
          authorId: message.author.id,
          suggestion: sugType,
          text: text,
          identification: identificationId,
        }).catch((err) => {
          message.reply({ content: "**Error creating DB.**" });
          return console.log(err);
        });
        message.reply({
          content:
            "**-Tyler#7922 thanks you for your feedback, we will update you on the situation once we get a chance!**",
          embeds: [Embed],
        });
        SugWebhook.send({ embeds: [Embed] });
      } catch (err) {
        client.logger.error(`Ran into an error while executing ${data.cmd.name}`);
        console.log(err);
        const { WebhookClient, MessageEmbed } = require("discord.js");
        const { Webhooks } = require("../../config.json");
        const currentDate = new Date();
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
  