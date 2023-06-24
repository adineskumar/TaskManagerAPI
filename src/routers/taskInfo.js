const express = require('express');
const taskRoutes = require('express').Router();
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
var taskData = require('../../src/db/tasks.json');


taskRoutes.use(cors());
taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

taskRoutes.get('/', (request, response) => {
  response.json(taskData.tasks);
});

module.exports = taskRoutes;