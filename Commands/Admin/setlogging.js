const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Message,
} = require("discord.js");

module.exports = {
  name: "setlogging",
  usage: [
    "Set the log channel for your server.```{prefix}setlogging <channelId>``` To disable logging: ```{prefix}setlogging remove",
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
        if (args[0].toLowerCase() === "remove") {
            data.guild.addons.settings.loggingId = false
            data.guild.markModified('addons.settings');
            await data.guild.save();
            await message.reply('Remove logging from this server.')
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
    channel.send(`We believe this message is for you <@${message.author.id}>... 👇`)
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
                data.guild.addons.settings.loggingId = channel.id
                data.guild.markModified('addons.settings');
                await data.guild.save();
            } catch (err) {
                await i.update({
                    content: `Error updating database, talk to developers... \`\`\`${err}\`\`\``
                })
            }
          await i.update({
            embeds: [finishEmbed],
            components: [confirmFinishRow]
          });
        } else {
          if (i.customId === "declineBtn") {
            await i.update({
              embeds: [failEmbed],
              components: [declineFinishRow]
            });
          }
        }
      });
      // data.guild.addons.settings.loggingId = channel.id
      // data.guild.markModified('addons.settings');
      // await data.guild.save();
    } catch (err) {
      client.logger.error(`Ran into an error while executing ${data.cmd.name}`);
      console.log(err);
      return client.embed.send(message, {
        description: `An issue has occured while running the command. If this error keeps occuring please contact our development team.`,
        color: `RED`,
        author: {
          name: `Uh Oh!`,
          icon_url: `${message.author.displayAvatarURL()}`,
          url: "",
        },
      });
    }
  },
};
