const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const path = require('path');
const router = require('./router');
const app = express();
const session = require('express-session')

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));
app.use(session({
    secret:'secret-key',
    resave:false,
    saveUninitialized:false,
    cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly:true }
}))


app.use('/',router);

module.exports = app
