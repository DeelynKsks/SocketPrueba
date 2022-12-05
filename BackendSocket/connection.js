const mongoose = require("mongoose")

const conexion = async() => {
    try {
        mongoose.connect(process.env.DATABASE)
        console.log("Conectado a la base de datos")
    } catch (error) {
        console.log(error, "Salió mal")
    }
}


module.exports = conexion