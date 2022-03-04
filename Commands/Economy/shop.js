const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Message,
} = require("discord.js");
const jobsJson = require("../../Extra/Files/jobs.json");

module.exports = {
  name: "shop",
  usage: ["Buy things in the shop! ```<PREFIX>shop```"],
  enabled: true,
  aliases: ["store", "buy"],
  category: "Economy",
  memberPermissions: [],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 15000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
    const btnRow1 = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("stock")
        .setDisabled(false)
        .setLabel("📦 (Stock)")
        .setStyle("PRIMARY"),
      new MessageButton()
        .setCustomId("store")
        .setDisabled(false)
        .setLabel("🏪 (Unowned Store)")
        .setStyle("PRIMARY"),
      new MessageButton()
        .setCustomId("boat")
        .setDisabled(false)
        .setLabel("🚤 (Boat)")
        .setStyle("PRIMARY")
    );
    const btnRow2 = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("computer")
        .setDisabled(false)
        .setLabel("💻 (Computer)")
        .setStyle("PRIMARY"),
      new MessageButton()
        .setCustomId("fishingRod")
        .setDisabled(false)
        .setLabel("🎣 (Fishing Rod)")
        .setStyle("PRIMARY"),
      new MessageButton()
        .setCustomId("ideLicense")
        .setDisabled(false)
        .setLabel("🎫 (Ide License)")
        .setStyle("PRIMARY")
    );
    const btnRow3 = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("server")
        .setDisabled(false)
        .setLabel("🌐 (Server)")
        .setStyle("PRIMARY")
    );

    message.reply({
      content:
        '"Hey, welcome to the store, please take a look around our vast selection of products!"',
      components: [btnRow1, btnRow2, btnRow3],
    });

    const filter = (i) =>
      [
        "stock",
        "store",
        "boat",
        "computer",
        "fishingRod",
        "ideLicense",
        "server",
      ].includes(i.customId);
    const collector = message.channel.createMessageComponentCollector({
      filter,
      max: 1,
      time: 1000 * 15,
    });
    collector.on("collect", async (i) => {
      if (i.customId === "stock") {
        if (data.user.items.stock === true) {
          i.update({
            content:
              "You already have the stock. Please visit the store again.",
            components: [],
          });
        }
      } else {
        data.user.cash -= Number(jobsJson.shop.stock.price);
        data.user.items.stock = true;
        data.user.markModified();
        await data.user.save();
        i.update({
          content: `Thank you for your purchase of ${jobsJson.shop.stock.name} for $${jobsJson.shop.stock.price}!`,
        });
        return;
      }
    });
  },
};
