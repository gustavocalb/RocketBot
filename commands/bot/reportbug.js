const { MessageEmbed } = require('discord.js')
const Guild = require('../../models/Guild')
const { Comando } = require("../../utils/command.js");

module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "reportbug",
            aliases: [],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
        })
    }
    async run(client, message, args) {
let bug = args.join(" ")
if(!bug) return
let doc = await Guild.findOne({ _id: '738126640520888432'})

let canal = await client.channels.cache.get(doc.bot.reportBugChannel)

const bugg = new MessageEmbed()
.setTitle('Nova Avaliação Registrada')
.setDescription(`**${message.author.username} Reportou um Bug!**`)
.addField('Usuario tag:', `${message.author.tag}`)
.addField('Bug Reportado', `**> ${bug}**`)
.setColor('RANDOM')
.setFooter(client.user.username, client.user.displayAvatarURL())
canal.send(bugg)

message.delete()

const bugs = new MessageEmbed()
.setTitle('Sucesso!')
.setDescription(`**${message.author}, O Bug foi Reportado com Sucesso!**`)
.setColor('#fa4c2d')
message.channel.send(bugs).then(msg => msg.delete({timeout: 6000}))
}
}