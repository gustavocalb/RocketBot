const { Comando } = require('../../utils/command')
const { MessageEmbed } = require('discord.js')
const  moment = require('moment')
require("moment-duration-format");
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "serverinfo",
            description: "Veja os status da minha conexão com o servidor.",
            aliases: []
        })
    }
    run(client, message, args ) {
        moment.locale('PT-BR');
  
        const infoserve = new MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setTitle(`Informações do Servidor`)
        .addField("⭐ Nome", `**${message.guild.name}**`)
        .addField("👑 Dono", message.guild.owner)
        .addField("👥 Membros", `**${message.guild.memberCount}**`)
        .addField("🤖 Bots", `**${message.guild.members.cache.filter(u => u.user.bot).size}**`)
        .addField("💻 Canais", `**${message.guild.channels.cache.size}**`)
        .addField("📅 Criado em", `**${moment(message.guild.createdAt).format('DD/MM/YYYY')}**`)
        .setThumbnail(message.guild.iconURL())
        message.channel.send(infoserve)
    }
}