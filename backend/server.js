const express = require('express');
const app = express();
const authRouting = require('./routes/authRouting');
const saucesRouting = require('./routes/saucesRouting');
require('./config/dbConfig');

app.use(express.json());

// app.use((req,res,next) =>{
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
// })

app.use('/api/auth', authRouting);
app.use('/api/sauces', saucesRouting);

app.listen(3000);