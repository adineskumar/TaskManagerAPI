const express = require('express');
const taskRoutes = require('express').Router();
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const taskData = require('../../src/db/tasks.json');


taskRoutes.use(cors());
taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

taskRoutes.get('/', (request, response) => {
  response.status(200).json(taskData.tasks);
});

taskRoutes.get('/:id', (request, response) => {
  let taskIdPassed = request.params.id;
  let allTasks = taskData.tasks;
  let fetchedTask = allTasks.filter(task => task.id == taskIdPassed);
  if (Array.isArray(fetchedTask) && !fetchedTask.length) {
    response.status(200).json(
      { 
        "taskId": taskIdPassed,
        "message": fetchedTask,
        "error": "Task ID not found...:("
      }
    );
  } else {
      response.status(200).json(fetchedTask);
  }
});


module.exports = taskRoutes;