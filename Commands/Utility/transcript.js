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
  const { createTranscript } = require("discord-html-transcripts");
  
  module.exports = {
    name: "transcript",
    usage: [
      "Create a transcript for the current channel.\n```{prefix}transcript```",
    ],
    enabled: true,
    aliases: ["get-transcript"],
    category: "Utility",
    memberPermissions: ["MANAGE_CHANNEL"],
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
        const attachment = await createTranscript(message.channel, {
            limit: -1,
            returnBuffer: false,
            fileName: `${message.channel.name}.html`,
        });
        message.reply({content: `Transcript for: ${message.channel}.`, files: [attachment]});
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
  