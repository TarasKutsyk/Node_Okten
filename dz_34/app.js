const express = require('express');
const expressHbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'static')));
app.set('view engine', '.hbs');
app.engine('.hbs', expressHbs({
    defaultLayout: false
}));
app.set('views', path.join(__dirname, 'static'));

app.get('/', (req, res) => {
    res.redirect('/register');
});

app.get('/register', (req, res) => {
    res.render('register');
})

const userBase = path.join(__dirname, 'data', 'users.json');

app.post('/users', (req, res) => {
    const newUser = req.body;
    const users = require(userBase);

    if (users.some(item => item.mail === newUser.mail)) {
        res.render('userAlreadyExistsErr');
        return;
    }

    users.push(newUser);
    fs.writeFile(userBase, JSON.stringify(users), err => {
        if (err) console.log(err);
    })
    res.redirect('/users');
});

app.get('/users', (req, res) => {
    const users = require(userBase);
    res.render('users', {users});
});

app.get('/users/:email', (req, res) => {
    const users = require(userBase);
    const {email} = req.params;

    const userFound = users.find(value => value.mail === email);
    res.render('user', {user: userFound});
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const loggedUser = req.body;
    const users = require(userBase);

    if (!users.some(user => user.mail === loggedUser.mail && user.password === loggedUser.password)) {
        res.redirect('/register');
        return;
    }

    res.redirect(`/users/${loggedUser.mail}`)
});

app.listen(5000, () => {
    console.log('App listen 5000');
});
