const { Comando } = require('../../utils/command')
const { MessageEmbed } = require('discord.js')
const emoji = require('../../utils/emojis.json')
const  moment = require('moment')
const Profile = require('../../models/Profile')
require("moment-duration-format");
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "rep",
            description: "Veja os status da minha conexão com o servidor.",
            aliases: []
        })
    }
    run(client, message, args ) {
  let user =  message.mentions.members.first() || message.guild.members.cache.get(args[0]) || args[0].replace(/<|@|!|>/g, "")
  // if(user = message.author){
  //   return message.reply(`Você não pode dar uma reputação para você mesmo!`)
  // }
  if(!user){
    return message.reply(`Usuario invalido!`)
  }
  if(user.id === message.author.id){
    return message.reply(`Ops... Você não pode dar uma reputação para você mesmo!`)
}
Profile.findOne({ userID: user.id }, async function(err, doc) {
  if(!doc){
    const newUser = new Profile ({
      guildID: message.guild.id,
      guildName: message.guild.name,
      userID: user.id,
      username: user.user.tag,
      reps: 0
    })
    await newUser.save()
  } else {
    const time = moment.duration.format(
      [moment.duration(parseInt(doc.temporep) + 3600 - Date.now())],
      "D MMMM YYYY, h:mm:ss"
    );
    if (parseInt(doc.temporep) + 3600 <= Date.now()) {
    doc.reps += +1
    doc.temporep = Date.now()
    doc.save()
    message.channel.send(`${message.author} Você acaba de enviar uma reputação para ${user}`)
  } else {
    message.reply(
      `Ops.. Parece que você deu uma reputação a pouco tempo. Você poderá dar outro rep em ${time}`
    );
  }
}
})
}
}