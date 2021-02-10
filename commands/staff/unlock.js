  
const { Comando } = require("../../utils/command.js");
const Guild = require('../../models/Guild')
module.exports = class Unlock extends Comando {
    constructor(client) {
        super(client, {
            name: "unlock",
            aliases: ["destravar"],
            description: "Eu deixarei a permissão de **everyone** neutra para todos poderem seguir com as suas falas normalmente, caso tenha permissão.",
            needPermissions: ["MANAGE_CHANNELS"],
            botNeedPermissions: ["MANAGE_CHANNELS"]
        })
    }
    run(client, message) { 
        Guild.findOne({guildID: message.guild.id}, (err, doc) => { 
        message.channel.updateOverwrite(message.guild.id, {
            SEND_MESSAGES: true
            });
            
        message.reply(`canal desbloqueado com sucesso! Utilize o comando \`${doc.prefix}lock\` para bloquear!`);
        return;
    })
}
}