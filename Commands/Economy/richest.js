const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "richest",
    usage: ["Shows the richest users of rainy's economy system."],
    enabled: true,
    aliases: [],
    category: "Economy",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        const top10 = await data.user.find({}).sort({ bank: -1 }).limit(10)
        const rich1t = Math.floor(top10[0].bank + top10[0].cash)

        const richEmbed = new MessageEmbed()
        .setTitle('🤑rainy\'s richest users🤑')
        .setDescription(`
        ***1.*** <@${top10[0].id}>
        **💵 Total:** ${rich1t}
        `)
    }
}