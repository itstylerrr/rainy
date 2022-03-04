const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const jobsJson = require('../../Extra/Files/jobs.json')

module.exports = {
    name: "job",
    usage: ["Get hired by a company! ```<PREFIX>job <param>```"],
    enabled: true,
    aliases: ["jobs"],
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
            .setTitle("🏪 Job Listings 🧑‍💻")
            .setDescription(
              "Seems as if I have found some positions that are hiring right now! View the requirements down below, and then press choose where you want to apply!"
            )
            .setColor("#36393F")
            .setFooter("💖made with love -tyler :)")
            .setTimestamp();
    
          const programmerEmbed = new MessageEmbed()
            .setTitle("🧑‍💻 Programmer 🧑‍💻")
            .setDescription(
              `You have been hired as a **programmer** here is what changed, along with some information about your new job!`
            )
            .addFields(
              { name: "Cash:", value: `**$** ${Number(data.user.cash) - Number(jobsJson.jobs.programmer.totalCost)}` },
              { name: "Occupation:", value: jobsJson.jobs.programmer.name, inline: true },
              { name: "Income:", value: `**$** ${jobsJson.jobs.programmer.income}`, inline: true },
              { name: "Description:", value: jobsJson.jobs.programmer.description }
            )
            .setColor("GREEN")
            .setFooter("💖made with love -tyler :)")
            .setTimestamp();
    
          const shopownerEmbed = new MessageEmbed()
            .setTitle("🏪 Shop Owner 🛍️")
            .setDescription(
              `You have **created your own store** here is what changed, along with some information about your new job!`
            )
            .addFields(
              { name: "Cash:", value: `**$** ${Number(data.user.cash) - Number(jobsJson.jobs.shopOwner.totalCost)}` },
              { name: "Occupation:", value: jobsJson.jobs.shopOwner.name, inline: true },
              { name: "Income:", value: `**$** ${jobsJson.jobs.shopOwner.income}`, inline: true },
              { name: "Description:", value: jobsJson.jobs.shopOwner.description }
            )
            .setColor("GREEN")
            .setFooter("💖made with love -tyler :)")
            .setTimestamp();
    
          const fishermanEmbed = new MessageEmbed()
            .setTitle("🎣 Fisherman 🐟")
            .setDescription(
              `You **decided to start commercially fishing** here is what changed, along with some information about your new job!`
            )
            .addFields(
              { name: "Cash:", value: `**$** ${Number(data.user.cash) - Number(jobsJson.jobs.fisherman.totalCost)}` },
              { name: "Occupation:", value: jobsJson.jobs.fisherman.name, inline: true },
              { name: "Income:", value: `**$** ${jobsJson.jobs.fisherman.income}`, inline: true },
              { name: "Description:", value: jobsJson.jobs.fisherman.description }
            )
            .setColor("GREEN")
            .setFooter("💖made with love -tyler :)")
            .setTimestamp();
    
          message.reply({
            embeds: [descEmbed],
            components: [btnRow],
          });
    
          const filter = (i) => ["programmerJob", "shopOwnerJob", "fishermanJob"].includes(i.customId);
          const collector = message.channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: 1000 * 15,
          });
          collector.on("collect", async (i) => {
            if (i.customId === "programmerJob") {
              await i.update({
                embeds: [programmerEmbed],
                components: [finishedRow],
              });
            } else if (i.customId === "shopOwnerJob") {
              await i.update({
                embeds: [shopownerEmbed],
                components: [finishedRow],
              });
            } else {
              if (i.customId === "fishermanJob") {
                await i.update({
                  embeds: [fishermanEmbed],
                  components: [finishedRow],
                });
              }
            }
          });
    }
}