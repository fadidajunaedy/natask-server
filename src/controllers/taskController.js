const taskService = require("../services/taskService.js")

const create = async (req, res, next) => {
    try {
        const request = req.body
        const result = await taskService.create(request)
        res.status(200).json({
            success: true,
            message: "Create Task Success",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const update = async (req, res, next) => {
    try {
        const _id = req.params._id
        const request = req.body
        await taskService.update(_id, request)
        res.status(200).json({
            success: true,
            message: "Update Task Success"
        })
    } catch (e) {
        next(e)
    }
}

const getAll = async (req, res, next) => {
    try {
        const user = req.user
        const result = await taskService.getAll(user)
        res.status(200).json({
            success: true,
            message: "Get All Task Success",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    try {
        const _id = req.params._id
        const result = await taskService.get(_id)
        res.status(200).json({
            success: true,
            message: "Get Task Success",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        const _id = req.params._id
        await taskService.remove(_id)
        res.status(200).json({
            success: true,
            message: "Delete Task Success"
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    create,
    update,
    getAll,
    get,
    remove
}