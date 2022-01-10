const Discord = require("discord.js");
const rainy = require("../rainy");

rainy.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    await interaction.deferReply().catch((e) => {
      console.log(e);
    });

    let cmd = rainy.slash_commands.get(interaction.commandName);
    if (!cmd);

    let options = interaction.options.data;

    cmd.run(rainy, interaction, options);
  }
});
