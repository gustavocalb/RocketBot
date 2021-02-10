
const { Comando } = require("../../utils/command.js")
const Guild = require('../../models/Guild')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "report",
            description: "Veja os status da minha conexão com o servidor.",
            aliases: ['reportar', 'denunciar']
        })
    }
    run = async (client, message, args) => {
    let user =  message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!user){
        return message.reply('Ops.. Voce não mencionou o Usuario.')
    }
    if(user === message.member) return message.reply("Voce não pode Reportar voce mesmo!")
    let reason = args.slice(1).join(" ")
    if(!reason) {
        return message.reply('Porfavor coloque um motivo.')
    }

    let doc = await Guild.findOne( { guildID: message.guild.id },)
    let canal = await client.channels.cache.get(doc.channels.reportChannel.channelID)
    if(!canal) {
        return message.reply('Ops.. O canal do report nao foi Definido!')
    }
    const reportt = new MessageEmbed()
    .setTitle('Novo Registro de Report')
    .setDescription(`**O membro ${user} acabou de ser reportado!**`)
    .addField('**Membro Tag:**', `> **${user.user.tag}**`)
    .addField('**Motivo:**', '```' + `${reason}` + '```')
    .addField('**Reportado por:**', `**${message.author}**`)
    .setColor('#f54242')
    canal.send(reportt)

    const reportado = new MessageEmbed()
    .setTitle('Report')
    .setDescription(`**${message.author}, O membro ${user} foi reportado com sucesso!**`)
    .setTimestamp()
    .setColor('#00ff44')
    message.channel.send(reportado) 
}
}