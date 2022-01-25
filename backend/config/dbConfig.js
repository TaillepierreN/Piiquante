const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://Nicolas:pii123@piiquante.cdh5o.mongodb.net/Piiquante?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));