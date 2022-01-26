const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const rainyConfig = require('../../config.json')

module.exports = {
    name: "whowouldwin",
    usage: ["Who would win in a fight? Add their profile URL's here```{prefix}whowouldwin <imageurlUser1> <imageurlUser2>```"],
    enabled: true,
    aliases: ["fight"],
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
                var imageurl1 = args[0]
            } else {
                message.reply("You must set a profile picture for the first person. To do this, get a image that ends in .png for it to work best; however, this does work with most image files. \n\n Wanna make this fun? Make this your friends profile picture!")
                message.channel.send('Do you want the PFP to just be blank? Use this link for an image: https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
                return;
            }
            if (args[1]) {
                var imageurl2 = args[1]
            } else {
                message.reply("You must set a profile picture for the second person. To do this, get a image that ends in .png for it to work best; however, this does work with most image files. \n\n Wanna make this fun? Make this your friends profile picture!")
                message.channel.send('Do you want the PFP to just be blank? Use this link for an image: https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png')
                return;
            }
            const res = await fetch(`https://nekobot.xyz/api/imagegen?type=whowouldwin&user1=${imageurl1}&user2=${imageurl2}`);
            const img = (await res.json()).message;
            const wwwEmbed = new MessageEmbed()
            .setImage(img)
            .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor)
            message.reply({ embeds: [wwwEmbed] })
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