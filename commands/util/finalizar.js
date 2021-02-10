const { Comando } = require('../../utils/command')
const { MessageEmbed } = require('discord.js')
const  moment = require('moment')
require("moment-duration-format");
const emoji = require('../../utils/emojis.json')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "finalizar",
            description: "Veja os status da minha conexão com o servidor.",
            aliase: []
        })
    }
    run = async (client, message, args) => {
const findCategory = await message.guild.channels.cache.find(r => r.type == "category" && r.name == "Tickets")
if(message.channel.parentID == findCategory) return message.channel.delete()
}
}