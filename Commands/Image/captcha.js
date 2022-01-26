const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const rainyConfig = require('../../config.json')

module.exports = {
    name: "captcha",
    usage: ["Generate a captcha form like image.```{prefix}captcha <imageurl> <username>```"],
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
                var imageurl = args[0]
            } else {
                message.reply("You must set a profile picture for the first person. To do this, get a image that ends in .png for it to work best; however, this does work with most image files. \n\n Wanna make this fun? Make this your friends profile picture!")
                message.channel.send('Do you want the PFP to just be blank? Use this link for an image: https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
                return;
            }
            if (args[1]) {
                var username = message.content.slice(message.content.indexOf(args[1]), message.content.length)
            } else {
                message.reply("You must set text for the captcha.")
                return;
            }
            const res = await fetch(`https://nekobot.xyz/api/imagegen?type=captcha&url=${imageurl}&username=${username}`);
            const img = (await res.json()).message;
            const captchaEmbed = new MessageEmbed()
            .setImage(img)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor)
            message.reply({ embeds: [captchaEmbed] })
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