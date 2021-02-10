
const { Comando } = require("../../utils/command.js")
const emoji = require('../../utils/emojis.json')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "teste",
            description: "Veja os status da minha conexão com o servidor.",
            aliases: []
        })
    }
        run = async (client, message, args) => {
            message.channel.send(`${emoji.tubarao}`)

        }
    }