const User = require("../models/user.model");

const bcrypt = require ("bcrypt")

const ctrlUser = {};

ctrlUser.postUser = async (req, res) => {
    const { username, password: passwordRecibida, email } = req.body

    const newPassword = bcrypt.hashSync(passwordRecibida, 10);

    const newUser = new User({
        username,
        password: newPassword,
        email
    })

    const user = await newUser.save()

    return res.json({
        msg: "El usuario se creó correctamente",
        user
    })
}

ctrlUser.getUser = async (req, res) => {

    const foundUser = await User.find({isActive: true});

    return res.json(foundUser)
}

ctrlUser.updateUser = async (req, res) => {
    
    const userId = req.params.id
    console.log(userId)

    const { username, email, isActive } = req.body
    
    const data = { username, email, isActive }
    console.log(data)
    
    try {
        const dataUpdate = await User.findByIdAndUpdate(userId, data);

        if(!dataUpdate){
            return res.status(400).json({
                msg: "Ocurrió un error al actualizar el usuario"
            })
        }

        return res.json({
            msg: 'Usuario actualizado correctamente',
        })

    }catch (error) {
        return res.status(400).json({
            msg: "No se pudo actualizar el usuario", error
        })
    }
}

ctrlUser.deleteUser = async (req, res) => {

    try {
        const userId = req.params.id
        const softDelete = {isActive: false}

        await User.findByIdAndUpdate(userId, softDelete)

        return res.json({
            msg: "El usuario se ha eliminado"
        })
    } catch (error) {
        
    }

}

module.exports = ctrlUser