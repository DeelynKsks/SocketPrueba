const { model, Schema } = require('mongoose')

const CoordsSchema = new Schema({
    Descripcion: {
        type: String
    },
    Coordenadas: {
        type: Array,
        length: 2,
        required: true
    }
})

module.exports = model("Coordinates", CoordsSchema)