module.exports = {
  name: "8ball",
  usage: ["Let the 8ball answer your question```{prefix}8ball <question>```"],
  enabled: true,
  aliases: ["eightball"],
  category: "Fun",
  memberPermissions: [],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 5000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
    try {
      if (!args[0])
        return message.reply({
          content: "Please ask a question",
          allowedMentions: { repliedUser: false },
        });

      let replies = [
        "Maybe.",
        "Certainly not.",
        "I hope so.",
        "Not in your wildest dreams.",
        "There is a good chance.",
        "Quite likely.",
        "I think so.",
        "I hope not.",
        "I hope so.",
        "Never!",
        "Pfft.",
        "Sorry, bucko.",
        "Hell, yes.",
        "Hell to the no.",
        "The future is bleak.",
        "The future is uncertain.",
        "I would rather not say.",
        "Who cares?",
        "Possibly.",
        "Never, ever, ever.",
        "There is a small chance.",
        "Yes!",
        "lol no.",
        "There is a high probability.",
        "What difference does it makes?",
        "Not my problem.",
        "Ask someone else.",
      ];

      let result = replies[Math.floor(Math.random() * replies.length)];
      let question = args.slice(0).join(" ");

      return client.embed.send(message, {
        title: "MAGIC 8 BALL!",
        color: "#AA9900",
        fields: [
          {
            name: "Question:",
            value: question,
          },
          {
            name: "Answer:",
            value: result,
          },
        ],
        footer: {
          text: "",
        },
      });
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
