const { REST, Routes, SlashCommandBuilder } = require("discord.js")

require('dotenv').config();

const BotToken = process.env.TOKEN
const IdBot = process.env.BOT
const IdServer = process.env.SERVER

const rest = new REST().setToken(BotToken)

const slashRegister = async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(IdBot, IdServer), {
            body: [
                new SlashCommandBuilder()
                    .setName("list")
                    .setDescription("wyswietl liste osob ktore nie zaplacily za zbiorke")
                    .addStringOption( option => {
                        return option
                        .setName("category")
                        .setDescription("wybierz zbiorke")
                        .setRequired(true)
                        .addChoices(
                            {name: "TestTest", value: "Test"},
                            {name: "TestTest2", value: "Test2"},
                            {name: "natychmiastowe przypomnienie", value: "@everyone" + " przypominam o wplacie na zbiorke!!!"}
                        )
                    })
            ]
        })
    } catch(error){
        console.log(error)
    }
}
slashRegister();