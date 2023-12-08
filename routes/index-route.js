const express = require("express");
const db = require("../sequelize/models");
const { STATUS_ACTIVE, STATUS_INACTIVE } = require('../constants');
const router = express.Router();

router.get("/", async (req, res) => {
    res.render('index');
});

router.get("/about", async (req, res) => {
    res.render('about');
});

module.exports = router;


