const Todo = require('../../models/todo')

module.exports = {
    create,
    indexComplete,
    indexNotComplete,
    show,
    update,
    destory,
    allTodos,
    oneTodo
}

// allTodos, oneTodo
function oneTodo (req, res) {
    res.json(res.locals.data.todo)
}

function allTodos (req, res) {
    res.json(res.locals.data.todos)
}


// Create todos
async function create(req, res, next){
    try{
        const todo = await Todo.create(req.body)
        console.log(todo)
        res.locals.data.todo = todo
        next()
    } catch(err){
        res.status(400).json({message: err.message})
    }
}

// Read todos
async function indexComplete(req, res, next){
    try{
        const todos = await Todo.find({completed: true})
        res.locals.data.todos = todos
        next()
    } catch(err){
        res.status(400).json({message: err.message})
    }
}

async function indexNotComplete(req, res, next){
    try{
        const todos = await Todo.find({completed: false})
        res.locals.data.todos = todos
        next()
    } catch(err){
        res.status(400).json({message: err.message})
    }
}

async function show(req, res, next){
    try{
        const todo = await Todo.findById(req.params.id)
        res.locals.data.todo = todo
        next()
    } catch(err){
        res.status(400).json({message: err.message})
    }
}

// Update todos
async function update(req, res, next){
    try{
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.locals.data.todos = todo
        next()
    } catch(err){
        res.status(400).json({message: err.message})
    }
}

// Delete todos
async function destory(req, res, next){
    try{
        const todo = await Todo.findByIdAndDelete(req.params.id)
        res.locals.data.todos = todo
        next()
    } catch(err){
        res.status(400).json({message: err.message})
    }
}