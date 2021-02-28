const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

_connectDB();

const mainRouter = require('./routers/main.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));

app.use('/', mainRouter);

app.listen(5000, () => {
    console.log('App listen 5000');
});

function _connectDB() {
    mongoose.connect('mongodb://localhost/sep-2020', { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', err => {
        console.log(err);
    });
}
