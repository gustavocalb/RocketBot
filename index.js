const { Client, Collection } = require("discord.js")
const config = require("./config.json")
const commandHandler = require("./handler/commands.js")
const eventHandler = require("./handler/events.js")

class Rocket extends Client {
    constructor() {
        super()
        this.config = config,
        this.options.fetchAllMembers = true;
        this.init();
    }

    async init() {
        await this.login(this.config.token);
        this.commands = new Collection();
        this.aliases = new Collection();
        this.load();
    }
    
    load() {
        this.commandHandler =  new commandHandler(this);
        this.eventHandler =  new eventHandler(this);
        // this.database =  new initDatabase(this);
        this.log();
    }

    log() {
        console.log(`[LOGS] ${this.user.tag} fez login!`);
    }
}

new Rocket();