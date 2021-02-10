  
const { Comando } = require("../../utils/command.js");

module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "criarcanal",
            aliases: [],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
            botNeedPermissions: ["BAN_MEMBERS"],
            needPermissions: ["BAN_MEMBERS"],
        })
    }
    async run(client, message, args) {
    let argumento = args.join(" ")
    if(!argumento){
        return message.reply('Voce não colocou o nome do canal para ser criado')}
        message.guild.channels.create(argumento)
        message.channel.send(`**${message.author} O canal **` + '`' + argumento + '`' + ` foi criado com sucesso!`)
        
}
}
