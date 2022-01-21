const { MessageEmbed } = require('discord.js')
const slotItems = ["🍇", "🍉", "🍌", "🍎", "🍒"];

module.exports = {
    name: "slots",
    usage: ["Play a game of slots to try to multiply your money!"],
    enabled: true,
    aliases: ["gamble"],
    category: "Economy",
    memberPermissions: [],
    botPermissions: [ "SEND_MESSAGES", "EMBED_LINKS" ],
    //Settings for command
    nsfw: false,
    ownerOnly: false,
    // cooldown: 60000,

    // Execute contains content for the command
    async execute(client, message, args, data){
        let user = message.author;
        let money = parseInt(args[0]);
        let win = false;

        if (!money){
            const noMoney = new MessageEmbed()
            .setTitle('🎰 you gotta bet something! 🎰')
            .setColor('RED')
            message.reply({ embeds: [noMoney] })
            return;
        }

        if (money > data.user.cash){
            const noDBMoney = new MessageEmbed()
            .setTitle('🎰 oh you poor looser! 🎰')
            .setDescription('you really think you can come to my casino with no money? LEAVE!')
            .setColor('RED')
            message.reply({ embeds: [noDBMoney] })
            return;
        }

        let number = []
        for (let i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }

        if (number[0] == number[1] && number[1] == number[2])  { 
            money *= 9
            win = true;
        } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
            money *= 3
            win = true;
        }

        if (win) {
            let slotsWin = new MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou won ${money} coins`)
            .setColor("GOLD")
            message.reply({ embeds: [slotsWin] })
            data.user.cash = Number(data.user.cash) + Number(money)
            data.user.save();
        } else {
            let slotsLoose = new MessageEmbed()
            .setDescription(`${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}\n\nYou lost ${money} coins`)
            .setColor("RED")
            message.reply({ embeds: [slotsLoose] })
            data.user.cash = Number(data.user.cash) - Number(money)
            data.user.save();
        }

    }
}