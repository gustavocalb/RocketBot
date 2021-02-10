const Guild = require('../models/Guild')
const Discord = require('discord.js')

module.exports = async (client, message, args) => {
    Guild.findOne({guildID: message.guild.id}, function (err, doc) {
        if(doc.channels.logsChannel.enabled === true){
            if(doc.config.logs.messageDelete === true){
                const canal = message.guild.channels.cache.get(doc.channels.logsChannel.channelID)
                if(!canal) {
                    return
                }
                const embeddelete = new Discord.MessageEmbed()
                .setAuthor(`Mensagem Excluida`)
                .setDescription(`
                **Uma nova mensagem foi Excluida**`)
                .addField(`Usuario:`, `${message.author}`)
                .addField('Mensagem Apagada', '```' + `${message.content}` + '```')
                .setColor('#c91818')
                canal.send(embeddelete)
            }
        }
    })
}