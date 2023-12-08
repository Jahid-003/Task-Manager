const express = require("express");
const router = express.Router();
const { STATUS_ACTIVE } = require('../constants');
var userModel = require('../controllers/user');
const db = require("../sequelize/models");
const crypto = require('crypto');

function generateUniqueToken() {
    return crypto.randomBytes(20).toString('hex');
}

router.get("/about", async (req, res) => {
    const user = await db.user.findOne({ where : { id : req.query.id}});
    res.render('user/about', { user });
});


router.get("/login", (req, res) => {
    res.render('user/login');
});

router.get("/register", (req, res) => {
    res.render('user/register');
});

router.get("/dashboard", async (req, res) => {
    let msg;
    let task = undefined;
    if(req.query.msg == 1) msg = 'Task added successfully';
    if(req.query.msg == 2) msg = 'Task deleted successfully';
    if(req.query.task_id) {
       task = await db.task.findOne({ where: {id: req.query.task_id}});
    //    console.log(task);
    }
    const token = await db.token.findOne({where : {user_id : req.query.id, status : STATUS_ACTIVE}})
    if(token) {
        const tasks = await db.task.findAll({where : {user_id : req.query.id}})
        const user = await db.user.findOne({ where : { id : req.query.id}});
        res.render('user/dashboard',{tasks : tasks, user : user, msg: req.query.msg, task : task});
    } else res.render('user/login');
});

router.post('/register', userModel.addUser); 

router.post('/login', userModel.getUserLogin);

router.get('/logout', userModel.userLogout);

module.exports = router;