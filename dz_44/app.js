const dotenv = require('dotenv');

dotenv.config();

const express = require('express');
const fileuploader = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path');
const scheduleCronJobs = require('./cron');

const config = require('./config');

_connectDB();

const mainRouter = require('./routers/main.router');

const app = express();

app.use(fileuploader());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(process.cwd(), 'static')));

app.use('/', mainRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({
            customCode: err.customCode || 0,
            message: err.message || ''
        });
});

app.listen(config.PORT, () => {
    console.log(`App listen ${config.PORT}`);
    scheduleCronJobs();
});

function _connectDB() {
    mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

    const { connection } = mongoose;

    connection.on('error', err => {
        console.log(err);
    });
}
