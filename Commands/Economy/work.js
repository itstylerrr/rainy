const { MessageEmbed } = require('discord.js')
const Jwork = require('../../Extra/Files/jobs.json')
const JworkR = Jwork[Math.floor(Math.random() * Jwork.length)];
const ms = (milliseconds) => {
    if (typeof milliseconds !== 'number') {
        throw new TypeError('Expected a number');
    }

    return {
        days: Math.trunc(milliseconds / 86400000),
        hours: Math.trunc(milliseconds / 3600000) % 24,
        minutes: Math.trunc(milliseconds / 60000) % 60,
        seconds: Math.trunc(milliseconds / 1000) % 60,
        milliseconds: Math.trunc(milliseconds) % 1000,
        microseconds: Math.trunc(milliseconds * 1000) % 1000,
        nanoseconds: Math.trunc(milliseconds * 1e6) % 1000
    };
}

module.exports = {
    name: "work",
    usage: ["Work a job! \n \n <PREFIX>work"],
    enabled: true,
    aliases: [],
    category: "Economy",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,

    // Execute contains content for the command
    async execute(client, message, args, data){
        let user = message.author;
        let author = await data.user.workcd
        let timeout = 1800000;

        if (author !== null && timeout - (Date.now() - author) > 0) {
            let time = ms(timeout - (Date.now() - author));

            let timeEmbed = new MessageEmbed()
            .setColor("GREEN")
            .setDescription(`❌ You have already worked recently\n\nTry again in ${time.minutes}m ${time.seconds}s `);
            message.reply({ embeds: [timeEmbed] })
        } else {
            let amount = Math.floor(Math.random() * 1000) + 1;
            let embed1 = new MessageEmbed()
                .setColor("GREEN")
                .setTitle('💰 You got the bag! 💰')
                .setDescription(`${JworkR}  **$${amount}**`)
                message.reply({ embeds: [embed1] })

                data.user.bank = Number(data.user.bank) + Number(amount)
                data.user.workcd = Date.now()
                data.user.save();
        }
    }
}