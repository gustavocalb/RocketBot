  
const { Comando } = require("../../utils/command.js");

module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "kick",
            aliases: [],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
            botNeedPermissions: ["BAN_MEMBERS"],
            needPermissions: ["BAN_MEMBERS"],
        })
    }
    async run(client, message, args) {
    let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || args[0].replace(/<|@|!|>/g, "")
    if(!user) return message.channel.send("Usuario não encontrado!");
    let motivo = args.slice(1).join(" ")
    if(!user.bannable) return message.reply('Não tenho permissão para banir esse membro!')
    message.reply(`O membro acaba de ser Kickado com Sucesso!`)
    user.kick()
}
}    