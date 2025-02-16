const subtaskService = require("../services/subtaskService.js")

const create = async (req, res, next) => {
    try {
        const request = req.body
        const result = await subtaskService.create(request)
        res.status(200).json({
            success: true,
            message: "Create Subtask Success",
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
        const result = await subtaskService.update(_id, request)
        res.status(200).json({
            success: true,
            message: "Update Subtask Success"
        })
    } catch (e) {
        next(e)
    }
}

const getAll = async (req, res, next) => {
    try {
        const queries = req.query
        const result = await subtaskService.getAll(queries)
        res.status(200).json({
            success: true,
            message: "Get All Subtask Success",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const get = async (req, res, next) => {
    try {
        const _id = req.params._id
        const result = await subtaskService.get(_id)
        res.status(200).json({
            success: true,
            message: "Get Subtask Success",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

const remove = async (req, res, next) => {
    try {
        const _id = req.params._id
        await subtaskService.remove(_id)
        res.status(200).json({
            success: true,
            message: "Delete Subtask Success"
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