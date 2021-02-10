  
const { Comando } = require("../../utils/command.js");
const { MessageEmbed } = require('discord.js')
module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "enquete",
            aliases: [],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
            botNeedPermissions: ["BAN_MEMBERS"],
            needPermissions: ["BAN_MEMBERS"],
        })
    }
    async run(client, message, args) {
    let canal = message.mentions.channels.first() 
    if(!canal) {
        return message.channel.send(`Canal não encontrado!`)
    }
    let argumentss = args.slice(1).join(" ")
    if(!argumentss) {
        return message.channel.send(`Voce não pode fazer uma enquete vazia!`)
    }

    const embed = new MessageEmbed()
    .setTitle('✅ Enquete ❌')
    .setDescription(
        `> **${argumentss}**
        
        **Vote ✅ para Sim**
        **Vote ❌ para Não**
        `
        )
    .setFooter(`Enquete de ${message.author.username}`)
    .setColor('RANDOM')
    canal.send(embed).then(msg => {
        msg.react("✅")
        msg.react("❌")
    })
    message.delete()
}
}