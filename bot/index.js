require('dotenv').config();
const PocketBase = require('pocketbase/cjs');
let isSubscribed = false;

const { Client, GatewayIntentBits} = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent 
    ],
});

const pb = new PocketBase('https://pb.wama.zbiorki.zs1mm.edu.pl');  

const targetHour = 16;
const targetMinute = 10;
const channelId = process.env.CHANNEL;
const messageContent = "@everyone" + "przypominam o zbiorce";

client.on("ready", () => {

 console.log(`Logged in as ${client.user.tag}!`)

 const newRecord = () => {
    if (isSubscribed) {
        console.warn("Subskrypcja już aktywna.");
        return;
    }
    isSubscribed = true;

    try {
        pb.collection('Zbiorki').subscribe('*', (e) => {
            if (e.action === 'create') {
                const channel = client.channels.cache.get(channelId);
                if (channel) {
                    channel.send(`Nowa zbiórka została dodana: ${JSON.stringify(e.record)}`);
                } else {
                    console.error("Nie znaleziono kanału Discord.");
                }
            }
        });
    } catch (err) {
        console.error("Błąd podczas subskrypcji PocketBase:", err.message);
    }
};

newRecord();

 const sendMessageAtTargetTime = () => {

    const now = new Date();
    const targetTime = new Date(now);
    
    targetTime.setHours(targetHour, targetMinute, 0, 0);

    if (targetTime < now) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    const delay = targetTime.getTime() - now.getTime();
    console.log(`Powiadomienie zostanie wysłane o godzinie 16:10, za ${delay / 1000} sekund`);

    setTimeout(() => {
        const channel = client.channels.cache.get(channelId);
        if (channel) {
            channel.send(messageContent).then(() => {
                console.log(`Wiadomość wysłana!`);
            }).catch(err => {
                console.error('Błąd wysyłania wiadomości:', err);
            });
        } else {
            console.error('Nie znaleziono kanału!');
        }

        setInterval(() => {
            channel.send(messageContent).then(() => {
                console.log(`Wiadomość wysłana!`);
            }).catch(err => {
                console.error('Błąd wysyłania wiadomości:', err);
            });
        }, 24 * 60 * 60 * 1000);
    }, delay);
};
sendMessageAtTargetTime();

client.on("interactionCreate", async (interaction) => {
    if(interaction.isCommand()){
        if(interaction.commandName === "list"){
            const textReceived = interaction.options.getString("category")
            interaction.reply({content: `${textReceived}`})
        }
    }
})

client.on('messageCreate', async (message) => {
    if (message.content === 'uczniowie') {
      try {
        const records = await pb.collection('uczniowie').getList(1, 10);
        if (!records || !records.items.length) {
          console.log('No records found');
          message.channel.send('No records found.');
        } else {
          message.channel.send(`Fetched data from PocketBase: ${JSON.stringify(records.items)}`);
        }
      } catch (error) {
        message.channel.send(`Error: ${error.message}`);
      }
    }
  });
})
client.login(process.env.TOKEN);