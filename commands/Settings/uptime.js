const { MessageEmbed, Message, Client } = require("discord.js");
const moment = require('moment');

module.exports = {
  name: "uptime",
  aliases: ["up"],
  emoji: "🆙",
  description: "Gives the bots session uptime.",
  /**
   *
   * @param {Client} rainy
   * @param {Message} message
   * @param {String} args
   * @returns
   */
  run: async (rainy, message, args) => {
    const d = moment.duration(message.client.uptime);
    const days = d.days() == 1 ? `${d.days()} day` : `${d.days()} days`;
    const hours = d.hours() == 1 ? `${d.hours()} hour` : `${d.hours()} hours`;
    const minutes =
      d.minutes() == 1 ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
    const seconds =
      d.seconds() == 1 ? `${d.seconds()} second` : `${d.seconds()} seconds`;
    const date = moment().subtract(d, "ms").format("dddd, MMMM Do YYYY");
    const embed = new MessageEmbed()
      .setTitle("rainys uptime")
      .setDescription(
        `\`\`\`prolog\n${days}, ${hours}, ${minutes}, and ${seconds}\`\`\``
      )
      .addField("Date Launched", date)
      .setFooter(
        message.member.displayName,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    message.reply({ embeds: [embed] })
  },
};
