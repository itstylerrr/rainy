const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')
const rainyConfig = require('../../config.json')

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
                try{
                    let member = await client.tools.resolveMember(args[1], message.guild)
                    var imageurl = member.displayAvatarURL();
                    }catch (err) {
                        message.reply(`Please mention a user! \n \n Error: \`${err}\``)
                        return;
                    }
            } else {
                message.reply("You must set a picture for the image. To do this, just ping a user!")
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
            client.logger.error(`Ran into an error while executing ${data.cmd.name}`);
            console.log(err);
            const { WebhookClient, MessageEmbed } = require("discord.js");
            const { Webhooks } = require("../../config.json");
            const currentDate = new Date();
            const keygen = require("keygen");
            const errKey = keygen.url(10);
            const errorLog = new WebhookClient({
              url: Webhooks.errors,
            });
            const devEmbed = new MessageEmbed()
              .setTitle("⛈️ Rainy | Errors ⛈️")
              .setDescription(`**Error:**\n\n${err}\n`)
              .addFields(
                { name: "Command:", value: data.cmd.name },
                { name: "Error Key:", value: `\`${errKey}\`` },
                {
                  name: "Guild:",
                  value: `Name: ${message.guild.name} | ID: ${message.guild.id}`,
                  inline: true,
                },
                {
                  name: "Author:",
                  value: `Name: ${message.author.tag} | ID: ${message.author.id}`,
                  inline: true,
                },
                {
                  name: "Created:",
                  value: `<t:${parseInt(message.createdTimestamp / 1000)}:R>`,
                }
              )
              .setColor("RED");
      
            const userEmbed = new MessageEmbed()
              .setTitle("⛈️ Rainy | Errors ⛈️")
              .setDescription(
                `An error has occured running this command. Please DM <@${ownerid}> with the following error key: \`${errKey}\``
              )
              .setColor("RED");
            message.reply({ embeds: [userEmbed] });
            errorLog.send({ embeds: [devEmbed] });
            return;
        }
    }
}