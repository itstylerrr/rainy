const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "balance",
    usage: ["Check your balance for the server economy."],
    enabled: true,
    aliases: ["bal"],
    category: "Economy",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        if(args[0]) return message.reply(`Sorry! But at this moment you are only allowed to check your own balance (the IRS told us to do this) HOWEVER, you are able to do !richest to see who the most bouge.`)

        const balEmbed = new MessageEmbed()
        .setTitle('⛈️rainys bank⛈️')
        .addFields(
          {name: '📤 Wallet', value: `💵 ${data.user.cash}`, inline: true},
          {name: '🏦 Bank', value: `💵 ${data.user.bank}`, inline: true}
        )
        .setColor(message.guild.me.displayHexColor)
        .setThumbnail('https://freepngimg.com/download/dollar/64058-united-dollar-sign-states-design-icon.png')
        .setFooter(`Your assets at rainy's bank || Economy by rainy *'invite*`)

        message.reply({ embeds: [balEmbed] })
    }
}