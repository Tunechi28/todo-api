const express = require('express');
const path = require('path');


app = express();


app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use('/api/todos', require('./routes/api/todos'));

app.use(express.json());
app.use(express.urlencoded({extended : false}));
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));