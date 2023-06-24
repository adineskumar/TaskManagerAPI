const express = require('express');
const taskRoutes = require('express').Router();
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const taskData = require('../../src/db/tasks.json');
const validator = require('../../src/helper/validator.js')

var taskInMemory = []
taskData.tasks.forEach(task => taskInMemory.push(task));


taskRoutes.use(cors());
taskRoutes.use(bodyParser.urlencoded({ extended: false }));
taskRoutes.use(bodyParser.json());

taskRoutes.get('/', (request, response) => {
  response.status(200).json(taskInMemory);
});

taskRoutes.get('/:id', (request, response) => {
  let taskIdPassed = request.params.id;
  let fetchedTask = taskInMemory.filter(task => task.id == taskIdPassed);
  if (Array.isArray(fetchedTask) && !fetchedTask.length) {
    response.status(404).json(
      {
        "taskId": taskIdPassed,
        "message": fetchedTask,
        "error": "Task ID not found..."
      }
    );
  } else {
    response.status(200).json(fetchedTask);
  }
});


taskRoutes.post('/', (request, response) => {
  let taskInfoPassed = request.body;
  if (validator.validateTaskInfo(taskInfoPassed,taskInMemory).status) {
    // taskInfoPassed.forEach(item => taskInMemory.push(item));
    taskInMemory.push(taskInfoPassed);
    response.status(200).json({"message": "task added"});
  } else {
    response.status(400).json({"message": "Malformed task data provided. Please verify your input data..!" });
  }  
});

taskRoutes.put('/:id', (request, response) => {
  let taskInfoPassed = request.body;
  let taskIdToUpdate = request.params.id;
  if (validator.validateTaskInfo(taskInfoPassed,taskInMemory).status) {
    taskInMemory[taskInMemory.findIndex(task => task.id == taskIdToUpdate)] = taskInfoPassed;
    response.status(200).json({ "message": "task updated" });
  } else {
    response.status(400).json({ "message": "Malformed task data provided. Please verify your input data..!" });
  }
});

taskRoutes.delete('/:id', (request, response) => {
  let taskIdToUpdate = request.params.id;
  taskInMemory = taskInMemory.filter(task => task.id != taskIdToUpdate);
  response.status(200).json({ "message": "task deleted" });
});

module.exports = taskRoutes;