const { Comando } = require("../../utils/command.js");
const Profile = require('../../models/Profile')
module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "setasteroides",
            aliases: [],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
        })
    }
    async run(client, message, args) {
    if(message.author.id != '441371971717169165') return message.channel.send("❌ Apenas meu criador pode utilizar esse comando!");
    let user = message.mentions.users.first() || client.users.cache.get(args[0]) || args[0].replace(/<|@|!|>/g, "")
    if(!user) {
        return message.reply(`Usuario invalido!`)
    }
    let value = Math.round(Math.random()) + 250;
    Profile.findOne({ userID: user.id }, async (err, doc) => {
        doc.coins += +args[1]
        doc.save()
        message.channel.send(`${user} recebeu ${args[1]} asteroides!`)
    })
    console.log(`${message.author.tag} Setou ${args[1]} asteroides para ${user.tag}`)
}
}