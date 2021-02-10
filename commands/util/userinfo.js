const { Comando } = require('../../utils/command')
const { MessageEmbed } = require('discord.js')
const emoji = require('../../utils/emojis.json')
const  moment = require('moment')
const Profile = require('../../models/Profile')
require("moment-duration-format");
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "userinfo",
            description: "Veja os status da minha conexão com o servidor.",
            aliases: []
        })
    }
    run(client, message, args ) {
        let user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author || args[0].replace(/<|@|!|>/g, "")
  
const moment = require('moment');
    moment.locale('PT-BR');
    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} dias, ${hrs.padStart(2, '0')} horas, ${min.padStart(2, '0')} min, ${sec.padStart(2, '0')} sec`
    } 
  
    Profile.findOne({ userID: user.id }, async (err, doc) => {

  if(user.presence.status == "dnd") {
    user.presence.status = `${emoji.ocupado} Não perturbe`
  } else if(user.presence.status === `idle`) {
    user.presence.status = `${emoji.ausente} Ausente`
  } else if(user.presence.status === "offline") {
    user.presence.status = `${emoji.ofline} Ofline`
  } else if(user.presence.status == "online") {
    user.presence.status = `${emoji.online} Online`
  }
  
    const embed = new MessageEmbed()
    .setAuthor(user.username, user.displayAvatarURL({size: 2048, dynamic: true}))
    .addField("**⭐ Nome:**", `**${user.username}**`, true)
    .addField("**🖥️ ID:**", `**${user.id}**`, true)
    .addField("**📌 Tag:**", `**#${user.discriminator}**`, true)
    .addField("**📆 Conta criada em**",`**${moment(user.createdAt).format('DD/MM/YYYY')}**`, true)
    .addField(`**Status:**`, `**${user.presence.status}**`, true)
    .setColor('RANDOM')
    .setThumbnail(user.displayAvatarURL({size: 2048, dynamic: true}))
    
    const embed2 = new MessageEmbed()
    .setAuthor(user.username, user.displayAvatarURL())
    .addField(`Level:`, `**${doc.level}**`, true)
    .addField(`XP:`, `**${doc.xp}**`, true)
    .addField(`Reputações:`, `**${doc.reps}**`, true)
    .addField(`Asteroides:`, `**${doc.coins}**`, true)
    .addField(`Coins:`, `**${doc.money}**`, true)
    .setColor('RANDOM')
    .setThumbnail(user.displayAvatarURL({size: 2048, dynamic: true}))
    message.channel.send(embed).then(msg => {
      msg.react('⏩')

      let filter = (reaction, usuario) => {
        return ['⏩', '⏪'].includes(reaction.emoji.name) && usuario.id === message.author.id
    }

    const colector = msg.createReactionCollector(filter, {time: 100000});
    
    colector.on("collect", em => {
        switch (em.emoji.name) {
          case "⏩":
            msg.edit(embed2)
            msg.reactions.removeAll()
            msg.react('⏪')
            break
            case "⏪":
              msg.edit(embed)
              msg.reactions.removeAll()
              msg.react('⏩')
    }
  })
})
    })
    }
}