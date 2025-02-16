const mongoose = require('mongoose')

const EmployeeSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    name: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true 
    },
    photo: { 
        type: String, 
        required: false
    },
}, { timestamps: true })

module.exports = mongoose.model('Employee', EmployeeSchema)
