const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const jobsJson = require("../../Extra/Files/jobs.json");

module.exports = {
  name: "job",
  usage: ["Get hired by a company! ```<PREFIX>job <param>```"],
  enabled: true,
  aliases: ["jobs"],
  category: "Economy",
  memberPermissions: [],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  cooldown: 300000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
    try {
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
          {
            name: "Occupation:",
            value: jobsJson.jobs.programmer.name,
            inline: true,
          },
          {
            name: "Income:",
            value: `**$** ${jobsJson.jobs.programmer.income}`,
            inline: true,
          },
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
          {
            name: "Occupation:",
            value: jobsJson.jobs.shopOwner.name,
            inline: true,
          },
          {
            name: "Income:",
            value: `**$** ${jobsJson.jobs.shopOwner.income}`,
            inline: true,
          },
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
          {
            name: "Occupation:",
            value: jobsJson.jobs.fisherman.name,
            inline: true,
          },
          {
            name: "Income:",
            value: `**$** ${jobsJson.jobs.fisherman.income}`,
            inline: true,
          },
          { name: "Description:", value: jobsJson.jobs.fisherman.description }
        )
        .setColor("GREEN")
        .setFooter("💖made with love -tyler :)")
        .setTimestamp();

      message.reply({
        embeds: [descEmbed],
        components: [btnRow],
      });

      const filter = (i) =>
        ["programmerJob", "shopOwnerJob", "fishermanJob"].includes(i.customId);
      const collector = message.channel.createMessageComponentCollector({
        filter,
        max: 1,
        time: 1000 * 15,
      });
      collector.on("collect", async (i) => {
        if (i.customId === "programmerJob") {
          if (
            data.user.items.computer === false ||
            data.user.items.ideLicense === false ||
            data.user.items.server === false
          ) {
            return i.reply(
              `You do not have the required items to get hired as a programmer... \nYou need: **${jobsJson.shop.computer.name}, ${jobsJson.shop.ideLicense.name}, ${jobsJson.shop.server.name}.** to get hired. \nUse \`<PREFIX>buy <ITEM>\` to buy these.`
            );
          } else {
            data.user.job = 1;
            data.user.markModified();
            await data.user.save();
            await i.update({
              embeds: [programmerEmbed],
              components: [finishedRow],
            });
          }
        } else if (i.customId === "shopOwnerJob") {
          if (
            data.user.items.store === false ||
            data.user.items.stock === false
          ) {
            return i.reply(
              `You do not have the required items to start your own business... \nYou need: **${jobsJson.shop.store.name}, ${jobsJson.shop.stock.name}.** to get started. \nUse \`<PREFIX>buy <ITEM>\` to buy these.`
            );
          } else {
            data.user.job = 2;
            data.user.markModified();
            await data.user.save();
            await i.update({
              embeds: [shopownerEmbed],
              components: [finishedRow],
            });
          }
        } else {
          if (i.customId === "fishermanJob") {
            if (
              data.user.items.fishingRod === false ||
              data.user.items.boat === false
            ) {
              return i.reply(
                `You do not have the required items to start fishing... \nYou need: **${jobsJson.shop.fishingRod.name}, ${jobsJson.shop.boat.name}.** to get hired. \nUse \`<PREFIX>buy <ITEM>\` to buy these.`
              );
            } else {
              data.user.job = 3;
              data.user.markModified();
              await data.user.save();
              await i.update({
                embeds: [fishermanEmbed],
                components: [finishedRow],
              });
            }
          }
        }
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
