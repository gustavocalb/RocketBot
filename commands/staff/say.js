  
const { Comando } = require("../../utils/command.js");
const  Guild  = require('../../models/Guild')
const { MessageEmbed } = require('discord.js')
module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "say",
            aliases: ["falar"],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
            botNeedPermissions: ["MANAGE_CHANNELS"],
            needPermissions: ["MANAGE_CHANNELS"],
        })
    }
    async run(client, message, args) {
const falar = args.join(" ")
if(!falar) return 
message.channel.send(falar)
message.delete()
}
}