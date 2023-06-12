const express = require('express')
const router = express.Router();
const Todos = require('../model/Todo')


router.get('/', async (req,res)=> {
    // res.send("api running...")
    try {
        const todos = await Todos.find();
        res.status(200).json(todos)
    }catch(err) {
        res.status(404).json({message: err.message})
    }
})  

router.post('/', async (req,res)=> {
    const todo = new Todos({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        color: req.body.color,
        completed: req.body.completed
    })
    try {
        const latesTodo = await todo.save()
        res.status(201).json(latesTodo)
    }catch(err) {
        res.status(400).json({message: err.message})
    }
})

router.get('/:id', async (req,res)=> {
    try {
        const todo = await Todos.findById(req.params.id);
        res.status(200).json(todo)
    }catch(err) {
        res.status(404).json({message: err.message})
    }
}) 

router.delete('/:id', async (req,res)=> {
    try {
        const deleteTodo = await Todos.deleteOne({ _id: req.params.id})
        res.status(202).json(deleteTodo)
    }catch(err) {
        res.status(404).json({message: err.message})
    }
}) 

router.put('/:id', async (req,res)=> {
    try {
        const {id} = req.params
        const updatedObject = req.body
        console.log(id,updatedObject)
        const updateTodo = await Todos.findByIdAndUpdate(id,updatedObject,{new: true});
        return res.status(202).json(updateTodo)
        // return res.json(updatedObject);
    }catch(err) {
        res.status(404).json({message: err.message})
    }
}) 

module.exports = router;