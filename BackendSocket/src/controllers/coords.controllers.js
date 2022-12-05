const Coordinates = require('../models/map.model')

const ctrlCoords = {}

ctrlCoords.postCoords = async (req, res) => {

    const { Descripcion, Coordenadas } = req.body
    
    const coords = new Coordinates({
        Descripcion,
        Coordenadas
    })

    try {
        const newCoordinates = await coords.save()

        return res.json({
            msg: "Las coordenadas se guardaron correctamente",
            newCoordinates
        })
    } catch (error) {
        return res.status(400).json({
            msg: "No se pudieron cargar las coordenadas"
        })
    }

}

ctrlCoords.getCoords = async(req, res) => {

    const lista = await Coordinates.find();

    return res.json(lista)
}

module.exports = ctrlCoords