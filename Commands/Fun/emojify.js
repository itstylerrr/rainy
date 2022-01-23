const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch')

module.exports = {
    name: "emojify",
    usage: ["Turn your normal message into a text of emojis!```{prefix}emojify <message> ```"],
    enabled: true,
    aliases: ["sayemoji"],
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
            message.delete()
            const numberMap = {
                '0': ':zero:',
                '1': ':one:',
                '2': ':two:',
                '3': ':three:',
                '4': ':four:',
                '5': ':five:',
                '6': ':six:',
                '7': ':seven:',
                '8': ':eight:',
                '9': ':nine:',
              };
    
              if (!args[0]) return message.channel.send('You must specify a message.');
              let msg = message.content.slice(message.content.indexOf(args[0]), message.content.length);
              msg = msg.split('').map(c => {
                if (c === ' ') return c;
                else if (/[0-9]/.test(c)) return numberMap[c];
                else return (/[a-zA-Z]/.test(c)) ? ':regional_indicator_' + c.toLowerCase() + ':' : '';
              }).join('');
          
              if (msg.length > 2048) {
                msg = msg.slice(0, msg.length - (msg.length - 2033)); 
                msg = msg.slice(0, msg.lastIndexOf(':')) + '**...**';
              }
          
              const embed = new MessageEmbed()
                .setTitle('😊 Emojify 😊')
                .setDescription(msg)
                .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
                .setTimestamp()
                .setColor(message.guild.me.displayHexColor);
              message.channel.send({ embeds: [embed] });
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