require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent 
    ],
});

client.on("ready", () => {

 console.log(`Logged in as ${client.user.tag}!`)

})

client.on("interactionCreate", async (interaction) => {
    if(interaction.isCommand()){
        if(interaction.commandName === "ping"){
            const textReceived = interaction.options.getString("text")
            interaction.reply({content: `${textReceived}`})
        }
    }
})

client.login(process.env.TOKEN);