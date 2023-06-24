const express = require('express');
const cors = require('cors');
const fs = require('fs');
const bodyParser = require('body-parser');
const routes = require('express').Router();
const taskInfo = require('../src/routers/taskInfo.js');

const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());


routes.get('/', (request, response) => {
  response.status(200).send('Welcome to Node - Express Task Manager API')
});

routes.use('/tasks', taskInfo);

const PORT = 3000;
app.listen(PORT, (err) => {
  if (!err) {
    console.log('Server started Successfully at port : ',PORT );
  } else {
    console.log('Error while starting server..Please verify configurations.:(')
  }
});
