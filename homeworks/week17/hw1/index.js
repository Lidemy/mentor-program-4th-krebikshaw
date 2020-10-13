/* eslint-disable no-plusplus, no-use-before-define, no-shadow, function-paren-newline,
comma-dangle, prefer-destructuring, no-alert, no-continue, no-path-concat,
prefer-template */

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

const app = express();
const port = 3001;

const userController = require('./controllers/user');
const postController = require('./controllers/post');

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

app.get('/', postController.index);

function redirectBack(req, res) {
  res.redirect('back');
}

app.get('/add', postController.add);
app.post('/add', postController.handleAdd);
app.get('/post/:id', postController.post);
app.get('/login', userController.login);
app.post('/login', userController.handleLogin, redirectBack);
app.get('/logout', userController.handleLogout);
app.get('/update/:id', postController.update);
app.post('/update/:id', postController.handleUpdate, redirectBack);
app.get('/delete/:id', postController.handleDelete);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
