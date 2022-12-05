const router = require('express').Router();
const { check } = require('express-validator');
const { createTask, getTask, updateTask, deleteTask } = require('../controllers/task.controllers');

const validarJWT = require("../middlewares/validar-jwt");
const validarCampos = require('../middlewares/validar.campos');

//Acá tenés que validar el token

router.post('/task', [
    validarJWT,
    check('titulo').trim()
    ],
    createTask);

router.get('/task', [validarJWT], getTask);

router.put('/task/:id', [validarJWT], updateTask);

router.delete('/task/:id', [validarJWT], deleteTask);


module.exports = router;