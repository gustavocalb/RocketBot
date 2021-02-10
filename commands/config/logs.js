  
const { Comando } = require("../../utils/command.js");
const { MessageEmbed } = require('discord.js')
const  Guild  = require('../../models/Guild')
module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "logs",
            aliases: [],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
            botNeedPermissions: ["ADMINISTRATOR"],
            needPermissions: ["ADMINISTRATOR"],
        })
    }
    async run(client, message, args) {
        Guild.findOne({ guildID: message.guild.id}, function(err, doc) {
            let messageDelete
            if(!doc.config.logs.messageDelete){
                messageDelete = 'OFF'
            } else {
                messageDelete = 'ON'
            }
            let messageUpdate 
            if(!doc.config.logs.messageUpdate){
                messageUpdate = 'OFF'
            } else {
                messageUpdate = 'ON'
            }
            const embed = new MessageEmbed()
            .setTitle('Status | Logs')
            .setDescription(`
            **Seja muito Bem-Vindo(a) ao Sistema de Status das Logs**

            ** MessageDelete:**
            **> ${messageDelete}**
            **MessageUpdate:**
            **> Em desenvolvimento...**
            `)
            .setThumbnail(message.guild.iconURL())
            .setFooter(message.guild.name, message.guild.iconURL())
            .setColor('#fc9d03')

            if(!args[0]) return message.channel.send(embed)
            switch (args[0]) {
                case 'messagedelete':
                    if (args[1] == "on") { 
                        if(doc.config.logs.messageDelete === true){
                            return message.channel.send(`${message.author} O Sistema logs de Mensagens Apagadas ja está Ativado!`).then(msg => msg.delete({timeout: 7000}))
                        } else {
                            doc.config.logs.messageDelete = true
                            doc.save().then(async() => {
                                await message.channel.send(
                                    `${message.author} O Sistema de Logs de Mensagens Apagadas foi Ativado!`
                                ).then(msg => msg.delete({timeout: 6000}))
                            })
                            break
                        }
                    } 
                    if (args[1] == "off") { 
                        if(doc.config.logs.messageDelete === false){
                            return message.channel.send(`${message.author} O Sistema logs de Mensagens Apagadas ja está Desativado!`).then(msg => msg.delete({timeout: 7000}))
                        } else {
                            doc.config.logs.messageDelete = false
                            doc.save().then(async() => {
                                await message.channel.send(
                                    `${message.author} O Sistema de Logs de Mensagens Apagadas foi desativado!`
                                ).then(msg => msg.delete({timeout: 6000}))
                            })
                            break
                        }
                    } 
                // case 'messageupdate':
                //     if (args[1] == "on") { 
                //         if(doc.config.logs.messageUpdate === true){
                //             return message.channel.send(`${message.author} O Sistema logs de Mensagens Editadas ja está Ativado!`).then(msg => msg.delete({timeout: 7000}))
                //         } else {
                //             doc.config.logs.messageUpdate = true
                //             doc.save().then(async() => {
                //                 await message.channel.send(
                //                     `${message.author} O Sistema de Logs de Mensagens Editadas foi Ativado!`
                //                 ).then(msg => msg.delete({timeout: 6000}))
                //             })
                //             break
                //         }
                //     } 
                //     if (args[1] == "off") { 
                //         if(doc.config.logs.messageUpdate === false){
                //             return message.channel.send(`${message.author} O Sistema logs de Mensagens Editadas ja está Desativado!`).then(msg => msg.delete({timeout: 7000}))
                //         } else {
                //             doc.config.logs.messageUpdate = false
                //             doc.save().then(async() => {
                //                 await message.channel.send(
                //                     `${message.author} O Sistema de Logs de Mensagens Editadas foi desativada!`
                //                 ).then(msg => msg.delete({timeout: 6000}))
                //             })
                //             break
                //         }
                //     }
            }
        })
    }
}