const moment = require("moment");
require("moment-duration-format");
const database = require('../models/db')
const Guild = require('../models/Guild')
module.exports = async client => {
  console.log(`[LOGS] ${client.user.tag} fez login!`)
  client.guilds.cache.forEach(guild => {
    Guild.findOne({guildID: guild.id}, (err, doc) => {
       if (!doc) { 
        return new Guild({
            guildID: guild.id,
            guildName: guild.name,
            prefix: '!'
            }).save().then(() => {
                console.log("[LOGS] Uma nova guild foi registrada!"); 
            });
        }
    });
})
//  client.guilds.cache.forEach(guild => {
//   console.log(guild.name, guild.id)
// })

  let membros = client.guilds.cache.map((g) => g.memberCount).reduce((p, c) => p + c);
  setInterval(async() => {
  const canal = client.channels.cache.get("738127224066277466");
  canal.setName("💻 | Servidores: " + client.guilds.cache.size);
}, 300000);
  setInterval(async() => {
  const canal1 = client.channels.cache.get("738127237345312870");
  canal1.setName("👤 | Membros: " + membros);
    }, 300000);    
  setInterval(async() => {              
    const ping = parseInt(client.ws.ping) + " ms";
    await client.channels.cache.get("738159533737640001").setName(`📡 | Ping: ${ping}`)         
  },  300000);
async function status() {

    const uptime = moment.duration(client.uptime).format(`y[a] M[m] w[s] d[d] h[h] m[m] s[s]`)

    const status = [
        {
            type: 'WATCHING',
            message: `${client.guilds.cache.size} Servidores.`
          },
          {
            type: 'LISTENING',
            message: `${membros} membros.`
          },
          {
            type: 'WATCHING',
            message: `Eu não durmo à ${uptime}`
          },
          // {
          //   type: 'WATCHING',
          //   message: `Está querendo ficar sempre atualizado sobre mim? Acesse meu discord oficial! discord.gg/AXpemR`,
          // },
          {
            type: 'PLAYING',
            message: `Meu prefix padrao é '!'`
          },
    ];

    const random = status[Math.floor(Math.random() * status.length)];
    client.user.setActivity(random.message, {
      type: random.type,
      url: random.url,
    });
}
  setInterval(status, 15000)
}
