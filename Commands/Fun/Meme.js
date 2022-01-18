const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: "meme",
    usage: ["Get meme from a random subreddit```{prefix}meme```"],
    enabled: true,
    aliases: ["memes"],
    category: "Fun",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 5000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        let res = await fetch('https://meme-api.herokuapp.com/gimme');
        res = await res.json();
        const embed = new MessageEmbed()
            .setAuthor(`Subreddit: ${res.title}`)
            .setTitle(`🤣 Meme 🤣`)
            .setImage(res.url)
            .setFooter(message.member.displayName, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor);
        message.channel.send({ embeds: [embed] });
    }
}