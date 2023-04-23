const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const MONGO_DB_CONNECTION_STRING = process.env.MONGO_DB_CONNECTION_STRING || require('./keys.json').MONGO_DB_CONNECTION_STRING;
const PORT = process.env.PORT || require('./keys.json').DEFAULT_PORT;

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_DB_CONNECTION_STRING)
    .then(() => {
        console.log('Connected to MongoDB');
    
        const app = express();
        
        app.use(express.json());
        app.use(morgan('dev'));
        app.use(express.static(path.join(__dirname, 'www')));
        
        app.use((req, res, next) => {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
            next();
        });
        
        app.use('/api/authentication', require('./api/routes/authentication.routes'));
        app.use('/api/password', require('./api/routes/password.routes'));
        app.use('/api/users', require('./api/routes/users.routes'));
        app.use('/api/verification', require('./api/routes/verification.routes'));
        
        app.use((req, res) => {
            res.sendFile(path.join(__dirname, 'www', 'index.html'));
        });
        
        app.listen(PORT, () => { console.log(`Listening for requests on port ${PORT}...`); });
    })
    .catch(() => {
        console.log('Failed to connect to MongoDB');
        process.exit(1);
    });
