const express = require("express")
const {addTodo, getTodo, getTodoById, updateTodo, deleteTodo} = require("../controllers/todo.controller")

const router = express.Router()

router.route("/addTodo").post(addTodo)
router.route("/getTodo").get(getTodo)
router.route("/getoneTodo/:id").get(getTodoById)
router.route("/updateTodo/:id").put(updateTodo)
router.route("/deleteTodo/:id").delete(deleteTodo)

module.exports = router