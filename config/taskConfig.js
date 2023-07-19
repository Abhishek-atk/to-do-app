const Tasks = require("../db/schema")

module.exports = {
    getAllTask: () => {
        return new Promise(async (resolve, reject) => {
            try {
                const allTasks = await Tasks.find()
                resolve(allTasks)
            } catch (error) {
                reject(error)
            }
        })
    },
    createNewTask: (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const task = await Tasks.create(data)
                resolve(task)
            } catch (error) {
                console.log("not id available");
                reject(error)
            }
        })
    },
    deleteTask: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const deleteTask = await Tasks.findOneAndDelete({ "_id": id })
                resolve(deleteTask)
            } catch (error) {
                reject(error)
            }
        })
    },
    completeTask: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const task = await Tasks.findOne({ "_id": id })
                const taskStatus = task.completed
                if (taskStatus) {
                    var completeTask = await Tasks.updateOne({ "_id": id }, { "completed": false })
                    resolve(completeTask)
                } else {
                    var completeTask = await Tasks.updateOne({ "_id": id }, { "completed": true })
                    resolve(completeTask)
                }
            } catch (error) {
                reject(error)
            }
        })
    }
}