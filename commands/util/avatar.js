const { Comando } = require("../../utils/command.js");
const { findUser } = require("../../functions.js");
const { MessageEmbed } = require("discord.js");

module.exports = class Avatar extends Comando {
    constructor(client) {
        super(client, {
            name: "avatar",
            aliases: ["icon", "logo"],
            description: "Veja o avatar de um usuário!",
            usage: "<user>"
        })
    }

    run(client, message, args) {
        let user = client.users.cache.get(args[0]) || message.mentions.users.first() ||message.author || args[0].replace(/<|@|!|>/g, "")
        const embed = new MessageEmbed()
        .setAuthor(user.username, user.displayAvatarURL())
        .setDescription(`**Clique [aqui](${user.displayAvatarURL({size: 2048, dynamic: true})}) para baixar a imagem!**`)
        .setImage(user.displayAvatarURL({size: 2048, dynamic: true}))
        .setColor('RANDOM')

        return message.channel.send(message.author, embed)
    }
}