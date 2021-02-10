const { Comando } = require('../../utils/command')
const { MessageEmbed } = require('discord.js')
const  moment = require('moment')
require("moment-duration-format");
const emoji = require('../../utils/emojis.json')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "botinfo",
            description: "Veja os status da minha conexão com o servidor.",
            aliase: []
        })
    }
    run(client, message, args ) {
        const uptime = moment.duration(client.uptime).format(`y[a] M[m] w[s] d[d] h[h] m[m] s[s]`)
        let membros = client.guilds.cache.map((g) => g.memberCount).reduce((p, c) => p + c);
      
      const botinfo = new MessageEmbed()
          //.setTitle("Informações do Bot")
          .setAuthor(message.guild.name, message.guild.iconURL())
          .setDescription(`**Olá! Sou o ${client.user.username} e sou um Bot focado em Administrar e Divertir os Servidores.** \n   **Caso queira me Adicionar em seu Servidor basta clicar [aqui](https://discord.com/oauth2/authorize?=&client_id=738108908370919465&scope=bot&permissions=8)!**`)
          .setThumbnail(client.user.displayAvatarURL())
          .addField("**⭐ Meu Nome**", `**${client.user.username}**`, true)
          .addField("**🛠️ Criado por**", "**FireShark#2202**", true)
          .addField("**📆 Fui Criado em**", `**${moment(client.user.createdAt).format('DD/MM/YYYY')}**`, true)
          .addField("**📶 Ping da Api**", `**${client.ws.ping}**`, true)
          .addField("**👥 Membros**", `**${membros}**`, true)
          .addField("**💻 Servidores**", `**${client.guilds.cache.size}**`, true)
          .addField("**⌛ Estou Online há**", `**${uptime}**`, true)
          .addField("**📘 Minha linguagem**", "**JavaScript**", true)
          .addField("**📔 Livraria**", "**Discord.js**", true)
          .addField(`**${emoji.discord} Meu Discord**`, "**[Rocket | Discord Oficial](https://discord.gg/FHzmEUU)**", true)
          .addField(`**${emoji.website} Meu Site**`, "**[Rocket | Home](https://rocketz.glitch.me)**", true)
          .addField("**⚙️ Versão**", "**2.0**", true)
          .setColor('#36393F')
          message.channel.send(botinfo)
    }
}