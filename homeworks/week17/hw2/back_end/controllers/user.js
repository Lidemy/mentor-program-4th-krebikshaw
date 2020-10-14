/* eslint-disable no-plusplus, no-use-before-define, no-shadow, function-paren-newline,
comma-dangle, prefer-destructuring, no-alert, no-continue, no-path-concat,
prefer-template, arrow-parens, arrow-body-style, consistent-return */

const bcrypt = require('bcrypt');
const db = require('../models');

const User = db.User;

const userController = {
  index: (req, res) => {
    res.render('index');
  },
  login: (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
      req.flash('errorMessage', '帳號或密碼錯誤！');
      return next();
    }

    User.findOne({
      where: {
        username
      }
    }).then(user => {
      if (!user) {
        req.flash('errorMessage', '帳號或密碼錯誤！');
        return next();
      }

      bcrypt.compare(password, user.password, (err, isSuccess) => {
        if (err || !isSuccess) {
          req.flash('errorMessage', '帳號或密碼錯誤！');
          return next();
        }
        req.session.username = user.username;
        res.redirect('/backstage');
      });
    }).catch(err => {
      req.flash('errorMessage', err.toString());
      return next();
    });
  },
  logout: (req, res) => {
    req.session.username = null;
    res.redirect('/');
  }
};

module.exports = userController;
