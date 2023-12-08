const express = require("express");
const router = express.Router();
const db = require("../sequelize/models");
const path = require("path");
const { STATUS_ACTIVE } = require("../constants");
const { log } = require("console");

router.post("/add", async (req, res) => {
  const task = await db.task.create({
    task_name: req.body.task,
    user_id: req.query.id,
    description: req.body.task_description,
    priority : req.body.priority,
    due_date : req.body.due_date
  });

  if (task) res.redirect(`/user/dashboard?id=${req.query.id}&msg=1`);
  else res.status(500).render("dashboard");
});

router.post("/update/status", async (req, res) => {
  const {user_id, id } = req.query;
  console.log(req.body.status);
  const task = await db.task.update({
    status: req.body.status
  }, { where : {user_id, id}});

  if (task) res.json(task);
  else res.errored('Error updating status');
});

router.post("/delete", async (req, res) => {
  const token = await db.token.findOne({where : {user_id : req.query.user_id, status : STATUS_ACTIVE}})
  if(token) {
        await db.task.destroy({where : {id : req.query.id, user_id : req.query.user_id}});
        const tasks = await db.task.findAll({where : {user_id : req.query.user_id}})
        const user = await db.user.findOne({ where : { id : req.query.user_id}});
        res.redirect(`/user/dashboard?id=${req.query.user_id}&msg=2`);
  } else res.redirect('/user/login');
});

router.get("/edit", async (req, res) => {
  const task = await db.task.findOne({where : {user_id : req.query.user_id, id: req.query.id}});
  if(task) {
        res.redirect(`/user/dashboard?id=${req.query.user_id}&task_id=${task.id}`);
  } else res.redirect('/user/login');
});


router.post("/update", async (req, res) => {
  const task = await db.task.update({
    task_name: req.body.task,
    description: req.body.task_description,
    priority : req.body.priority,
    due_date : req.body.due_date
  }, { where : { id: req.query.id }});

  console.log(task);
  if(task) {
        res.redirect(`/user/dashboard?id=${req.query.user_id}&msg=3`);
  } else res.redirect('/user/login');
});

router.get("/get/:id", async (req, res) => {
  const task = await db.task.findOne({where : {id: req.params.id}});
  if(task) {
      const user = await db.user.findOne({ where : { id : req.query.user_id}});
      res.render('user/task-detail', {user, task});
  } else res.redirect('/user/login');
});

module.exports = router;
