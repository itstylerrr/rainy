const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Message,
  WebhookClient,
} = require("discord.js");
const { Webhooks, ownerid } = require("../../config.json");
const DB = require("../../Database/Schema/Guild");

module.exports = {
  name: "setlogging",
  usage: [
    "Set the log channel for your server:```{prefix}setlogging <channelId>``` To disable logging: ```{prefix}setlogging remove```",
  ],
  enabled: true,
  aliases: ["logging"],
  category: "Admin",
  memberPermissions: ["ADMINISTRATOR"],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 5000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
    try {
      const guildDb = await DB.findOne({
        id: message.guild.id,
      });
      chFromDb = guildDb.addons.settings.loggingId;
      const findCh = await client.tools.resolveChannel(chFromDb, message.guild);
      if (!findCh) {
      } else {
        const currentDate = new Date();
        const logEmbed = new MessageEmbed()
          .setTitle("📜 rainy's logging 📜")
          .addFields(
            { name: "Command Name:", value: data.cmd.name },
            { name: "Command Type:", value: data.cmd.category },
            { name: "Ran By:", value: `<@${message.author.id}>` },
            { name: "Ran In:", value: `<#${message.channel.id}>` },
            { name: "Time Ran:", value: `${currentDate.toLocaleString()} CST` },
            { name : "Timestamp:", value: `<t:${parseInt(message.createdTimestamp / 1000)}:R>`}
          )
          .setFooter(
            `Ran by: ${message.member.displayName}`,
            message.author.displayAvatarURL({ dynamic: true })
          )
          .setTimestamp()
          .setColor(message.guild.me.displayHexColor);
        findCh.send({ embeds: [logEmbed] });
      }
      if (!args[0])
        return message.reply({
          content: `Incorrect usage: \n\n ${data.cmd.usage}`,
        });
      if (args[0].toLowerCase() === "remove") {
        await DB.findOneAndUpdate(
          { id: message.guild.id },
          { "addons.settings.loggingId": null }
        );
        await message.reply("Remove logging from this server.");
        return;
      }
      const verifyEmbed = new MessageEmbed()
        .setTitle("Are you sure?")
        .setDescription(
          "You mentioned this channel to be the channel that receives logs for admin commands such as kick and ban commands. Please click the check if this is correct."
        )
        .setTimestamp()
        .setColor("RED");
      const finishEmbed = new MessageEmbed()
        .setTitle("✅ Confirmed ✅")
        .setDescription("This channel is now your logging channel.")
        .setTimestamp()
        .setColor("GREEN");
      const failEmbed = new MessageEmbed()
        .setTitle("❌ Failed ❌")
        .setDescription("The process has been canceled.")
        .setTimestamp()
        .setColor("RED");
      const btnRow = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("confirmBtn")
          .setDisabled(false)
          .setLabel("✅")
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("declineBtn")
          .setDisabled(false)
          .setLabel("❌")
          .setStyle("SECONDARY")
      );
      const confirmFinishRow = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("confirmBtn")
          .setDisabled(true)
          .setLabel("✅")
          .setStyle("SUCCESS"),
        new MessageButton()
          .setCustomId("declineBtn")
          .setDisabled(true)
          .setLabel("❌")
          .setStyle("SECONDARY")
      );
      const declineFinishRow = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("confirmBtn")
          .setDisabled(true)
          .setLabel("✅")
          .setStyle("SECONDARY"),
        new MessageButton()
          .setCustomId("declineBtn")
          .setDisabled(true)
          .setLabel("❌")
          .setStyle("SUCCESS")
      );
      if (!args[0]) return message.reply("You must mention a channel.");
      let channel = await client.tools.resolveChannel(args[0], message.guild);
      if (!channel)
        return message.reply("Unable to find the mentioned channel");
      channel.send(
        `We believe this message is for you <@${message.author.id}>... 👇`
      );
      channel.send({
        embeds: [verifyEmbed],
        components: [btnRow],
      });
      const filter = (i) => ["confirmBtn", "declineBtn"].includes(i.customId);
      const collector = channel.createMessageComponentCollector({
        filter,
        max: 1,
        time: 1000 * 15,
      });
      collector.on("collect", async (i) => {
        if (i.customId === "confirmBtn") {
          try {
            await DB.findOneAndUpdate(
              { id: message.guild.id },
              { "addons.settings.loggingId": channel.id }
            );
          } catch (err) {
            await i.update({
              content: `Error updating database, talk to developers... \`\`\`${err}\`\`\``,
            });
          }
          await i.update({
            embeds: [finishEmbed],
            components: [confirmFinishRow],
          });
        } else {
          if (i.customId === "declineBtn") {
            await i.update({
              embeds: [failEmbed],
              components: [declineFinishRow],
            });
          }
        }
      });
    } catch (err) {
      client.logger.error(`Ran into an error while executing ${data.cmd.name}`);
      console.log(err);
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
