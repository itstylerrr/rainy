const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const rainyConfig = require('../../config.json')
const key = rainyConfig.API.catApi

module.exports = {
    name: "phcomment",
    usage: ["Generate an image that looks like a ph comment!```{prefix}phcomment <username> <imageurl> <text> ```"],
    enabled: true,
    aliases: ["ph-comment"],
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
                var username = args[0]
            } else {
                message.reply("You must set a username for the comment. \n\n Wanna make this fun? Make this your friends username!")
                return;
            }
            if (args[1]) {
                var imageurl = args[1]
            } else {
                message.reply("You must set a profile picture for the comment. To do this, get a image that ends in .png for it to work best; however, this does work with most image files. \n\n Wanna make this fun? Make this your friends profile picture!")
                message.channel.send('Do you want the PFP to just be blank? Use this link for an image: https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
                return;
            }
            if (args[2]) {
                var text = message.content.slice(message.content.indexOf(args[2]), message.content.length)
            } else {
                message.reply("You must set text for the comment. \n\n Wanna make this fun? Make this something your friend would say!")
                return;
            }
            const res = await fetch(`https://nekobot.xyz/api/imagegen?type=phcomment&username=${username}&text=${text}&image=${imageurl}`);
            const img = (await res.json()).message;
            const phcommentEmbed = new MessageEmbed()
            .setImage(img)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor)
            message.reply({ embeds: [phcommentEmbed] })
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