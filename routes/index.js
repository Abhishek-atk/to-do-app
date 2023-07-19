const { response } = require('express');
var express = require('express');
var router = express.Router();
const config = require("../config/taskConfig");
const { $where } = require('../db/schema');


/* =====Routes===== */


/* ===== Home page ===== */
router.get("/", async (req, res) => {
  await config.getAllTask().then((response) => {
    res.render('index', { response })
  }).catch((err) => {
    res.status(500).json(err)
  })
})

/* ===== Createing new task API ===== */
router.post("/create-new-task", async (req, res) => {
  await config.createNewTask(req.body).then((response) => {
    res.redirect("/")
  }).catch((err) => {
    console.log(err);
    res.status(500).json(err)
  })
})

/* ===== Get all task from Database ===== */
router.get("/get-all-task", async (req, res) => {
  await config.getAllTask().then((response) => {
    res.status(201).json(response)
  }).catch((err) => {
    res.status(500).json(err)
  })
})

/* ===== Delete task ===== */
router.get('/delete-task/:id', (req, res) => {
    const id = req.params.id
    config.deleteTask(id).then((response) => {
      res.redirect('/')
    }).catch((err) => {
      res.status(500).json(err)
    })
})

/* ===== Task status check API===== */
router.get('/complete-task/:id', (req, res) => {
  const id = req.params.id
  config.completeTask(id).then((response) => {
    res.redirect('/')
  }).catch((err) => {
    res.json(err)
  })
})

module.exports = router;
