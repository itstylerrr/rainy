module.exports = {
    name: 'ping2',
    description: 'Shows latency ping!',
    run: async(rainy, interaction) => {
        await interaction.followUp(`Pong: ${rainy.ws.ping}ms!`)
    }
}