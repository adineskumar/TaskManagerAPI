class validator {
  static validateTaskInfo(taskInfo, taskData) {
    if (taskInfo.id && 
        taskInfo.title &&
        taskInfo.description &&
        taskInfo.completed &&
        taskInfo.priority && 
        this.validTitle(taskInfo) &&
        this.validDescription(taskInfo) &&
        this.validStatus(taskInfo) &&
        this.uniqueTaskId(taskInfo, taskData)
       ) {
          return {
            "status": true,
            "message": "New task have been added"
          }
       }
    if (!this.uniqueTaskId(taskInfo, taskData)) {
      return {
        "status": false,
        "message": "Task ID should be unique..:("
      }
    }

    if (!this.validTitle(taskInfo)) {
      return {
        "status": false,
        "message": "Title must be specified"
      }
    }

    if (!this.validDescription(taskInfo)) {
      return {
        "status": false,
        "message": "Description must be specified"
      }
    }

    if (!this.validStatus(taskInfo)) {
      return {
        "status": false,
        "message": "Status must be of boolean type"
      }
    }
  }

  static uniqueTaskId(taskInfo, taskData) {
    let taskId = taskData.tasks.some(task => task.id === taskInfo.id)
    if (taskId) return true;
    return false;
  }

  static validTitle(taskInfo) {
    if (taskInfo.title) return true;
    return false;
  }

  static validDescription(taskInfo) {
    if (taskInfo.description) return true;
    return false;
  }

  static validStatus(taskInfo) {
    if (typeof taskInfo.completed === 'boolean') return true;
    return false;
  }
}