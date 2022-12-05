const User = require("../models/user.model");
const createJWT = require("../helpers/create-jwt");
const bcrypt = require('bcrypt');


const ctrlAuth = {};

ctrlAuth.login = async (req, res) => {

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no se encuentra en la base de datos'
            });
        }

        if (!user.isActive) {
            return res.status(401).json({
                ok: false,
                msg: "El usuario no está activo"
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(402).json({
                ok: false,
                msg: user._id
            });
        }
         
        const token = await createJWT({ uid: user._id })

        return res.json({ token });
    } catch (error) {
        return res.json({ msg: 'No se pudo iniciar sesión' });
    }
};

module.exports = ctrlAuth;