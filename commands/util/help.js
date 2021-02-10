const { Comando } = require('../../utils/command')
const { MessageEmbed } = require('discord.js')
const Guild = require('../../models/Guild')
const emoji = require('../../utils/emojis.json')
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "help",
            description: "Veja os status da minha conexão com o servidor.",
            aliases: ['menu', 'comandos', 'ajuda']
        })
    }
    run = async (client, message, args ) => {
    let doc = await Guild.findOne({guildID: message.guild.id},  (err, doc) => {
});
    let prefix = doc.prefix

    const help = new MessageEmbed()
    .setTitle("Help | Comandos")
    .setDescription(`
    **> Comandos Administrador 👮**
    **> Comandos Configuração 🛠️**
    **> Comandos Diversão 🎮**
    **> Comandos Gerais 🌐**
    **> Comandos Economia 💸**
    
    `)
    .setColor('RANDOM')
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(`Caso encontre um algum Bug Utilize ${prefix}Reportbug <Bug>`, client.user.displayAvatarURL())

    const helpadmin = new MessageEmbed()
    .setTitle('👮 Comandos Administrador 👮')
    .setDescription(`**Caso encontre um algum Bug Utilize ${prefix}Reportbug <Bug>**`)
    .setColor('#f20707')
    .addField(prefix + 'Ban <@Usuario> <Motivo>', `> **Exemplo:** ${prefix}Ban @pessoa <motivo>`)
    .addField(prefix + 'Kick <@Usuario> <Motivo>', `> **Exemplo:** ${prefix}Kick @pessoa <motivo>`)
    .addField(prefix + 'Clear <1 - 100>', `> **Exemplo:**  ${prefix}Clear 10`)
    .addField(prefix + 'Say <mensagem>', `> **Exemplo:**  ${prefix}Say Ola!`)
    .addField(prefix + 'Addemoji', `> **Exemplo:**  ${prefix}Addemoji <emoji>`)
    .addField(prefix + 'Enquete <#canal> <mensagem>', `> **Exemplo:**  ${prefix}Enquete <#canal> <Enquete>`)
    .addField(prefix + 'Aviso <#canal> <mensagem>', `> **Exemplo:**  ${prefix}Aviso <#canal> <aviso>`)
    // .addField(prefix + 'Msgticket', `> **Utilize para criar uma me**`)
    .setFooter(`${client.user.username} • Todos os Direitos preservados`)
    .setThumbnail(client.user.displayAvatarURL())
    

    const config = new MessageEmbed()
    .setTitle('🛠️ Comandos Configuração 🛠️')
    .setDescription(`**Caso encontre um algum Bug Utilize ${prefix}Reportbug <Bug>**`)
    .setColor('#c600e0')
    .addField(prefix + 'Setprefix <novo-prefix>', `> Alterar o prefix do Bot`)
    .addField(prefix + 'Welcome', `> Comando para Configurar mensagem de Boas-Vindas`)
    .addField(prefix + 'Leave', `> Comando para Configurar mensagem de Saidas`)
    .addField(prefix + 'Autorole', `> Comando para Configurar cargo Automatico`)
    .addField(prefix + 'Channel', `> Comando para Configurar os Canais`)
    .setFooter(`${client.user.username} • Todos os Direitos preservados`)
    .setThumbnail(client.user.displayAvatarURL())
    
  
    const geral = new MessageEmbed()
    .setTitle('🌐 Comandos Gerais 🌐')
    .setColor('#00a2ff')
    .setDescription(`**Caso encontre um algum Bug Utilize ${prefix}Reportbug <Bug>**`)
    .addField(prefix + '**Convite**', `> Convite do Bot e Discord`)
    .addField(prefix + '**Report <@Usuario> <Motivo>**', `> Reporta o <@Usuario>`)
    .addField(prefix + '**Sugestao <message>**', `> Manda uma sugestão para o servidor`)
    .addField(prefix + '**Serverinfo**', `> Informações do Servidor`)
    .addField(prefix + '**Ping**', `> A latência entre o Discord e a aplicação.`)
    .addField(prefix + '**Botinfo**', `> Informações do Bot`)
    .addField(prefix + '**Userinfo**', `> Informações do Usuario`)
    .addField(prefix + '**Avatar**', `> Avatar do Usuario`)
    .addField(prefix + '**Rep**', `> Mande uma reputação para aquela pessoa que te ajudou`)
    .addField(prefix + '**Ticket**', `> Abra um Ticket`)
    .addField(prefix + '**Level**', `> Veja seu Level e XP`)
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(`${client.user.username} • Todos os Direitos preservados`)

    const diversão = new MessageEmbed()
    .setTitle('🎮 Comandos Diversão 🎮')
    .setColor('#ff7b00')
    .setDescription(`**Caso encontre um algum Bug Utilize ${prefix}Reportbug <Bug>**`)
    .addField(prefix + '**Hug <@Usuario>**', `> Abraçar o <@Usuario>`)
    .addField(prefix + '**Kiss <@Usuario>**', `> Beijar o <@Usuario>`)
    .addField(prefix + '**Kill <@Usuario>**', `> Mate o <@Usuario>`)
    .addField(prefix + '**Rip <@Usuario>**', `> O <@Usuario> Morreu`)
    .addField(prefix + '**Slap <@Usuario>**', `> O <@Usuario> Morreu`)
    .addField(prefix + '**Quiz**', `> Responda as Perguntas do Bot`)
    .addField(prefix + '**Attack <@Usuario>**', `> Ataque o <@Usuario>`)
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(`${client.user.username} • Todos os Direitos preservados`)

    const economia = new MessageEmbed()
    .setTitle('💸 Comandos Economia 💸')
    .setColor('#ff7b00')
    .setDescription(`**Caso encontre um algum Bug Utilize ${prefix}Reportbug <Bug>**`)
    .addField(prefix + '**Daily**', `> Pegue seus Asteroides diarios`)
    .addField(prefix + '**Asteroides**', `> Veja o seu total de asteroides`)
    .addField(prefix + '**Work**', `> Trabalhe para ganhar dinheiro`)
    .addField(prefix + '**Coins**', `> Veja quantos Coins possue em sua conta`)
    .addField(prefix + '**Pay**', `> Pague asteroides para um amigo `)
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(`${client.user.username} • Todos os Direitos preservados`)
    const msg = await message.channel.send(help)

   msg.react('👮')
   msg.react('🛠️')
   msg.react('🎮')
   msg.react('🌐')
   msg.react('💸')

    let filter = (reaction, usuario) => {
        return ['👮','🌐', '🛠️', '🎮', '💸', '⏪',].includes(reaction.emoji.name) && usuario.id === message.author.id;
    }

    const colector = msg.createReactionCollector(filter, {time: 100000});
    
    colector.on("collect", em => {
        switch (em.emoji.name) {
          case "👮":
            msg.reactions.removeAll();
            msg.edit(helpadmin)
            msg.react("⏪")
            break;
          case "🌐": 
            msg.reactions.removeAll()
            msg.edit(geral)
            msg.react("⏪")
            
            break;
            case "🛠️":
              msg.reactions.removeAll()
              msg.edit(config)
              msg.react("⏪")
              break
              case "🎮":
              msg.reactions.removeAll()
              msg.edit(diversão)
              msg.react("⏪")
              break
              case "💸":
              msg.reactions.removeAll()
              msg.edit(economia)
              msg.react("⏪")
              break
              case "⏪":
                msg.edit(help)
                em.remove(message.author.id)
                msg.react('👮')
                msg.react('🛠️')
                msg.react('🎮')
                msg.react('🌐')
                msg.react('💸')
                break
        }
      });
}
}