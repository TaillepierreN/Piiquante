const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://${process.env.BDD_USER}:${process.env.BDD_PASSWORD}@piiquante.cdh5o.mongodb.net/Piiquante?retryWrites=true&w=majority&tlsInsecure=true`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));