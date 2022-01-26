const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const rainyConfig = require('../../config.json')

module.exports = {
    name: "kannagen",
    usage: ["Add text to kannafy!```{prefix}kannagen <text>```"],
    enabled: true,
    aliases: ["kannafy"],
    category: "Image Manipulation",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        try{
            if (args[0]) {
                var text = message.content.slice(message.content.indexOf(args[0]), message.content.length)
            } else {
                message.reply("You must set text for the message.")
                return;
            }
            const res = await fetch(`https://nekobot.xyz/api/imagegen?type=kannagen&text=${text}`);
            const img = (await res.json()).message;
            const kannafyEmbed = new MessageEmbed()
            .setImage(img)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor)
            message.reply({ embeds: [kannafyEmbed] })
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