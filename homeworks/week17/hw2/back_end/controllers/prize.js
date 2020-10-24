/* eslint-disable no-plusplus, no-use-before-define, no-shadow, function-paren-newline,
comma-dangle, prefer-destructuring, no-alert, no-continue, no-path-concat,
prefer-template, arrow-parens, arrow-body-style, consistent-return, no-restricted-syntax */

const { Op } = require('sequelize');
const db = require('../models');

const Prize = db.Prize;

const prizeController = {
  getPrize: (req, res) => {
    /*
    撈出所有獎項並按照機率由小到大排序，推進 weightArr 陣列
    計算出所有機率的總和之後，用 random 從 0 ~ 總和 之間取一個數
    如果這個隨機數 random 大於最高機率獎項的機率，就讓隨機數等於最高機率的值
    最後在去資料庫撈取機率大於 random 的獎品
    */
    Prize.findAll({
      where: {
        is_deleted: null
      },
      order: [['probability']]
    }).then(prizes => {
      const weightArr = [];
      for (const prize of prizes) {
        weightArr.push(prize.probability);
      }
      const weightSum = weightArr.reduce((prev, curr) => prev + curr);
      let random = Math.random() * weightSum;
      if (random > weightArr[weightArr.length - 1]) {
        random = weightArr[weightArr.length - 1];
      }
      Prize.findOne({
        where: {
          probability: {
            [Op.gte]: random
          },
          is_deleted: null
        },
        order: [['probability']]
      }).then(prize => {
        const result = {
          name: prize.name,
          description: prize.description,
          imageURL: prize.imageURL
        };
        return res.status(200).json(result);
      }).catch(err => console.log(err));
    });
  },
  index: (req, res) => {
    if (!req.session.username) {
      res.redirect('/');
    }
    Prize.findAll({
      where: {
        is_deleted: null
      }
    }).then(prizes => {
      res.render('backstage', {
        prizes
      });
    });
  },
  add: (req, res) => {
    if (!req.session.username) {
      res.redirect('/');
    }
    res.render('add_prize');
  },
  handleAdd: (req, res, next) => {
    if (!req.session.username) {
      res.redirect('/');
    }
    const {
      name,
      description,
      imageURL,
      probability
    } = req.body;

    if (!name || !probability) {
      req.flash('errorMessage', '輸入資料不完整！');
      return next();
    }

    Prize.create({
      name,
      description,
      imageURL,
      probability
    }).then(() => {
      res.redirect('/backstage');
    });
  },
  update: (req, res) => {
    if (!req.session.username) {
      res.redirect('/');
    }
    const id = req.params.id;

    Prize.findOne({
      where: {
        id
      }
    }).then(prize => {
      res.render('update_prize', {
        prize
      });
    });
  },
  handleUpdate: (req, res, next) => {
    if (!req.session.username) {
      res.redirect('/');
    }
    const id = req.params.id;
    const {
      name,
      description,
      imageURL,
      probability
    } = req.body;

    if (!name || !probability) {
      req.flash('errorMessage', '輸入資料不完整！');
      return next();
    }

    Prize.findOne({
      where: {
        id
      }
    }).then(prize => {
      return prize.update({
        name,
        description,
        imageURL,
        probability
      });
    }).then(() => {
      res.redirect('/backstage');
    }).catch(() => {
      res.redirect('/backstage');
    });
  },
  handleDelete: (req, res) => {
    if (!req.session.username) {
      res.redirect('/');
    }
    const id = req.params.id;

    Prize.findOne({
      where: {
        id
      }
    }).then(prize => {
      return prize.update({
        is_deleted: 1
      });
    }).then(() => {
      res.redirect('/backstage');
    }).catch(() => {
      res.redirect('/backstage');
    });
  }
};

module.exports = prizeController;
