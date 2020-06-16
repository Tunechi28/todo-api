const express = require('express');
const path = require('path');
const todos = require('../../Todos')
const uuid = require('uuid');

const router = express.Router();

const idFilter = req => member => member.id === parseInt(req.params.id);

//get all todos

router.get('/', (req,res) => {
    res.json(todos);
});

//get individual todos
router.get('/:id', (req,res) => {
    const found = todos.some(idFilter(req));
    if(found){
        res.json(todos.filter(idFilter(req)));
    }else{
        res.status(400).json({msg : `no todos with id of ${req.params.id}`});
    }
});

//delete  todo

router.delete('/:id', (req,res) => {
    const found = todos.some(idFilter(req));
    if(found){
        res.json({
            msg: "todo deleted",
            todos : todos.filter(todo => todo.id !== parseInt(req.params.id) )
        })
    }else{
        res.status(400).json({msg : `no todos with id of ${req.params.id}`});
    }
});

//create todo
router.post('/', (req,res) => {
    const newTodo = {
        id : uuid.v4(),
        ...req.body
        //activity : req.body.activity,
        //timeInHours: req.timeInHours
    }
    if(!newTodo.activity || !newTodo.timeInHours){
        return res.status(400).json({msg : "please insert an activity and the time in hours"});
    }
    todos.push(newTodo);
    res.json(todos);
});

//update the todo
router.put('/:id', (req,res) => {
    const found = todos.some(idFilter(req));
    if(found){
        const updTodo = req.body;
        todos.forEach(todo => {
            if(todo.id === parseInt(req.params.id)){
             todo.activity = updTodo.activity? updTodo.activity : todo.activity;
            todo.timeInHours =updTodo.timeInHours ? updTodo.timeInHours : todo.timeInHours;
           // return todo.activity, todo.timeInHours;
            }
        });
    }else{
        res.status(400).json({msg : `no todos with id of ${req.params.id}`});
    }
    res.json(todos);
});


module.exports = router;