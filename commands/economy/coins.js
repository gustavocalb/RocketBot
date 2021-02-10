const { Comando } = require('../../utils/command')
const Profile = require('../../models/Profile')
const emoji = require('../../utils/emojis.json')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "coins",
            description: "Veja os status da minha conexão com o servidor.",
            aliase: []
        })
    }
    run(client, message, args ) {
  let user = message.mentions.users.first() || message.author;
  Profile.findOne(
    {
      userID: user.id,
      // guildID: message.guild.id
    },
    async (err, doc) => {
      if (doc) {
        let msg = message.mentions.users.first()
          ? `${message.author} o membro <@${doc.userID}> tem ${doc.money} coins`
          : `${message.author} Você tem ${doc.money} coins`;
        message.channel.send(msg);
      } else {
        const newUser = new Profile({
          guildID: message.guild.id,
          guildName: message.guild.name,
          userID: user.id,
          username: user.tag,
          vip: false
        });

        try {
          await newUser.save();
          console.error(`Perfil de ${user} foi criado`);
        } catch (err) {
          console.error(err);
        }
        message.channel.send(
          "Não te encontrei no meu banco de dados, estou te registrando... Digite o comando novamente!"
        );
      }
    }
  );
  }
}
