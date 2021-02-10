  
const { Comando } = require("../../utils/command.js");
const { MessageEmbed } = require('discord.js')
const  Guild  = require('../../models/Guild')
module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "leave",
            aliases: ["saida"],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
            botNeedPermissions: ["ADMINISTRATOR"],
            needPermissions: ["ADMINISTRATOR"],
        })
    }
    async run(client, message, args) {
    var mention = message.mentions.channels.first()

    Guild.findOne({ guildID: message.guild.id}, function(err, doc) {
      let welcome
      if(!doc.config.leave.enabled) {
      welcome = "OFF"
      } else {
        welcome = "ON"
      }

      let welcomechannel
      if(!doc.welcome.channel) {
        welcomechannel = `Não definido`
      } else {
        welcomechannel = `<#${doc.welcome.channel}>`;
      }

      let welcomeTitle
      if(!doc.config.leave.messageTitle){
        welcomeTitle = `Não definido`
      } else {
        welcomeTitle = `${doc.config.leave.messageTitle}`
      }
      
      //
      let welcomeDescription
      if(!doc.config.leave.messageDescription){
        welcomeDescription = `Não definido`
      } else {
        welcomeDescription = `${doc.config.leave.messageDescription}`
      }

      // 
      let welcomeFooter
      if(!doc.config.leave.messageColor){
        welcomeFooter = `Não definido`
      } else {
        welcomeFooter = `${doc.config.leave.messageColor}`
      }
      let welcomeColor
      if(!doc.config.leave.messageColor ){
        welcomeColor = `{branco}`
      } else {
        welcomeColor = `${doc.config.leave.messageColor}`
      }

      const info = new MessageEmbed()
      .setTitle('Menu | Leave')
      .setDescription(
        `**Seja muito Bem-Vindo(a) ao Menu de configurações do Leave**

        **Sistema: **
        ** > ${welcome}**
        **Canal de Saida **
        ** > ${welcomechannel}**
        **Mensagem de Saida:**
        ** Titulo:**
        ** > ${welcomeTitle}**
        ** Descrição:**
        ** > ${welcomeDescription}**
        ** Cor:**
        ** > ${welcomeColor}**

        **> Caso tenha duvidas utilize: ${doc.prefix}leave/Saida help**`
      )
      .setThumbnail(message.guild.iconURL())
      .setFooter(message.guild.name, message.guild.iconURL())
      .setColor('#fc9d03')

      if(!args[0]) return message.channel.send(info)

      switch (args[0]) {
        case "canal":
          if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
            return message.channel.send('Voce não tem permissão para esse comando.')
          }
          if(!mention) return message.channel.send(info)
          if(mention.id === doc.config.leave.channel) {
            return message.channel.send(
              `**${message.author} o canal ${mention} ja está definido para Saida**`
            ).then(msg => msg.delete({timeout: 12000}))
          } else {
            doc.config.leave.channel = mention.id
            doc.save()

            message.channel.send(
              `**${message.author} você definiu o canal ${mention} como canal de Saida **`
            ).then(msg => msg.delete({timeout: 12000}))
            break
          }
          case "title":
            if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
              return message.channel.send('Voce não tem permissão para esse comando.')
            }
            if(doc.welcomechannel === "bem-vindo") {
              return message.channel.send(
                `**${message.author} Nenhum canal foi setado para as Saida**`
              ).then(msg => msg.delete({timeout: 12000}))
            } else {
              doc.config.leavemessageTitle = args.slice(1).join(" ")
              doc.save()

              message.channel.send(
                `**${message.author} você definiu o Titulo da mensagem de Saida para: ${args.slice(1).join(" ")}**`
              ).then(msg => msg.delete({timeout: 12000}))
              break
            }
            case "description":
              if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
                return message.channel.send('Voce não tem permissão para esse comando.')
              }
              if(doc.welcomechannel === "bem-vindo") {
                return message.channel.send(
                  `**${message.author} Nenhum canal foi setado para as Saida**`
                ).then(msg => msg.delete({timeout: 12000}))
              } else {
                doc.config.leave.messageDescription = args.slice(1).join(" ")
                doc.save()
  
                message.channel.send(
                  `**${message.author} Você definiu a Descrição da mensagem de Saida para: ${args.slice(1).join(" ")}**`
                ).then(msg => msg.delete({timeout: 12000}))
                break
              }
              case "footer":
              if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
                return message.channel.send('Voce não tem permissão para esse comando.')
              }
              if(doc.welcomechannel === "bem-vindo") {
                return message.channel.send(
                  `**${message.author} Nenhum canal foi setado para as Saida**`
                ).then(msg => msg.delete({timeout: 12000}))
              } else {
                doc.config.leave.messageFooter = args.slice(1).join(" ")
                doc.save()
  
                message.channel.send(
                  `${message.author} Você definiu a Fonte da mensagem de Saida para: ${args.slice(1).join(" ")}`
                ).then(msg => msg.delete({timeout: 12000}))
                break
              }
              case "color":
              if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
                return message.channel.send('Voce não tem permissão para esse comando.')
              }
              if(doc.welcomechannel === "bem-vindo") {
                return message.channel.send(
                  `**${message.author} Nenhum canal foi setado para as Saida**`
                ).then(msg => msg.delete({timeout: 12000}))
              } else {
                doc.config.leave.messageColor = args.slice(1).join(" ")
                doc.save()
  
                message.channel.send(
                  `${message.author} Você definiu a Cor da mensagem de Saida para: ${args.slice(1).join(" ")}`
                ).then(msg => msg.delete({timeout: 12000}))
                break
              }

            case "remove":
              if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
                return message.channel.send('Voce não tem permissão para esse comando.')
              }
              if(!doc.welcome){
                return message.channel.send(
                  `**${message.author} O canal de Saida ainda nao foi definido!**`
                ).then(msg => msg.delete({timeout: 12000}))
              } else {
                doc.config.leave.enabled = false;
                doc.config.leave.channel = "Não definido"
                doc.config.leave.messageTitle = "Não definido"
                doc.config.leave.messageDescription = "Não definido"
                doc.config.leave.messageFooter = "Não definido"
                doc.config.leave.messageColor = "Não definido"
                doc.save()

                message.channel.send(
                  ` **${message.author} Você removeu o canal atual de Saida**`
                ).then(msg => msg.delete({timeout: 12000}))
                break
              }
              case "on":
                if(doc.config.leave.enabled === true) {
                  return message.channel.send(
                    ` ${message.author} O Sistema de Saida ja está ativado!`
                  ).then(msg => msg.delete({timeout: 12000}))
                } else {
                  doc.config.leave.enabled = true
                  doc.save().then(async () => {
                    await message.channel.send(
                      `** ${message.author} O Sistema de Saida do servidor foi Ativado!**`
                    ).then(msg => msg.delete({timeout: 12000}))
                  })
                  break
                }
                case "off":
                  if(doc.config.leave.enabled === false) {
                    return message.channel.send(
                      `** ${message.author} O Sistema de Saida ja está desativado!**`
                    ).then(msg => msg.delete({timeout: 12000}))
                  } else {
                    doc.config.leave.enabled = false
                    doc.save().then(async () => {
                      await message.channel.send(
                        `** ${message.author} O Sistema de Saida do servidor foi Desativado!**`
                      ).then(msg => msg.delete({timeout: 12000}))
                    })
                    break
                  }

                  case "help":
                    if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
                      return message.channel.send('Voce não tem permissão para esse comando.')
                    }
                    const embed = new MessageEmbed()
                    //.setAuthor(message.guild.name, message.guild.iconURL)
                    .setTitle('Help | Welcome')
                   // **${doc.prefix}welcome Footer <fonte>**
                    //  ** > Fonte da mensagem de Boas-Vindas (Fica la em baixo da mensagem bem pequeno)**
                    .setDescription(
                      `
                      **<-----------------------------> FORMAS DE USAR <----------------------------->**
                      
                      **${doc.prefix}leave canal <canal-mention>**
                      **> O canal mencionado será setado como o canal aonde todas as mensagens de saida serão envidas**
                      **${doc.prefix}leave Title <Titulo>**
                      ** > Titulo da mensagem de saida **
                      **${doc.prefix}leave description <descrição>**
                      ** > Descrição da mensagem de saida **
                      **${doc.prefix}leave color <color>**
                      ** > Cor da mensagem de saida **
                      **${doc.prefix}leave remover**
                      ** > Remove o canal atual aonde as mensagens são enviadas, a mensagem e também desativa o sistema de entrada**
                      **${doc.prefix}leave on**
                      ** > Ativa o sistema de saida  do servidor, ou seja apartir dai a mensagem será enviada**
                      **${doc.prefix}leave off**
                      ** > Desativa o sistema de saida do servidor, ou seja apartir dai a mensagem não será mais enviada**
                      **<-------------------------------> PLACEHOLDERS <------------------------------->**

                      **{usuario} - Marca o Usuario. Exemplo: ${message.author}**

                     **{usuario.id} - Pega a id do usuário. Exemplo: ${message.author.id}**

                     ** {usuario.nome} - Pega o nome do usuário. Exemplo: ${message.author.username}**

                     ** {usuario.tagnome} - Pega a tag/nome do usuário. Exemplo: ${message.author.tag}**

                    ** {usuario.tag} - Pega a tag do usuário. Exemplo: ${message.author.discriminator}**

                    ** {servidor} - Pega o nome do servidor. Exemplo: ${message.guild.name}**

                    ** {usuarios} - Pega o total de usuários no servidor. Exemplo: ${message.guild.memberCount}**

                    **Cores:**
                    **{branco}/{vermelho}/{azul-claro}/{laranja}/{amarelo}{azul}/{azul-escuro}/{roxo}/{rosa}/{verde}/{verde-escuro}/{verde-claro}**
                    `
                    )
                   // .setFooter(client.user.username, client.user.displayAvatarURL())
                      .setColor('#fc9d03')
                    message.channel.send(embed)
                    break
                    default:
                      message.channel.send(
                        `${message.author} A configuração ${args.slice(0).join(" ")} não foi encontrada, tente usar: [canal, remove, msg, on, off ou help].` 
                      ).then(msg => msg.delete({timeout: 12000}))
      }
    })
  }
}
