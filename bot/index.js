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

client.on("messageCreate", (msg) => {

    if (msg.author.bot) return;

    console.log(`Otrzymano wiadomość:  ${msg.content} w kanale ${msg.channel.name}`); 


    if (msg.content === "dzialasz?") {

    msg.reply("dzialam");

 };
})

client.login(process.env.DISCORD_TOKEN);