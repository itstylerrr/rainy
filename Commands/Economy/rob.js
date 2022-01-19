const { MessageEmbed } = require("discord.js");
const users = require("../../Database/Schema/User");

module.exports = {
  name: "rob",
  usage: ["Try to rob another user for coins."],
  enabled: true,
  aliases: [],
  category: "Economy",
  memberPermissions: [],
  botPermissions: ["SEND_MESSAGES", "EMBED_LINKS"],
  //Settings for command
  nsfw: false,
  ownerOnly: false,
  // cooldown: 600000,

  // Execute contains content for the command
  async execute(client, message, args, data) {
    const targetUser = await message.mentions.members.first();

    if (!targetUser || !args[0]){
        const targetEmbed = new MessageEmbed()
        .setTitle('🔫 You gotta mention someone to rob! 🔫')
        .setColor("RED")
        message.reply({ embeds: [targetEmbed] })
        return;
    }

    if(targetUser.id === message.author.id) {
            const roburselfEmbed = new MessageEmbed()
            .setTitle('🔫 Yes! Lets rob ourselves! no... 🔫')
            .setColor("RED")
            message.reply({ embeds: [roburselfEmbed] })
            return;
    }

    if(message.mentions.users.first().bot){
        const robbotEmbed = new MessageEmbed()
        .setTitle('🔫 WOW! You are quite the dumb criminal! 🔫')
        .setDescription('how in the world would you rob something that isnt real! you just tried robbing a bot for money.')
        .setColor("RED")
        message.reply({ embeds: [robbotEmbed] })
        return;
    }

    const user = await users.find({ id: `${targetUser.id}` });

    if (user[0].cash <= 0 ) {
        const poorEmbed = new MessageEmbed()
        .setTitle('🔫 Wow... I see who you are, trying to rob a poor man! 🔫')
        .setDescription('or this guy is loaded and not carrying any cash... like a rich man does!')
        .setColor("RED")
        message.reply({ embeds: [poorEmbed] })
        return;
    }
    
    // Math.floor(Math.random() * (1 + user[0].cash + 1))
  },
};
