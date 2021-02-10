  
const { Comando } = require("../../utils/command.js");
module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "removerbot",
            aliases: [],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
        })
    }
    async run(client, message, args) {
    if(message.author.id != '441371971717169165'){
        return message.channel.send(`${message.author} Apenas meu Criador pode Utilizar esse comando!`)
    }
    if(client.guilds.cache.get(args[0]).leave()) {
        return message.channel.send(`Guild retirada com Sucesso!`)
    }
}
}