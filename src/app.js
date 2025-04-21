const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const routes = require('./routes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir imagens
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Todas as rotas passam por /api
app.use('/api', routes);

module.exports = app;
