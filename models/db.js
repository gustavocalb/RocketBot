const mongoose = require('mongoose');
const config = require('../config.json')

mongoose.connect(config.mongoDB, {
    useNewUrlParser: true ,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("[DATABASE] Conectado ao mongodb com sucesso!");
}).catch(e => {
    console.log("[ERRO] Houve um erro ao se conectar ao mongodb: \n\n" + e);
});