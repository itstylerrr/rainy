const Discord = require("discord.js");
const rainy = require("../rainy");
const rainyConfig = require("../rainy.json");
const chalk = require("chalk");
const guildModel = require('../models/guildSchema')

rainy.on("guildCreate", async (guild) => {
// [ Sending rainy's embed to explain the bot when joining server. ]
    const newChannel = guild.channels.cache.find(channel => channel.type === 'GUILD_TEXT' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))

    const setupEmbed = new Discord.MessageEmbed()
    .setTitle('⛈️rainy setup⛈️')
    .setColor('#36393F')
    .setDescription(
    `hey, thanks for inviting me to your server. i will walk you through the setup process!
     \n \n1. join the support server in case you have any difficulty: ${rainyConfig.serverInvite}
     \n2. go to your mod channel.
     \n3. run the command: 'setup , please use the following buttons that have bot topics on then, then choose which one you want the bot to be, then i will auto generate settings for your server! *dont worry! you can always edit settings by running: 'settings.
     \n3. after this you are... almost done! please view the help command by running: 'help
     \n4. ok fine ill let you go, but you need to drag my premade role called "rainy -app-"
     \n\nwait!!! would you do me a favor and leave a star on our github page? ${rainyConfig.githubLink}`
     )
     .setFooter('💖made with love -tyler :)')
     .setTimestamp()
     
     newChannel.send({ embeds: [setupEmbed]})

// [ Sending all of the servers basic info to DB ]
        let guildProfile = await guildModel.create({
            guildID: guild.id,
            ownerID: guild.ownerId
        });
        guildProfile.save();
  })