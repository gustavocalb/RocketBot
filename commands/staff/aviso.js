  
const { Comando } = require("../../utils/command.js");

module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "aviso",
            aliases: ["avisar"],
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

const aviso = new MessageEmbed()
.setTitle('📢 Aviso 📢')
.setDescription(`**> ${arguments}**`)
.setColor('#d10000')
.setFooter(`Aviso de ${message.author.username}`)
.setTimestamp()
canal.send('@everyone', aviso)
message.delete()
}
}     