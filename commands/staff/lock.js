  
const { Comando } = require("../../utils/command.js");
const  Guild  = require('../../models/Guild')
const { MessageEmbed } = require('discord.js')
module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "lock",
            aliases: ["travar"],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
            botNeedPermissions: ["MANAGE_CHANNELS"],
            needPermissions: ["MANAGE_CHANNELS"],
        })
    }
    async run(client, message, args) {
        Guild.findOne({guildID: message.guild.id}, (err, doc) => { 
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: false
            });
        message.reply(`canal bloqueado com sucesso! Utilize o comando \`${doc.prefix}unlock\` para desbloquear!`);
        return;
        })
}
}