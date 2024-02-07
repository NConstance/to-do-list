const express = require('express')

const router = express.Router()

const todoController = require( '../../controllers/api/todos')

// need two index for /api/todos and /api/todos/completed
router.get('/', todoController.indexNotComplete, todoController.allTodos) // not completed

router.get('/completed', todoController.indexComplete, todoController.allTodos) // completed

// delete /api/todos/:id
router.delete('/:id', todoController.destory, todoController.oneTodo)

//update /api/todos/:id
router.put('/:id', todoController.update, todoController.oneTodo)

//create /api/todos
router.post('/', todoController.create, todoController.oneTodo)

// show /api/todos/:id
router.get('/:id', todoController.show, todoController.oneTodo)


module.exports = router