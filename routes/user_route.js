const express = require("express");
const router = express.Router();
const { STATUS_ACTIVE } = require('../constants');
var userModel = require('../controllers/user');
const db = require("../sequelize/models");
const crypto = require('crypto');

function generateUniqueToken() {
    return crypto.randomBytes(20).toString('hex');
}

router.get("/login", (req, res) => {
    res.render('user/login');
});

router.get("/register", (req, res) => {
    res.render('user/register');
});

router.get("/dashboard", async (req, res) => {
    let msg;
    if(req.query.msg == 1) msg = 'Task added successfully';
    if(req.query.msg == 2) msg = 'Task deleted successfully';
    const token = await db.token.findOne({where : {user_id : req.query.id, status : STATUS_ACTIVE}})
    if(token) {
        const tasks = await db.task.findAll({where : {user_id : req.query.id}})
        const user = await db.user.findOne({ where : { id : req.query.id}});
        const uniqueToken = generateUniqueToken();
        res.render('user/dashboard',{tasks : tasks, user : user, msg: req.query.msg});
    } else res.render('user/login');
});

router.post('/register', userModel.addUser); 

router.post('/login', userModel.getUserLogin);

router.get('/logout', userModel.userLogout);

module.exports = router;