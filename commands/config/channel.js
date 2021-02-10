  
const { Comando } = require("../../utils/command.js");
const { MessageEmbed } = require('discord.js')
const  Guild  = require('../../models/Guild')
module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "channel",
            aliases: ["canais"],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
            botNeedPermissions: ["ADMINISTRATOR"],
            needPermissions: ["ADMINISTRATOR"],
        })
    }
    async run(client, message, args) {
    message.delete()
    let channel = message.mentions.channels.first();

   Guild.findOne({ guildID: message.guild.id }, function(erro, doc) {
    let prefix = doc.prefix


    let reportChannel;

    if (!doc.channels.reportChannel.enabled) {
        reportChannel = `OFF`;
     } else { 
        reportChannel = `ON`;
    }

    let reportChannelID;

    if (!doc.channels.reportChannel.channelID) {
        reportChannelID = `Não definido`;
    } else {
        reportChannelID = `<#${doc.channels.reportChannel.channelID}>`;
    }

    let sugestaoChannel;

    if (!doc.channels.sugestaoChannel.enabled) {
        sugestaoChannel = `OFF`;
    } else { 
        sugestaoChannel = `ON`;
    }
    let sugestaoChannelID;

    if (!doc.channels.sugestaoChannel.channelID ) {
        sugestaoChannelID = `Não definido`;
    } else {
        sugestaoChannelID = `<#${doc.channels.sugestaoChannel.channelID}>`;
    }

    let commandsChannel;

    if (!doc.channels.commandsChannel.enabled) {
        commandsChannel = `OFF`;
    } else { 
        commandsChannel = `ON`;
    }
    let commandsChannelID;

    if (!doc.channels.commandsChannel.channelID) {
        commandsChannelID = `Não definido`;
    } else {
        commandsChannelID = `<#${doc.channels.commandsChannel.channelID}>`;
    }

    let logsChannel

    if (!doc.channels.logsChannel.enabled) {
      logsChannel = `OFF`;
    } else { 
      logsChannel = `ON`;
    }
    let logsChannelID

    if (!doc.channels.logsChannel.channelID) {
      logsChannelID = `Não definido`;
    } else {
      logsChannelID = `<#${doc.channels.logsChannel.channelID}>`;
    }



    const info = new MessageEmbed()
      .setAuthor('Menu | Channel')
      .setDescription(
        `**Seja muito Bem-Vindo(a) ao Menu de configurações de Canais**

        **Status Report 🛑**

        **Status Sugestão 💭**

        ** Status Logs ⚙️**
      `)
      .setFooter(`Caso tenha duvidas utilize ${prefix}channel help`)
      .setColor('#5e0094')
      .setThumbnail(message.guild.iconURL())

      const reportembed = new MessageEmbed()
        .setTitle('Status | Report')
        .setDescription(`
        ** Status:**
        **> ${reportChannel}**
        ** Canal:**
        **> ${reportChannelID}**
        `)
        .setFooter(`Caso tenha duvidas utilize ${prefix}channel help`)
      .setColor('#5e0094')
      .setThumbnail(message.guild.iconURL())
        const sugestaoembed = new MessageEmbed()
        .setTitle('Status | Sugestão')
        .setDescription(`
        ** Status:**
          ** > ${sugestaoChannel}**
          ** Canal:**
          **  > ${sugestaoChannelID}**
        `)
        .setFooter(`Caso tenha duvidas utilize ${prefix}channel help`)
      .setColor('#5e0094')
      .setThumbnail(message.guild.iconURL())
        const logsembed = new MessageEmbed()
        .setTitle('Status | Logs')
        .setDescription(`
        ** Status:**
        ** > ${logsChannel}**
        ** Canal:**
        **> ${logsChannelID}**
        `)
        .setFooter(`Caso tenha duvidas utilize ${prefix}channel help`)
      .setColor('#5e0094')
      .setThumbnail(message.guild.iconURL())

      if(!args[0]) return message.channel.send(info).then(msg => {
                msg.react("🛑")
                msg.react("💭")
                msg.react("⚙️")

                let filter = (reaction, usuario) => {
                  return ['🛑','💭', '⚙️', '⏪',].includes(reaction.emoji.name) && usuario.id === message.author.id;
              }
                const colector = msg.createReactionCollector(filter, {time: 100000});
                colector.on("collect", em => {
                  switch (em.emoji.name) {
                    case "🛑":
                      msg.reactions.removeAll();
                      msg.edit(reportembed)
                      msg.react("⏪")
                      break;
                    case "💭": 
                      msg.reactions.removeAll()
                      msg.edit(sugestaoembed)
                      msg.react("⏪")
                      
                      break;
                      case "⚙️":
                        msg.reactions.removeAll()
                        msg.edit(logsembed)
                        msg.react("⏪")
                        break
                        case "⏪":
                          msg.edit(info)
                          em.remove(message.author.id)
                          msg.react('🛑')
                          msg.react('💭')
                          msg.react('⚙️')
                          break
                  }
                })
              })

      switch (args[0]) {
          case "report":
            if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
                return message.channel.send('Voce não tem permissão para esse comando.')
              }
              if (args[1] == "on") {
              if(doc.channels.reportChannel.enabled === true) {
                  return message.channel.send(`
                  ${message.author} O status do Report ja está Ativo!
                  `).then(msg => msg.delete({timeout: 6000}))
              } else {
                doc.channels.reportChannel.enabled = true;
                doc.save().then(async () => {
                  await message.channel.send(
                    `${message.author} O canal de Report do servidor foi Ativado!` 
                  ).then(msg => msg.delete({timeout: 6000}))
                });
                break;
              }
            }
            if (args[1] == "off") {
                if (doc.channels.reportChannel.enabled === false) {
                  return message.channel.send(
                    `${message.author} O canal do Report ja está Desativado!`
                  ).then(msg => msg.delete({timeout: 6000}))
                } else {
                  doc.channels.reportChannel.enabled = false;
                  doc.save().then(async () => {
                    await message.channel.send(
                        `${message.author} O canal de Report do servidor foi Desativado!` 
                    ).then(msg => msg.delete({timeout: 6000}))
                  });
                  break;
                }
              }
              if (!reportChannel) return message.channel.send(info).then(msg => {
                msg.react("🛑")
                msg.react("💭")
                msg.react("⚙️")

                let filter = (reaction, usuario) => {
                  return ['🛑','💭', '⚙️', '⏪',].includes(reaction.emoji.name) && usuario.id === message.author.id;
              }
                const colector = msg.createReactionCollector(filter, {time: 100000});
                colector.on("collect", em => {
                  switch (em.emoji.name) {
                    case "🛑":
                      msg.reactions.removeAll();
                      msg.edit(reportembed)
                      msg.react("⏪")
                      break;
                    case "💭": 
                      msg.reactions.removeAll()
                      msg.edit(sugestaoembed)
                      msg.react("⏪")
                      
                      break;
                      case "⚙️":
                        msg.reactions.removeAll()
                        msg.edit(logsembed)
                        msg.react("⏪")
                        break
                        case "⏪":
                          msg.edit(info)
                          em.remove(message.author.id)
                          msg.react('👮')
                          msg.react('🌐')
                          msg.react('🛠️')
                          break
                  }
                })
              })
        if(!channel){
          return message.channel.send('mencione um canal')
        }      
        if (channel.id === doc.channels.reportChannel.channelID) {
          return message.channel.send(
            `${message.author} o canal <#${doc.channel.reportChannel.channelID}> ja está setado para o Report`
          ).then(msg => msg.delete({timeout: 6000}))
        } else {
          doc.channels.reportChannel.channelID = channel.id;
          doc.save();

          message.channel.send(
            `${message.author} Você setou o canal <#${doc.channels.reportChannel.channelID}> para os Reports`
          ).then(msg => msg.delete({timeout: 6000}))
          break;
        }
        case "sugestao":
            if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
                return message.channel.send('Voce não tem permissão para esse comando.')
              }
              if (args[1] == "on") {
              if(doc.channels.sugestaoChannel.enabled === true) {
                  return message.channel.send(`
                  ${message.author} O canal de Sugestão ja está Ativo!
                  `).then(msg => msg.delete({timeout: 6000}))
              } else {
                doc.channels.sugestaoChannel.enabled = true;
                doc.save().then(async () => {
                  await message.channel.send(
                    `${message.author} O canal de Sugestão do servidor foi Ativado!` 
                  ).then(msg => msg.delete({timeout: 6000}))
                });
                break;
              }
            }
            if (args[1] == "off") {
                if (doc.channels.sugestaoChannel.enabled === false) {
                  return message.channel.send(
                    `${message.author} O canal de Sugestão ja está Desativado!`
                  ).then(msg => msg.delete({timeout: 6000}))
                } else {
                  doc.channels.sugestaoChannel.enabled = false;
                  doc.save().then(async () => {
                    await message.channel.send(
                        `${message.author} O canal de Sugestão do servidor foi Desativado!` 
                    ).then(msg => msg.delete({timeout: 6000}))
                  });
                  break;
                }
              }
              if (!sugestaoChannel) return message.channel.send(info);

              if(!channel){
                return message.channel.send('mencione um canal')
              }  
        if (channel.id === doc.channels.sugestaoChannel.channelID) {
          return message.channel.send(
            `${message.author} o canal <#${doc.channel.sugestaoChannel.channelID}> ja está setado para Sugestões`
          ).then(msg => msg.delete({timeout: 6000}))
        } else {
          doc.channels.sugestaoChannel.channelID = channel.id;
          doc.save();

          message.channel.send(
            `${message.author} Você setou o canal <#${doc.channels.sugestaoChannel.channelID}> para receber Sugestões`
          ).then(msg => msg.delete({timeout: 6000}))
          break;
        }
        case "commands":
            if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
                return message.channel.send('Voce não tem permissão para esse comando.')
              }
              if (args[1] == "on") {
              if(doc.channels.commandsChannel.enabled === true) {
                  return message.channel.send(`
                  ${message.author} O canal de Comandos ja está Ativo!
                  `).then(msg => msg.delete({timeout: 6000}))
              } else {
                doc.channels.commandsChannel.enabled = true;
                doc.save().then(async () => {
                  await message.channel.send(
                    `${message.author} O canal de Comandos do servidor foi Ativado!` 
                  ).then(msg => msg.delete({timeout: 6000}))
                });
                break;
              }
            }
            if (args[1] == "off") {
                if (doc.channels.commandsChannel.enabled === false) {
                  return message.channel.send(
                    `${message.author} O status do Comandos ja está Desativado!`
                  ).then(msg => msg.delete({timeout: 6000}))
                } else {
                  doc.channels.commandsChannel.enabled = false;
                  doc.save().then(async () => {
                    await message.channel.send(
                        `${message.author} O canal de Comandos do servidor foi Desativado!` 
                    ).then(msg => msg.delete({timeout: 6000}))
                  });
                  break;
                }
              }
              if (!commandsChannel) return message.channel.send(info);

        if (channel.id === doc.channels.commandsChannel.channelID) {
          return message.channel.send(
            `${message.author} o canal <#${doc.channel.commandsChannel.channelID}> ja está setado para receber Comandos`
          ).then(msg => msg.delete({timeout: 6000}))
        } else {
          doc.channels.commandsChannel.channelID = channel.id;
          doc.save();

          message.channel.send(
            `${message.author} Você setou o canal <#${doc.channels.commandsChannel.channelID}> para receber Comandos`
          ).then(msg => msg.delete({timeout: 6000}))
          break;
        }
        case "logs":
          if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
            return message.channel.send('Voce não tem permissão para esse comando.')
          }
          if (args[1] == "on") {
          if(doc.channels.logsChannel.enabled === true) {
              return message.channel.send(`
              ${message.author} O canal de Logs ja está Ativo!
              `).then(msg => msg.delete({timeout: 6000}))
          } else {
            doc.channels.logsChannel.enabled = true;
            doc.save().then(async () => {
              await message.channel.send(
                `${message.author} O canal de Logs do servidor foi Ativado!` 
              ).then(msg => msg.delete({timeout: 6000}))
            });
            break;
          }
        }
        if (args[1] == "off") {
            if (doc.channels.logsChannel.enabled === false) {
              return message.channel.send(
                `${message.author} O canal de Logs ja está Desativado!`
              ).then(msg => msg.delete({timeout: 6000}))
            } else {
              doc.channels.logsChannel.enabled = false;
              doc.save().then(async () => {
                await message.channel.send(
                    `${message.author} O canal de Logs do servidor foi Desativado!` 
                ).then(msg => msg.delete({timeout: 6000}))
              });
              break;
            }
          }
          if (!logsChannel) return message.channel.send(info);

          if(!channel){
            return message.channel.send('mencione um canal')
          }  
    if (channel.id === doc.channels.logsChannel.channelID) {
      return message.channel.send(
        `${message.author} o canal <#${doc.channel.logsChannel.channelID}> ja está setado para Logs`
      ).then(msg => msg.delete({timeout: 6000}))
    } else {
      doc.channels.logsChannel.channelID = channel.id;
      doc.save();

      message.channel.send(
        `${message.author} Você setou o canal <#${doc.channels.logsChannel.channelID}> para receber as Logs`
      ).then(msg => msg.delete({timeout: 6000}))
      break;
    }

        case "help":
            const helpEmbed = new Discord.MessageEmbed()
              .setTitle('Help | Channel')
              .setDescription(
                `
                **<--------------------> CANAIS <-------------------->**
                **report**
                ** > Canal aonde irá todo os reports do Servidor**
                **sugestao**
                ** > Canal aonde irá todos as Sugestões do Servidor**

                **<--------------------> FORMAS DE USAR <-------------------->**

                ** ${doc.prefix}channel <report/sugestao> on**
                ** > Ativa o canal Report/Sugestao**
                **${doc.prefix}channel <report/sugestao> off**
                ** > Desativa o canal Report/Sugestao **
                ** ${doc.prefix}channel <Report/Sugestao> <#canal>**
                ** > Seta o canal para as mensagem de Report/Sugestao**
                `
              )
              .setColor('#5e0094')
              .setThumbnail(message.guild.iconURL())  

            message.channel.send(helpEmbed);
            break;
    
          default:
            message.channel.send(
              `\`${message.author.tag}\` configuração \`${args
                .slice(0)
                .join(
                  " "
                )}\` desconhecida, tente usar: \`channel, on, off ou help\`.`)
      }
   })
}
}
