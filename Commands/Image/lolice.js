const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const rainyConfig = require('../../config.json')

module.exports = {
    name: "lolice",
    usage: ["Lolice cheif!```{prefix}lolice <imageurl>```"],
    enabled: true,
    aliases: [""],
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
                try{
                    let member = await client.tools.resolveMember(args[0], message.guild)
                    var imageurl = member.displayAvatarURL();
                    }catch (err) {
                        message.reply(`Please mention a user! \n \n Error: \`${err}\``)
                        return;
                    }
            } else {
                message.reply("You must set a picture for the image. To do this, just ping a user!")
                return;
            }
            const res = await fetch(`https://nekobot.xyz/api/imagegen?type=lolice&url=${imageurl}`);
            const img = (await res.json()).message;
            const loliceEmbed = new MessageEmbed()
            .setImage(img)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor)
            message.reply({ embeds: [loliceEmbed] })
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