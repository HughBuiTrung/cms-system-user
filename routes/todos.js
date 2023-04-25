const router = require('express').Router();

// model
const Todo = require('../models/Todo');

/*
GET LIST: /api/todo
GET ITEM: /api/todo/:id
POST (CREATE TODO): /api/todo
PUT (update todo): /api/todo/:id
*/

router.get('/', async (req, res) => {
  console.log('GET LIST', req.query);
  
  const todos = await Todo.find();

  res.status(200).json(todos);
})


module.exports = router;

