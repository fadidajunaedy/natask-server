const Employee = require("../models/employeeModel.js")
const Task = require("../models/taskModel.js")
const SubTask = require("../models/subtaskModel.js")
const ResponseError = require("../error/responseError.js")

const create = async (request) => {
    const employee = await Employee.findById(request.employeeId)
    if (!employee) throw new ResponseError(404, "Employee not found")
    
    const newTask = await Task.create(request)
    return newTask
}

const update = async (_id, request) => {
    const task = await Task.findById(_id)
    if (!task) throw new ResponseError(404, "Task not found")

    await task.updateOne(request)

    return
}

const getAll = async (user) => {
    const query = user._id ? { userId: user._id } : {}

    const [employees, tasks] = await Promise.all([
        Employee.find(query).lean(),
        Task.find().lean()
    ])

    const employeeMap = new Map(
        employees.map(({ _id, name, email, photo }) => [
            _id.toString(),
            { _id, name, email, photo: `${process.env.SERVER_URL}/files/employee/photo/${photo}` }
        ])
    )
    
    return tasks
    .filter(task => employeeMap.has(task.employeeId.toString()))
    .map(({ employeeId, ...taskWithoutEmployeeId }) => ({
        ...taskWithoutEmployeeId,
        employee: employeeMap.get(employeeId.toString())
    }))
}

const get = async (_id) => {
    const task = await Task.findById(_id).lean()
    if (!task) throw new ResponseError(404, "Task not found")

    const subTasks = await SubTask.find({ taskId: task._id }).lean() 

    const employee = await Employee.findById(task.employeeId).lean()
    if (!employee) throw new ResponseError(400, "Employee not found")

    return { 
        ...task, 
        subtasks: subTasks,
        employee: {
            _id: employee._id,
            name: employee.name,
            email: employee.email,
            photo: `${process.env.SERVER_URL}/files/employee/photo/${employee.photo}`,
        }
    }
}

const remove = async (_id) => {
    const task = await Task.findById(_id)
    if (!task) throw new ResponseError(404, "Task not found")
    
    await task.deleteOne()
    return
}

module.exports = {
    create,
    update,
    getAll,
    get,
    remove
}