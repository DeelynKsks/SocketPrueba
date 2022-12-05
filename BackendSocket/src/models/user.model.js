const { model, Schema } = require("mongoose")

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, {
    versionKey: false,
    timestamps: true
})

module.exports = model("Users", UserSchema)