const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

// routes
const todosRoutes = require('./routes/todos');

app.use(cors());
app.use(express.static('public'));

// connect to DB
mongoose
  .connect('xx', {
    useNewUrlParser: true,
  })
  .catch((error) => console.log("Connect Fail: ", error));

// get
app.use(express.json({ extend: true }))
app.get('/', (_, res) => res.send('API running...'))

// routes
app.use('/api/todo', todosRoutes);

// listen apps
const PORT = 4002;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`)
})