/* eslint-disable no-plusplus, no-use-before-define, no-shadow, function-paren-newline,
comma-dangle, prefer-destructuring, no-alert, no-continue, arrow-parens, arrow-body-style,
consistent-return */

const db = require('../models');

const Post = db.Post;
const User = db.User;
const Category = db.Category;

const postController = {
  add: (req, res) => {
    Category.findAll().then(categorys => {
      res.render('add_post', {
        categorys
      });
    });
  },
  index: (req, res) => {
    Post.findAll({
      where: {
        is_deleted: null
      },
      order: [
        ['id', 'DESC']
      ],
      include: User
    }).then(posts => {
      res.render('index', {
        posts,
      });
    });
  },
  post: (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id,
        is_deleted: null
      },
      include: User
    }).then(posts => {
      res.render('post', {
        posts,
        req
      });
    });
  },
  update: (req, res) => {
    const { userId } = req.session;
    if (!userId) {
      res.redirect('/');
    }
    Post.findOne({
      where: {
        id: req.params.id
      },
      include: Category
    }).then(posts => {
      Category.findAll().then(categorys => {
        res.render('update_post', {
          posts,
          categorys,
          req
        });
      });
    });
  },
  handleAdd: (req, res) => {
    const { userId } = req.session;
    const { title, content, category } = req.body;
    if (!userId) {
      return res.redirect('/');
    }

    if (!title || !content || !category) {
      return res.render('/add');
    }

    Post.create({
      title,
      content,
      CategoryId: category,
      UserId: userId
    }).then(() => {
      res.redirect('/');
    });
  },
  handleUpdate: (req, res) => {
    const { title, category, content } = req.body;

    Post.findOne({
      where: {
        id: req.params.id,
        UserId: req.session.userId
      }
    }).then(posts => {
      return posts.update({
        title,
        content,
        CategoryId: category
      });
    }).then(() => {
      res.redirect('/');
    }).catch(() => {
      res.redirect('/');
    });
  },
  handleDelete: (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
      return res.redirect('/');
    }

    Post.findOne({
      where: {
        id: req.params.id,
        UserId: userId
      }
    }).then(posts => {
      return posts.update({
        is_deleted: 1
      });
    }).then(() => {
      res.redirect('/');
    }).catch(() => {
      res.redirect('/');
    });
  }
};

module.exports = postController;
