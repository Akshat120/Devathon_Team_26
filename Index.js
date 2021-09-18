const express = require('express');
const path = require('path');
const app = express();
const router = require('./router');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static('public'));



app.use('/',router);

app.listen(3000,()=>{
    console.log('server is listening at 3000')
});