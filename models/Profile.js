const mongoose = require('mongoose')
const Profile = mongoose.Schema({
    guildID: String,
    guildName: String,
    userID: String,
    username: String,
    vip: {
        enabled: false,
    },
    tempovip: {
        type: Number,
        default: 2592000
    },
    reps: {
        type: Number,
        default: 0
    },
    temporep: {
        type: Number,
        default: 0
    },
        coins: {
            type: Number,
            default: 0
        },
        boosters: [{ name: String, time: String }],
        daily: {
          type: String,
          default: "0000"
        },
        level: {
            type: Number,
            default: 0 
        },
        xp: {
            type: Number,
            default: 0
        },
        work: {
            type: String,
            default: "0000",
        },
        money: {
            type: Number,
            default: 0
        },
        pescaria: {
            type: Boolean,
            default: false
        },
        uber: {
            type: Boolean,
            default: false
        },
        minerador: {
            type: Boolean,
            default: false
        },
        picareta: {
            type: Number,
            default: 0
        },
        carro: {
            type: Number,
            default: 0
        },
        vara: {
            type: Number,
            default: 0
        }
        
        // blacklist: {
        //     type: Boolean,
        //     default: false
        // }
})
module.exports = mongoose.model('Profile', Profile)
