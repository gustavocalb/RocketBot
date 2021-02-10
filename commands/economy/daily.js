const { Comando } = require('../../utils/command')
const Profile = require('../../models/Profile')
const emoji = require('../../utils/emojis.json')
const moment = require('moment')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "daily",
            description: "Veja os status da minha conexão com o servidor.",
            aliase: []
        })
    }
    run(client, message, args ){
  Profile.findOne({ userID: message.author.id }, async function(err, doc) {
      if (doc) {
        let value = Math.round(Math.random() * 1000) + 250;
        let bonus = +175
        const time = moment.duration.format(
          [moment.duration(parseInt(doc.daily) + 86400000 - Date.now())],
          "D MMMM YYYY, h:mm:ss"
        );
        if (parseInt(doc.daily) + 86400000 <= Date.now()) {
          if(doc.vip.enabled === true){
            let bonusvip = value + bonus
            doc.coins += bonusvip
            doc.daily = Date.now();
            doc.save()
            message.reply(`Você recebeu ${value} Asteroides`);
            return message.reply(`Obrigado por ter Assinado Vip! Aqui está seu Bonus de ${bonus} Asteroides`)
          } else {
            doc.coins += value;
            doc.daily = Date.now();
            doc.save();
            message.reply(`Você recebeu ${value} Asteroides`);
          }
        } else {
          message.reply(
            `Você só pode pegar seus asteroides diários daqui ${time}`
          );
        }
      } else {
        const newUser = new Profile ({
          guildID: message.guild.id,
          guildName: message.guild.name,
          userID: message.author.id,
          username: message.author.tag,
          vip: false
        });

        try {
          newUser.save();
          console.error(`Perfil de ${message.author.tag} foi criado`)
        } catch (err) {
          console.error(err);
        }
        message.channel.send("Não te encontrei no meu banco de dados, estou te registrando... Digite o comando novamente!");
      }
    }
  );
}
} 
