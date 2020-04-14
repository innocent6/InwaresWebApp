require('./models/db');

const express = require('express');
const path = require('path');
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bodyparser = require('body-parser');
const io = require('socket.io');


const parentController = require('./controllers/parentController');

var app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' ,handlebars: allowInsecurePrototypeAccess(Handlebars)}));
app.set('view engine', 'hbs');

app.use('/Parents', parentController)
app.listen(3001, () => {
    console.log('Express server started at port : 3000');
});
