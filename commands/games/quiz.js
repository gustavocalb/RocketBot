const { Comando } = require('../../utils/command')
const { MessageEmbed } = require('discord.js')


let channels = [];

const quiz = [
    {q: "Qual nome do meu Criador? \n\nA) Fire Shark \nB) Jubileu22 \nC) Rafael \nD) Dark", a: "a"},
    {q: "Qual é o nome do bot? \n\nA) Loritta\nB) Rocket\nC) Geralt\nD) Dyno", a: "b"},
    {q: "Qual linguagem o bot foi criada? \n\nA) Java\nB) Ruby\nC) Python\nD) Javascript", a: "d"},
];

const options = {
    max: 1,
    time: 30000,
    errors: ["time"],
};
module.exports = class Ping extends Comando {
    constructor(client) {
        super(client, {
            name: "quiz",
            description: "Veja os status da minha conexão com o servidor.",
            aliase: []
        })
    }
    run = async (client, message, args ) => {


    if(channels.includes(message.channel.id)) return message.channel.send("já existe um quiz rolando, aguarde o final do mesmo antes que seja iniciado outro.");

    const item = quiz[Math.floor(Math.random() * quiz.length)];
    const quizembed = new MessageEmbed()
    .setTitle(`Pergunta | Quiz`)
    .setDescription(`**${item.q}**`)
    //.setFooter(client.user.username, client.user.displayAvatarURL())
    .setColor('RANDOM')
    await message.channel.send(quizembed);
    channels.push(message.channel.id);
    try {
        const collected = await message.channel.awaitMessages(answer => item.a.includes(answer.content.toLowerCase()), options);
        const winnerMessage = collected.first();
        for (var i = 0; i < channels.length; i++){ 
            if (channels[i] === message.channel.id) {
              channels.splice(i, 1); 
            };
         };
        return message.channel.send({embed: new MessageEmbed()
            .setTitle(`🎉 Acho que temos um Vencedor! 🎉`)
            .setDescription(`**O membro ${winnerMessage.author} acertou! Parabens!!🎉 **`)
            .addField('Pergunta:', `**> ${item.q}**`)
            .addField('Resposta:', `**> ${item.a}**`)
            .setColor('RANDOM')
            //.setFooter(client.user.username, client.user.displayAvatarURL())
        })
    } catch (e) {
        for (var i = 0; i < channels.length; i++){ 
            if (channels[i] === message.channel.id) {
              channels.splice(i, 1); 
            };
         };
        return message.channel.send({embed: new MessageEmbed()
            .setTitle('😫 Ninguém acertou a tempo! 😫')
            .addField('Pergunta:', `**> ${item.q}**`)
            .addField('Resposta Correta era:', `**> ${item.a}**`)
            .setColor('RANDOM')
            //.setFooter(client.user.username, client.user.displayAvatarURL())
        })
    }
}
}