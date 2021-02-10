  
const { Comando } = require("../../utils/command.js");
module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "eval",
            aliases: [],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
        })
    }
    async run(client, message, args) {

    if(message.author.id != '441371971717169165') return message.channel.send("❌ Apenas meu criador pode utilizar esse comando!");
        let code = args.join(" ")
        if (!code) return message.channel.send("Especifique o code que você deseja executar.")
        try {
        let resultado = await eval(code)
        if (typeof resultado !== 'string') {resultado = require('util').inspect(resultado);}
        message.channel.send(`**📥 Code:**\n \`\`\`js\n${resultado}\`\`\``)
        } catch (err) {
            message.channel.send(`**📤 Erro:**\n \`\`\`js\n${err}\`\`\``)
        }
    }
}