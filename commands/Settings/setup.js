const { MessageActionRow, MessageButton, Permissions, MessageEmbed } = require("discord.js");

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
          message.reply('sorry! this command can only be ran by server admins!')
      } else {
        const btnRow = new MessageActionRow().addComponents(
            new MessageButton()
              .setCustomId("funBtn")
              .setLabel("🥳Fun & Games🎮")
              .setStyle("PRIMARY"),
            new MessageButton()
              .setCustomId("modBtn")
              .setDisabled(true)
              .setLabel("🚔Moderation🛠️")
              .setStyle("PRIMARY"),
            new MessageButton()
              .setCustomId("gaBtn")
              .setDisabled(true)
              .setLabel("🎉Giveaway🎟️")
              .setStyle("PRIMARY")
          );

          const descEmbed = new MessageEmbed()
          .setTitle('⛈️rainy setup⛈️')
          .setDescription('hey! please use the following buttons that have server topics on then, then choose which one your server falls under, then i will auto generate settings for your server! *dont worry! you can always edit settings by running: `settings.`')
          .setColor('#36393F')
          .setFooter('💖made with love -tyler :)')
          .setTimestamp()

          message.reply({ embeds: [descEmbed], components: [btnRow] })
          
      }
  },
};
