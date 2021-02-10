const { Comando } = require("../../utils/command.js");
const Profile = require('../../models/Profile')
module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "setvip",
            aliases: [],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
        })
    }
    async run(client, message, args) {
    if(message.author.id != '441371971717169165') return message.channel.send("❌ Apenas meu criador pode utilizar esse comando!");
    let user = client.users.cache.get(args[0]) || message.mentions.users.first() || args[0].replace(/<|@|!|>/g, "")
    if(!user) {
        return message.reply('Usuario Invalido')
    }
    Profile.findOne({userID: user.id}, async (err, doc) => {
       if(doc.vip.enabled === true) {
           return message.reply('Esse Usuario ja é Vip!')
       } else {
           doc.vip.enabled = true
           doc.save()
           message.reply('O usuario foi setado como Vip com sucesso!')
       }
    })
}
}