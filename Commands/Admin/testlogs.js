// const Discord = require("discord.js");

// module.exports = {
//   name: "testlogs",
//   usage: ["Test logging for your server."],
//   enabled: true,
//   aliases: [],
//   category: "Admin",
//   memberPermissions: ["ADMINISTRATOR"],
//   botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
//   //Settings for command
//   nsfw: false,
//   ownerOnly: false,
//   cooldown: 5000,

//   // Execute contains content for the command
//   async execute(client, message, args, data) {
//     try {
//         message.reply('Server logs tested... If enabled, check your logging channel that you set for rainy. If disabled, nothing besides this should be sent anywhere when this was ran.')
//       const loggingId = data.guild.addons.settings.loggingId;
//       if (loggingId == false) return;
//       const loggingCh = client.channels.cache.get(loggingId);
//       const currentDate = new Date();
//       const logEmbed = new Discord.MessageEmbed()
//         .setTitle("📜 rainy's logging 📜")
//         .addFields(
//           { name: "Command Name:", value: data.cmd.name },
//           { name: "Command Type:", value: data.cmd.category },
//           { name: "Ran By:", value: `<@${message.author.id}>` },
//           { name: "Ran In:", value: `<#${message.channel.id}>` },
//           { name: "Time Ran:", value: `${currentDate.toLocaleString()} CST` }
//         )
//         .setFooter(`Ran by: ${message.member.displayName}`, message.author.displayAvatarURL({ dynamic: true }))
//         .setTimestamp()
//         .setColor(message.guild.me.displayHexColor);
//       loggingCh.send({ embeds: [logEmbed] });
//     } catch (err) {
//       client.logger.error(`Ran into an error while executing ${data.cmd.name}`);
//       console.log(err);
// const currentDate = new Date();
//       const errKey = keygen.url(10);
//       const errorLog = new WebhookClient({
//         url: Webhooks.errors,
//       });
//       const devEmbed = new MessageEmbed()
//         .setTitle("⛈️ Rainy | Errors ⛈️")
//         .setDescription(`**Error:**\n\n${err}\n`)
//         .addFields(
//           { name: "Command:", value: "chatbot" },
//           { name: "Error Key:", value: `\`${errKey}\`` },
//           {
//             name: "Guild:",
//             value: `Name: ${message.guild.name} | ID: ${message.guild.id}`,
//             inline: true,
//           },
//           {
//             name: "Author:",
//             value: `Name: ${message.author.tag} | ID: ${message.author.id}`,
//             inline: true,
//           },
//           {
//             name: "Created:",
//             value: `<t:${parseInt(message.createdTimestamp / 1000)}:R>`
//           }
//         )
//         .setColor("RED");

//       const userEmbed = new MessageEmbed()
//         .setTitle("⛈️ Rainy | Errors ⛈️")
//         .setDescription(
//           `An error has occured running this command. Please DM <@${ownerid}> with the following error key: \`${errKey}\``
//         )
//         .setColor("RED");
//       message.reply({ embeds: [userEmbed] });
//       errorLog.send({ embeds: [devEmbed] });
// return;
//     }
//   },
// };
