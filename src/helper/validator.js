class validator {
  static validateTaskInfo(taskInfo, taskData) {
    console.log('ID :', taskInfo.hasOwnProperty('id'));
    console.log('TITLE :', taskInfo.hasOwnProperty('title'));
    console.log('VALID TITLE :', this.validTitle(taskInfo));
    console.log('DESC :', taskInfo.hasOwnProperty('description'));
    console.log('VALID DESC :', this.validDesc(taskInfo));
    console.log('STATUS :', this.validStatus(taskInfo));
    console.log('UNIQUE ID :', this.uniqueTaskId(taskInfo, taskData));
    
    
    if (taskInfo.hasOwnProperty('id') && 
        taskInfo.hasOwnProperty('title') &&
        taskInfo.hasOwnProperty('description') &&
        taskInfo.hasOwnProperty('completed') &&
        this.validTitle(taskInfo) &&
        this.validDesc(taskInfo) &&
        this.validStatus(taskInfo) 
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
        "message": "Task Title should be mentioned..:("
      }
    }
    
    if (!this.validDesc(taskInfo)) {
      return {
        "status": false,
        "message": "Task description should be mentioned..:("
      }
    }
    
    if (!this.validStatus(taskInfo)) {
      return {
        "status": false,
        "message": "Task completion status should be of Boolean Type..:("
      }
    }
  }

  static uniqueTaskId(taskInfo, taskData) {
    let taskId = taskData.some(task => task.id === taskInfo.id)
    if (taskId) return false;
    return true;
  }

  static validStatus(taskInfo) {
    if (typeof taskInfo.completed === 'boolean') return true;
    return false;
  }

  static validTitle(taskInfo) {
    if (!taskInfo.title) return false;
    return true;
  }

  static validDesc(taskInfo) {
    if (!taskInfo.description) return false;
    return true;
  }
}

module.exports = validator;