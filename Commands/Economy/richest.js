const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const User = require("../../Database/Schema/User");

module.exports = {
  name: "richest",
  usage: ["Shows the richest users of rainy's economy system."],
  enabled: true,
  aliases: [],
  category: "Economy",
  memberPermissions: [],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 5000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
    const top10 = await User.find({}).sort({ coins: -1 }).limit(10);
    const rich1t = top10[0]
      ? Math.floor(top10[0].bank + top10[0].cash)
      : "nothing!";
    const rich2t = top10[1]
      ? Math.floor(top10[1].bank + top10[1].cash)
      : "nothing!";
    const rich3t = top10[2]
      ? Math.floor(top10[2].bank + top10[2].cash)
      : "nothing!";
    const rich4t = top10[3]
      ? Math.floor(top10[3].bank + top10[3].cash)
      : "nothing!";
    const rich5t = top10[4]
      ? Math.floor(top10[4].bank + top10[4].cash)
      : "nothing!";
    const rich6t = top10[5]
      ? Math.floor(top10[5].bank + top10[5].cash)
      : "nothing!";
    const rich7t = top10[6]
      ? Math.floor(top10[6].bank + top10[6].cash)
      : "nothing!";
    const rich8t = top10[7]
      ? Math.floor(top10[7].bank + top10[7].cash)
      : "nothing!";
    const rich9t = top10[8]
      ? Math.floor(top10[8].bank + top10[8].cash)
      : "nothing!";
    const rich10t = top10[9]
      ? Math.floor(top10[9].bank + top10[9].cash)
      : "nothing!";

    const btnRow = new MessageActionRow().addComponents(
      new MessageButton().setCustomId(`p1`).setLabel("⬅️").setStyle("SUCCESS"),
      new MessageButton().setCustomId(`p2`).setLabel("➡️").setStyle("SUCCESS")
    );
    const finishedBtnRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId(`p1`)
        .setLabel("⬅️")
        .setStyle("SUCCESS")
        .setDisabled(true),
      new MessageButton()
        .setCustomId(`p2`)
        .setLabel("➡️")
        .setStyle("SUCCESS")
        .setDisabled(true)
    );

    const richEmbed1 = new MessageEmbed()
      .setTitle("🤑rainy's richest users🤑")
      .setColor("GOLD")
      .setFooter("economy by rainy")
      .setTimestamp().setDescription(`
        ***1.*** <@${top10[0].id}>
        **💵 Total:** ${rich1t}

        ***2.*** <@${top10[1] ? top10[1].id : "Nobody!"}>
        **💵 Total:** ${rich2t}

        ***3.*** <@${top10[2] ? top10[2].id : "Nobody!"}>
        **💵 Total:** ${rich3t}

        ***4.*** <@${top10[3] ? top10[3].id : "Nobody!"}>
        **💵 Total:** ${rich4t}

        ***5.*** <@${top10[4] ? top10[4].id : "Nobody!"}>
        **💵 Total:** ${rich5t}
        `);

    const richEmbed2 = new MessageEmbed()
      .setTitle("🤑rainy's richest users🤑")
      .setColor("GOLD")
      .setFooter("economy by rainy")
      .setTimestamp().setDescription(`
        ***6.*** <@${top10[6] ? top10[6].id : "Nobody!"}>
        **💵 Total:** ${rich6t}

        ***7.*** <@${top10[7] ? top10[7].id : "Nobody!"}>
        **💵 Total:** ${rich7t}

        ***8.*** <@${top10[8] ? top10[8].id : "Nobody!"}>
        **💵 Total:** ${rich8t}

        ***9.*** <@${top10[9] ? top10[9].id : "Nobody!"}>
        **💵 Total:** ${rich9t}

        ***10.*** <@${top10[10] ? top10[10].id : "Nobody!"}>
        **💵 Total:** ${rich10t}
        `);

    const finishedEmbed = new MessageEmbed()
      .setTitle("❌Times Up!❌")
      .setDescription(
        "sorry, we have disabled the buttons on this message to save bandwidth! you can always just run the command again. \n PSA: the buttons last 15 seconds!"
      )
      .setColor("RED");

    message.reply({ embeds: [richEmbed1], components: [btnRow] }).then(msg => {
        setTimeout(() => msg.delete(), 15000)
    })

    const filter = (i) => ["p1", "p2"].includes(i.customId);
    const collector = message.channel.createMessageComponentCollector({
      filter,
      time: 1000 * 15,
    });
    collector.on("collect", async (i) => {
      if (i.customId === "p1") {
        await i.update({
          embeds: [richEmbed1],
          components: [btnRow],
        });
      } else if (i.customId === "p2") {
        await i.update({
          embeds: [richEmbed2],
          components: [btnRow],
        });
      }
    });

    collector.on("end", async (i) => {
      message.reply("**time expired for buttons**");
    });
  },
};
