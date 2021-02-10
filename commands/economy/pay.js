const { Comando } = require('../../utils/command')
const Profile = require('../../models/Profile')
const emoji = require('../../utils/emojis.json')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "pay",
            description: "Veja os status da minha conexão com o servidor.",
            aliase: []
        })
    }
    run(client, message, args ) {
  // if(message.author.id != '441371971717169165') return message.channel.send("❌ Apenas meu criador pode utilizar esse comando!");
    let user = client.users.cache.get(args[0]) || message.mentions.users.first()
  if(!user){
    return message.reply(`Usuario invalido!`)
  }
  if(user.id === message.author.id){
    return message.reply(`Ops... Você não pode pagar a você mesmo!`)
}
  if(args[1].startsWith('-')){
    return message.reply(`Você não pode pagar com numeros negativos!`)
  }
  if(isNaN(args[1])) return message.reply("Coloque um numero valido!")
  Profile.findOne({ userID: message.author.id }, async (err, doc) => {
    if(doc.coins < args[1]){
      return message.reply(`Você não tem asteroides suficientes`)
    } else {
      doc.coins += -args[1]
      doc.save()
      message.reply(`Você pagou ${args[1]} asteroides para ${user}`)
    }
    Profile.findOne({ userID: user.id }, async (err, doc) => {
      doc.coins += +args[1]
      doc.save()
    })
  })
}
}