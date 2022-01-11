const {
  MessageActionRow,
  MessageButton,
  Permissions,
  MessageEmbed,
} = require("discord.js");

module.exports = {
  name: "setup",
  aliases: ["start"],
  emoji: "👋",
  description: "Use this command to start the setup process with rainy",
  /**
   *
   * @param {Client} rainy
   * @param {Message} message
   * @param {String} args
   * @returns
   */
  run: async (rainy, message, args) => {
    if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      message.reply("sorry! this command can only be ran by server admins!");
    } else {
      const btnRow = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("funBtn")
          .setDisabled(false)
          .setLabel("🥳Fun & Games🎮")
          .setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId("modBtn")
          .setDisabled(false)
          .setLabel("🚔Moderation🛠️")
          .setStyle("PRIMARY"),
        new MessageButton()
          .setCustomId("gaBtn")
          .setDisabled(false)
          .setLabel("🎉Giveaway🎟️")
          .setStyle("PRIMARY")
      );

      const finishedRow = new MessageActionRow().addComponents(
        new MessageButton()
          .setLabel("Visit Website!")
          .setURL("https://bitly.com/98K8eH")
          .setStyle("LINK")
      );

      const descEmbed = new MessageEmbed()
        .setTitle("⛈️rainy setup⛈️")
        .setDescription(
          "hey! please use the following buttons that have bot topics on then, then choose which one you want the bot to be, then i will auto generate settings for your server! *dont worry! you can always edit settings by running: `'settings`"
        )
        .setColor("#36393F")
        .setFooter("💖made with love -tyler :)")
        .setTimestamp();

      const funClickedEmbed = new MessageEmbed()
        .setTitle("⛈️rainy setup⛈️")
        .setDescription(
          "the settings that were changed/added/removed can be viewed down below"
        )
        .addFields({ name: "server type:", value: "🥳Fun & Games🎮" })
        .setColor("GREEN")
        .setFooter("💖made with love -tyler :)")
        .setTimestamp();

      const modClickedEmbed = new MessageEmbed()
        .setTitle("⛈️rainy setup⛈️")
        .setDescription(
          "the settings that were changed/added/removed can be viewed down below"
        )
        .addFields({ name: "server type:", value: "🚔Moderation🛠️" })
        .setColor("GREEN")
        .setFooter("💖made with love -tyler :)")
        .setTimestamp();

        const gaClickedEmbed = new MessageEmbed()
        .setTitle("⛈️rainy setup⛈️")
        .setDescription(
          "the settings that were changed/added/removed can be viewed down below"
        )
        .addFields({ name: "server type:", value: "🎉Giveaway🎟️" })
        .setColor("GREEN")
        .setFooter("💖made with love -tyler :)")
        .setTimestamp();

      message.reply({
        embeds: [descEmbed],
        components: [btnRow],
        ephemeral: true,
      });

      const filter = (i) => ["funBtn", "modBtn", "gaBtn"].includes(i.customId);
      const collector = message.channel.createMessageComponentCollector({
        filter,
        max: 1,
        time: 1000 * 15,
      });

      collector.on("collect", async (i) => {
        if (i.customId === "funBtn") {
          await i.update({
            embeds: [funClickedEmbed],
            components: [finishedRow],
          });
        } else if (i.customId === "modBtn") {
          await i.update({
            embeds: [modClickedEmbed],
            components: [finishedRow],
          });
        } else {
          if (i.customId === "gaBtn") {
            await i.update({
              embeds: [gaClickedEmbed],
              components: [finishedRow],
            });
          }
        }
      });
    }
  },
};

// savage! discord help buttnsons
