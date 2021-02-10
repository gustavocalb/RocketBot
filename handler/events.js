const fs = require("fs")

module.exports = class eventHandler {
    constructor(client) {
        this.client = client;
        this.init()
    }

    init() {
        fs.readdirSync('./events/').forEach(event => {
            const evento = require(`../events/${event}`)
            this.client.on(event.split(".")[0], evento.bind(null, this.client))
        })
    }
}