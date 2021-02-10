  
const { Comando } = require("../../utils/command.js");
const { MessageEmbed } = require('discord.js')
const  Guild  = require('../../models/Guild')
module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "autorole",
            aliases: [],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
            botNeedPermissions: ["ADMINISTRATOR"],
            needPermissions: ["ADMINISTRATOR"],
        })
    }
    async run(client, message, args) {
    let role = message.mentions.roles.first()
    message.delete()

  Guild.findOne({ guildID: message.guild.id }, function(erro, doc) {
    let autorole;
    let prefix = doc.prefix
    if (!doc.config.autoRole.enabled) autorole = `OFF`;
    else autorole = `ON`;

    let autoroleid;

    if (!doc.config.autoRole.roleID ){
      autoroleid = `Não definido`;
    } else {
      autoroleid = `<@&${doc.config.autoRole.roleID}>`}

    const info = new MessageEmbed()
    .setTitle('Menu | AutoRole')
    .setDescription(`**Seja Bem-Vindo(a) ao Menu de configurações de AutoRole do servidor!**`)
    .addField('**Status:**', `> **${autorole}**`)
    .addField('**Cargo AutoRole:**', `> **${autoroleid}**`)
    .setFooter(`Caso tenha duvidas utilize ${prefix}autorole help`)
    .setThumbnail(message.guild.iconURL())
    .setColor('#03fccf')
    if (!args[0]) return message.channel.send(info);

    switch (args[0]) {
      case "role":
        if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
          return message.channel.send('Voce não tem permissão para esse comando.')
        }

        if (!role) return message.channel.send(info);

        if (role.id === doc.config.autoRole.roleID) {
          return message.channel.send(
            `**${message.author} a role <@&${doc.config.autoRole.roleID}> ja está setada como AutoRole do Servidor!**`
          ).then(msg => msg.delete({ timeout: 7000 }))
        } else {
            doc.config.autoRole.roleID = role.id;
          doc.save();

          message.channel.send(
            `**${message.author} você setou a role <@&${doc.config.autoRole.roleID}> como AutoRole do Servidor!**`
          ).then(msg => msg.delete({ timeout: 7000 }))
          break;
        }

      case "remover":
        if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
          return message.channel.send('Voce não tem permissão para esse comando.')
        }

        if (!doc.config.autoRole.enabled) {
          return message.channel.send(
            `**${message.author} o autorole não está habilitado para você remove-lo do servidor!**`
          ).then(msg => msg.delete({ timeout: 7000 }))
        } else {
          doc.config.autoRole.roleID = "Membro";
          doc.save();

          message.channel.send(
            `**${message.author} você removeu a role <@&${doc.config.autoRole.roleID}> como AutoRole do servidor!**`
          ).then(msg => msg.delete({ timeout: 7000 }))
          break;
        }

      case "on":
        if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
          return message.channel.send('Voce não tem permissão para esse comando.')
        }
        if (doc.config.autoRole.enabled === true) {
          return message.channel.send(
            `**${message.author} O AutoRole já está ativo!**`
          ).then(msg => msg.delete({ timeout: 7000 }))
        } else {
            doc.config.autoRole.enabled = true;
          doc.save().then(async () => {
            await message.channel.send(
              `**${message.author} O AutoRole foi Ativado!**`
            ).then(msg => msg.delete({ timeout: 7000 }))
          });
          break;
        }

      case "off":
        if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
          return message.channel.send('Voce não tem permissão para esse comando.')
        }
        if (doc.config.autoRole.enabled === false) {
          return message.channel.send(
            `**${message.author} O AutoRole já está Desativado!**`
          ).then(msg => msg.delete({ timeout: 7000 }))
        } else {
            doc.config.autoRole.enabled = false;
          doc.save().then(async () => {
            await message.channel.send(
              `**${message.author} O Autorole foi Desativado!**`
            ).then(msg => msg.delete({ timeout: 7000 }))
          });
          break;
        }

      case "help":
        if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_MESSAGES")) {
          return message.channel.send('Voce não tem permissão para esse comando.')
        }
        const helpEmbed = new MessageEmbed()
          .setTitle('Help | AutoRole')
          .setDescription(
            `
            **<------------------------> FORMAS DE USAR <------------------------>**

            ** ${doc.prefix}autorole on **
            ** > Ativará o status do autorole, ou seja com isto o comando irá setar o cargo nos membros**
            ** ${doc.prefix}autorole off **
            ** > Desativará o status do autorole, ou seja com isto o comando não irá mais setar o cargo nos membros**
            **${doc.prefix}autorole role <@role> **
            ** > O cargo mencionado será setado como cargo principal, ou seja todos os novos membros receberam ele**
            ** ${doc.prefix}autorole remover **
            **> Remove o cargo atual do autorole, ou seja todos os membros novos não receberam mais nenhum cargo**
            `
          )
          .setColor('#03fccf')
          .setThumbnail(message.guild.iconURL())

        message.channel.send(helpEmbed);
        break;

      default:
        message.channel.send(
          `\`${message.author.tag}\` configuração \`${args
            .slice(0)
            .join(
              " "
            )}\` desconhecida, tente usar: \`role, remover, on, off ou help\`.`
        );
    }
  });
    }
}