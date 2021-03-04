const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const config = require('./config');

dotenv.config();

_connectDB();

const mainRouter = require('./routers/main.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));

app.use('/', mainRouter);

app.listen(config.PORT, () => {
    console.log(`App listen ${config.PORT}`);
});

function _connectDB() {
    mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', err => {
        console.log(err);
    });
}
