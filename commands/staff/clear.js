  
const { Comando } = require("../../utils/command.js");
module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "clear",
            aliases: ["limpar"],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
            botNeedPermissions: ["MANAGE_CHANNELS"],
            needPermissions: ["MANAGE_CHANNELS"],
        })
    }
    async run(client, message, args) {
        if(!args[0]) return message.channel.send("Digite a quantidade de mensagens que devo apagar!")
        const num = args[0];
        if(isNaN(num)) return message.channel.send("Coloque um numero valido!")
        let number = parseInt(num);
        if(num > 100 || num < 2) return message.channel.send("Coloque um entre 2 e 100.")
    
        message.channel.bulkDelete(number, true).then(() => {
            message.channel.send(`Foi eliminado ${args[0]} mensagens.`).then(msg => msg.delete({timeout: 6000}))
        }).catch(e => {
            message.channel.send("Ouve um erro ao excluir as mensagens!");
        })
}
}