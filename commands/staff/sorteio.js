  
const { Comando } = require("../../utils/command.js");

module.exports = class Lock extends Comando {
    constructor(client) {
        super(client, {
            name: "sorteio",
            aliases: [],
            description: "Eu tirarei a permissão de **everyone** para mandar mensagens em seu canal.",
            botNeedPermissions: ["BAN_MEMBERS"],
            needPermissions: ["BAN_MEMBERS"],
        })
    }
    async run(client, message, args) {
    let time = args[0]
    if(!time) {
        return message.channel.send('Ops.. Voce nao especificou o Tempo.')
    }
    let sorting = args.slice(1).join(" ")
    if(!sorting) {
        return message.channel.send('Ops.. Voce nao especificou oque será sorteado.')
    }
    let timea = time * 1000 * 60

    const embed = new Discord.MessageEmbed()
    .setTitle(`🎉 **Sorteio** 🎉`)
    .setDescription(`Para participar do sorteio reaja com 🎉!`)
    .setColor('#24d197')
    .addField('Sorteio de:', `**${sorting}**`)
    .setFooter(`Sorteio acaba em ${time} minuto(s)!`)
    message.channel.send(embed).then(msg => {
        msg.react("🎉")
        var collector = msg.createReactionCollector(
            (r, u) => r.emoji.name === "🎉"
        );
        collector.on("end", r => {
            if(!r.first()){
            const embed2 = new MessageEmbed()
            .setTitle('Sorteio Cancelado')
            .setDescription(`Sorteio Cancelado! Não ouve participantes!`)
            .setColor('#24d197')
            .setAuthor(`${sorting}`)
            .setFooter(`Cancelado!`);
            msg.reactions.removeAll();
          return msg.edit(embed2);
        }
        var user = r.first().users.cache.filter(user => !user.bot).random()
        const embed3 = new MessageEmbed()
        .setTitle(`🎉 **Sorteio Finalizado** 🎉`)
          .setDescription(`Ganhador: **${user}**`)
          .setColor('#24d197')
          .setAuthor(`${sorting}`)
          .setFooter(`Sorteio Finalizado!`);
          msg.reactions.removeAll();
          msg.edit(embed3)
          message.channel.send(`@everyone`, `Sorteio Encerrado!`);
            });
            setTimeout(() => {
                collector.stop();
              }, timea);
            });
        }
      }