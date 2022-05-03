const express = require('express');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const authRouting = require('./routes/authRouting');
const saucesRouting = require('./routes/saucesRouting');
const helmet = require("helmet");

dotenv.config({path: 'config/.env'});
require('./config/dbConfig');
const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet({crossOriginResourcePolicy: false}));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/auth', authRouting);
app.use('/api/sauces', saucesRouting);

app.listen(process.env.PORT || 3000);