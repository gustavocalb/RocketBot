const { MessageEmbed } = require('discord.js')
const { Comando } = require("../../utils/command.js");
const Guild = require('../../models/Guild')
module.exports = class Unlock extends Comando {
    constructor(client) {
        super(client, {
            name: "setprefix",
            aliases: ["trocarprefix"],
            description: "Eu deixarei a permissão de **everyone** neutra para todos poderem seguir com as suas falas normalmente, caso tenha permissão.",
            needPermissions: ["MANAGE_CHANNELS"],
            botNeedPermissions: ["MANAGE_CHANNELS"]
        })
    }
    run(client, message, args) { 
        message.delete()
        if(!message.member.hasPermission("MANAGE_GUILD")) {
            return message.reply('Voce não tem permissão para esse comando.')
        }
        let argumentss = args.join(" ")
        if(!argumentss){
            return message.channel.send(`Coloque um prefix valido!`)
        }
            Guild.findOneAndUpdate(
                { guildID: message.guild.id },
                { prefix: argumentss },
         (err, doc) => {
            message.reply("**O Prefixo alterado para **`" + argumentss + "` **com Sucesso!**").then(msg => msg.delete({timeout: 6000}))
          }
        ).catch(err => console.log(err))
        }
}
