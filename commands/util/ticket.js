const { Comando } = require("../../utils/command.js");
const { findUser } = require("../../functions.js");
const { MessageEmbed } = require("discord.js");
const Guild = require('../../models/Guild')
module.exports = class Avatar extends Comando {
    constructor(client) {
        super(client, {
            name: "ticket",
            aliases: [],
            description: "Veja o avatar de um usuário!",
            usage: "<user>"
        })
    }

    run = async (client, message, args) => {
    let doc = await Guild.findOne({ guildID: message.guild.id},  (err, doc) => {
    });
    let prefix = doc.prefix
    message.delete()
    const embed = new MessageEmbed()
    .setTitle(`Ticket de ${message.author.username}`)
    .setDescription(`**Para finalizar seu Ticket basta dar** \`\`\`${prefix}Finalizar\`\`\``)
    .setFooter(message.guild.name, message.guild.iconURL())
    .setTimestamp()
    .setColor('BLUE')
    //const reason = args
    const findCategory = await message.guild.channels.cache.find(r => r.type == "category" && r.name == "Tickets")

    if(!message.guild.me.hasPermission("MANAGE_ROLES") && message.guild.me.hasPermission("MANAGE_CHANNELS")){
        return message.reply("Eu não tenho as permissões necessárias para isso!")
    }
    await (findCategory) ? findCategory : message.guild.channels.create("Tickets", {type: "category"}) 
    console.log(`Canal de Ticket criado em ${message.guild.name} | ${message.guild.id}`)

    const newChannelName = `${message.author.tag.replace(/[^a-zA-Z ]/g, "-")}`
    if(message.guild.channels.cache.filter(channel => channel.name == newChannelName)[0]) {
        return message.channel.send(`${message.author} Voce ja tem um Ticket aberto!`)
    } 
    
    return message.guild.channels.create(newChannelName, {type: "text", parent: findCategory.id, 
    permissionOverwrites: [
        {
        id: message.guild.id,
        deny: ["VIEW_CHANNEL"]
    },
    {
        id: message.author.id,
        allow: ["VIEW_CHANNEL"]
        },
    ]
}).then(m => {
    m.send(`**${message.author} Seu Ticket foi criado com Sucesso!**`, embed)
})
}
}