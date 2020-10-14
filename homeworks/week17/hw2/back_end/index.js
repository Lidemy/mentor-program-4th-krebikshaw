/* eslint-disable no-plusplus, no-use-before-define, no-shadow, function-paren-newline,
comma-dangle, prefer-destructuring, no-alert, no-continue, no-path-concat,
prefer-template */

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require('cors');

const app = express();
const port = 3001;

const userController = require('./controllers/user');
const prizeController = require('./controllers/prize');

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(flash());

app.set('trust proxy', 1);
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

app.use((req, res, next) => {
  res.locals.username = req.session.username;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
});

app.get('/', userController.index);
app.get('/getPrize', cors(), prizeController.getPrize);

function redirectBack(req, res) {
  res.redirect('back');
}

app.post('/login', userController.login, redirectBack);
app.get('/logout', userController.logout);
app.get('/backstage', prizeController.index);
app.get('/add', prizeController.add);
app.post('/add', prizeController.handleAdd, redirectBack);
app.get('/update/:id', prizeController.update);
app.post('/update/:id', prizeController.handleUpdate, redirectBack);
app.get('/delete/:id', prizeController.handleDelete);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
