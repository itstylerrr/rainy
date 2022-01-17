const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "beg",
    usage: ["Try to beg for coins."],
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
        const randomNumber = Math.floor(Math.random() * 100) + 1;
        
        data.user.cash = data.user.cash + randomNumber
        await data.user.save()
        const finishedEmbed = new MessageEmbed()
        .setTitle('⛈️raining cash!')
        .setDescription(`You earned $${randomNumber} by begging!`)
        .setColor('GREEN')
        .setTimestamp()
        message.reply({ embeds: [finishedEmbed] })
    }
}