const { Comando } = require('../../utils/command')
const { MessageEmbed } = require('discord.js')
const  moment = require('moment')
require("moment-duration-format");
const emoji = require('../../utils/emojis.json')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "invite",
            description: "Veja os status da minha conexão com o servidor.",
            aliases: ["convite"]
        })
    }
    run(client, message, args ) {
    const embed = new MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL())
    .setColor("RANDOM")
    .setTitle("Convites | Rocket")
    .setDescription("**Para me adicionar ao seu Servidor basta clicar [aqui](https://discord.com/api/oauth2/authorize?client_id=738108908370919465&permissions=8&scope=bot). **\n**Para entrar no meu Servidor de Suporte basta clicar [aqui](https://discord.gg/FHzmEUU).**")
    //.setFooter(client.user.username, client.user.displayAvatarURL())
    //.setTimestamp()
    message.channel.send(embed)
}
}

  