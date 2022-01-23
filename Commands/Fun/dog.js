const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: "dog",
    usage: ["Get a cute picture of a dog!```{prefix}dog ```"],
    enabled: true,
    aliases: ["dogs"],
    category: "Fun",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try{
            const res = await fetch('https://dog.ceo/api/breeds/image/random');
            const img = (await res.json()).message;
            const dogEmbed = new MessageEmbed()
            .setTitle('🐶  Woof!  🐶')
            .setImage(img)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor)
            message.reply({ embeds: [dogEmbed] })
        }catch(err){
            client.logger.error(`Ran into an error while executing ${data.cmd.name}`)
            console.log(err)
            return client.embed.send(message, {
                description: `An issue has occured while running the command. If this error keeps occuring please contact our development team.`,
                color: `RED`,
                author: {
                    name: `Uh Oh!`,
                    icon_url: `${message.author.displayAvatarURL()}`,
                    url: "",
                }
            });
        }
    }
}