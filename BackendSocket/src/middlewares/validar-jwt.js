
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const validarJWT = async (req, res, next) => {
    
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            msg: 'Error de autenticación - No hay token en la petición'
        })
    };


    try {
        const { uid } = await jwt.verify(token, process.env.SECRET)

        const usuario = await User.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                error: 'No existe el usuario en la base de datos'
            });
        }

        if (!usuario.isActive) {
            return res.status(401).json({
                msg: 'El usuario no está activo'
            });
        }

        req.user = usuario;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Error de autenticación - Token no válido'
        })
    }
}

module.exports = validarJWT