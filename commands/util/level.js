
const { Comando } = require("../../utils/command.js")
const Profile = require('../../models/Profile')
const { MessageEmbed } = require('discord.js')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "level",
            description: "Veja os status da minha conexão com o servidor.",
        })
    }
    run = async (client, message, args) => {
    Profile.findOne({ userID: message.author.id }, async function(err, doc) {
        if(!doc) {
              new Profile({
                    _id: message.guild.id, 
                    userID: message.author.id,
                    username: message.author.username
                }).save().then(() => {
                    console.log("[LOGS] Um novo membro foi registrado!"); 
                });
            return message.channel.send(`${message.author} Estou te registrando no meu Banco de Dados!`)
            } else {
        const embed = new MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription(
                `**Level: ${doc.level}**

                 **XP: ${doc.xp}**
                `)
            .setColor('RANDOM')
        message.channel.send(embed); 
            }
    })
}
}