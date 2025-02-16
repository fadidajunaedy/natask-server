const dashboardService = require("../services/dashboardService.js")

const get = async (req, res, next) => {
    try {
        const user = req.user
        const result = await dashboardService.get(user)
        res.status(200).json({
            success: true,
            message: "Get Data Dashboard Success",
            data: result
        })
    } catch (e) {
        next(e)
    }
}

module.exports = { get }