const { REST, Routes, SlashCommandBuilder } = require("discord.js")
const Pocketbase = require('pocketbase');

import pb from "../next-app/src/lib/pocketbase";

require('dotenv').config();

const BotToken = process.env.TOKEN
const IdBot = "1311642211825487952"
const IdServer = "1310891135048220714"

const rest = new REST().setToken(BotToken)

const slashRegister = async () => {
    try {
        await rest.put(Routes.applicationGuildCommands(IdBot, IdServer), {
            body: [
                new SlashCommandBuilder()
                    .setName("ping")
                    .setDescription("prosta komenda")
                    .addStringOption( option => {
                        return option
                        .setName("text")
                        .setDescription("tekst opcji")
                        .setRequired(true)
                        .setMaxLength(32)
                    })
            ]
        })
    } catch(error){
        console.log(error)
    }
}
slashRegister();