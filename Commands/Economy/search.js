const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

module.exports = {
  name: "search",
  usage: [
    "Search around the casino for some quick cash! \n \n `<PREFIX>search`",
  ],
  enabled: true,
  aliases: [],
  category: "Economy",
  memberPermissions: [],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 300000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
    const searchEmbed = new MessageEmbed()
      .setTitle("🔍 where do you want to search? 🔎")
      .setColor("GREEN");

    const btnRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("bathroomBtn")
        .setDisabled(false)
        .setLabel("🚽 bathroom 🧻")
        .setStyle("PRIMARY"),
      new MessageButton()
        .setCustomId("tableBtn")
        .setDisabled(false)
        .setLabel("🎲 table 🃏")
        .setStyle("PRIMARY"),
      new MessageButton()
        .setCustomId("slotBtn")
        .setDisabled(false)
        .setLabel("🎰 slot machine 🎚️")
        .setStyle("PRIMARY")
    );

    message.reply({ embeds: [searchEmbed], components: [btnRow] });

    const finishedRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("bathroomBtn")
        .setDisabled(true)
        .setLabel("🚽 bathroom 🧻")
        .setStyle("SECONDARY"),
      new MessageButton()
        .setCustomId("tableBtn")
        .setDisabled(true)
        .setLabel("🎲 poker table 🃏")
        .setStyle("SECONDARY"),
      new MessageButton()
        .setCustomId("slotBtn")
        .setDisabled(true)
        .setLabel("🎰 slot machine 🎚️")
        .setStyle("SECONDARY")
    );

    const randNum = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

    const bathFound = new MessageEmbed()
      .setTitle(
        `${message.author.username} searched in a **Dirty Bathroom** 🕵️`
      )
      .setDescription(
        `You found 💵 ${randNum
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      )
      .setColor("GOLD");

    const tableFound = new MessageEmbed()
      .setTitle(
        `${message.author.username} searched under a **Poker Table** 🕵️`
      )
      .setDescription(
        `You found 💵 ${randNum
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      )
      .setColor("GOLD");

    const slotFound = new MessageEmbed()
      .setTitle(
        `${message.author.username} searched between some **Slot Machines** 🕵️`
      )
      .setDescription(
        `You found 💵 ${randNum
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
      )
      .setColor("GOLD");

    const filter = (i) =>
      ["bathroomBtn", "tableBtn", "slotBtn"].includes(i.customId);
    const collector = message.channel.createMessageComponentCollector({
      filter,
      max: 1,
      time: 1000 * 15,
    });
    collector.on("collect", async (i) => {
      if (i.customId === "bathroomBtn") {
        await i.update({
          embeds: [bathFound],
          components: [finishedRow],
        });
        data.user.cash = Number(data.user.cash) + Number(randNum);
        data.user.save();
      } else if (i.customId === "tableBtn") {
        await i.update({
          embeds: [tableFound],
          components: [finishedRow],
        });
        data.user.cash = Number(data.user.cash) + Number(randNum);
        data.user.save();
      } else {
        if (i.customId === "slotBtn") {
          await i.update({
            embeds: [slotFound],
            components: [finishedRow],
          });
          data.user.cash = Number(data.user.cash) + Number(randNum);
          data.user.save();
        }
      }
    });
  },
};
