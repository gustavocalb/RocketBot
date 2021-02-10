
const { Comando } = require("../../utils/command.js")
const Guild = require('../../models/Guild')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "sugestao",
            description: "Veja os status da minha conexão com o servidor.",
            aliases: []
        })
    }
        run = async (client, message, args) => {
    let argumentss = args.join(" ")
    if(!argumentss) {
        return message.channel.send('Ops.. Voce não pode dar uma sugestão em Branco.')
    }
    let doc = await Guild.findOne( { guildID: message.guild.id },)
    let canal = await client.channels.cache.get(doc.channels.sugestaoChannel.channelID)
    if(!canal) {
        return message.reply('Ops.. O canal do sugestão nao foi Definido!')
    }
   const embed = new MessageEmbed()
   .setTitle('Nova Sugestão Registrada')
   .setDescription(`**  ${message.author} Mandou uma Sugestão!**`)
   .addField('Sugestão', `> **${argumentss}**`)
   .setFooter(message.guild.name, message.guild.iconURL())
   .setThumbnail(message.guild.iconURL())
   .setColor('#ff9d00')
   .setTimestamp()
   canal.send(embed)

   const Sucesso = new MessageEmbed()
   .setTitle('Sugestão')
   .setDescription(`**${message.author} Sua sugestão foi enviada com sucesso!**`)
   .setColor('#00ff44')
   message.channel.send(Sucesso)
 }
}