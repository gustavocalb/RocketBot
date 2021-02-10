const { Comando } = require("../../utils/command.js");
const Guild = require('../../models/Guild')
module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "removervip",
            aliases: [],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
        })
    }
    async run(client, message, args) {

    let canal = message.mentions.channels.first()

  Guild.findOneAndUpdate(
    { _id: message.guild.id },
    {bot: {
        reportBugChannel: canal.id }
    },

    (err, doc) => {
      message.reply("**O canal** " + `${canal}` + " **foi setado para receber os reportBug com sucesso!**");
    }
  )
    .then(result => console.log(result))
    .catch(err => console.log(err))

}
}