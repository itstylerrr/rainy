const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "job",
    usage: ["Get hired by a company! ```<PREFIX>job <param>```"],
    enabled: true,
    aliases: [],
    category: "Economy",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 300000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        const btnRow = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("programmerJob")
              .setDisabled(false)
              .setLabel("🧑‍💻Programmer🧑‍💻")
              .setStyle("PRIMARY"),
            new MessageButton()
              .setCustomId("shopOwnerJob")
              .setDisabled(false)
              .setLabel("🏪Shop Owner🛍️")
              .setStyle("PRIMARY"),
            new MessageButton()
              .setCustomId("fishermanJob")
              .setDisabled(false)
              .setLabel("🎣Fisherman🐟")
              .setStyle("PRIMARY")
          );
    
          const finishedRow = new MessageActionRow().addComponents(
            new MessageButton()
              .setLabel("Visit Website!")
              .setURL("https://bitly.com/98K8eH")
              .setStyle("LINK")
          );
    
          const descEmbed = new MessageEmbed()
            .setTitle("")
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
            .addFields(
              { name: "server type:", value: "🥳Fun & Games🎮" },
              { name: "server id:", value: guildData.guildID, inline: true },
              { name: "owner id:", value: guildData.ownerID, inline: true },
              { name: "bot type:", value: "typeFun" },
              { name: "economy:", value: "enabled" }
            )
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
}