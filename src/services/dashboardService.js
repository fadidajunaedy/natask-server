const User = require("../models/userModel.js")
const Employee = require("../models/employeeModel.js")
const Task = require("../models/taskModel.js")
const SubTask = require("../models/subtaskModel.js")

const ResponseError = require("../error/responseError.js")

const get = async (user) => {
    const checkUser = await User.findById(user._id)
    if (!checkUser) throw new ResponseError(400, "User not exist")
        
    const employees = await Employee.find({ userId: user._id })
    const employeeIds = employees.map(employee => employee._id)
        
    const tasks = await Task.find({ employeeId: { $in: employeeIds } })
    const taskIds = tasks.map(task => task._id)

    const subTasks = await SubTask.find({ taskId: { $in: taskIds } })

    const activeEmployees = new Set(
        tasks
            .filter(task => new Date(task.deadlineAt) >= new Date())
            .map(task => task.employeeId.toString())
    ).size


    const completedTasks = tasks.filter(task => {
        const taskSubTasks = subTasks.filter(subTask => subTask.taskId.toString() === task._id.toString())
        return taskSubTasks.length > 0 && taskSubTasks.every(subTask => subTask.status === "done")
    }).length

    const taskCompletionPercentage = tasks.length > 0 
    ? (completedTasks / tasks.length) * 100 
    : 0
        
    const completedSubTasks = subTasks.filter(subTask => subTask.status === "done").length

    const subTaskCompletionPercentage = subTasks.length > 0 
    ? (completedSubTasks / subTasks.length) * 100 
    : 0

    return {
        total_employee: employees.length,
        total_active_employee: activeEmployees,
        total_task: tasks.length,
        completed_task: completedTasks,
        completed_task_percentage: taskCompletionPercentage,
        completed_sub_task: completedSubTasks,
        completed_sub_task_percentage: subTaskCompletionPercentage.toFixed(2),
        total_sub_task: subTasks.length
    }
}

module.exports = { get }