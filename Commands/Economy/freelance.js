const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "freelance",
    usage: ["Need some quick cash? List as a freelancer!"],
    enabled: true,
    aliases: ["quick-cash"],
    category: "Economy",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    cooldown: 900000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        const JOBS = [
            'Handyman',
            'Tutor',
            'Lawn Mower',
            'Caretaker',
            'Dog Walker',
            'Pet Sitter',
            'Babysitter'
        ];
    
        let chosenJOBS = JOBS.sort(() => Math.random() - Math.random()).slice(0, 3);

        message.reply(
            `**Hey! I found some freelance listings available, choose which one you would like to do.** 🔍\nType the job in this channel.\n\`${chosenJOBS.join("` `")}\``
          );
    
        const RANDOM_NUMBER = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
    
        const filter = (m) => {
          return chosenJOBS.some((answer) => answer.toLowerCase() === m.content.toLowerCase()) && m.author.id === message.author.id && m.author.bot;
        };
    
        const collector = message.channel.createMessageCollector({ filter, max: 1, time: 15000 });
    
        collector.on("collect", async (m) => {
          const EMBED = new MessageEmbed()
            .setColor("#ffa500")
            .setTitle(`${message.author.username} worked as a ${m.content} 💵`)
            .setDescription(`You earned 💵 ${RANDOM_NUMBER.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`)
            .setFooter(`A hard worker you are I see!`);
    
            data.user.cash += RANDOM_NUMBER
            await data.user.save();
    
          message.channel.send({ embeds: [EMBED] });
        });
    
        collector.on("end", (collected) => {
          if (collected.size == 0) {
            return message.reply("**You forgot to show up!**");
          }
        });
    }
}