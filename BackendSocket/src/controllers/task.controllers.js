const { validationResult } = require('express-validator');
const Tasks = require('../models/task.model');
const ctrlTask = {};



ctrlTask.createTask = async (req, res) => {

    const identificador = req.user._id

    const { titulo, descripcion } = req.body;

    const task = new Tasks({
        titulo,
        descripcion,
        userId: identificador
    });

    try {
        const newTask = await task.save();

        return res.json({
            msg: 'Tarea creada correctamente',
            newTask
        })
    } catch (error) {
        return res.status(500).json({
            msg:'Error al crear la tarea'
        })
    }
}

ctrlTask.getTask = async (req, res) => {
    const tasks = await Tasks.find({ userId: req.user._id, isActive:true })
    .populate('userId', ['username','email'])

    return res.json(tasks);
}

ctrlTask.updateTask = async (req, res) => {
    const taskId = req.params.id

    const { titulo, descripcion, isActive, isDone } = req.body

    const taskFound = {_id: taskId, userId: req.user._id}
    const data = { titulo, descripcion, isActive, isDone }

    try {
        const dataUpdate = await Tasks.findOneAndUpdate(taskFound, data)

        if(!dataUpdate){
            return res.status(400).json({
                msg: "Ocurrió un error al actualizar la tarea, intente de nuevo"
            })
        }

        return res.json({
            msg: "La tarea se actualizó correctamente"
        })
    } catch (error) {
        return res.status(400).json({
            msg: "Fallo al actualizar la tarea",
            error
        })
    }
}

ctrlTask.deleteTask = async (req, res) => {
    const taskId = req.params.id
    const idTarget = {_id: taskId, userId: req.user._id}
    const erase = { isActive: false }
    console.log(taskId)
    try {

        const softDelete = await Tasks.findOneAndUpdate(idTarget, erase)

        if(!softDelete){
            res.status(400).json({
                msg:"Ocurrió un error al eliminar la tarea, intente de nuevo"
            })
        }
        return res.json({
            msg: "La tarea se ha eliminado correctamente"
        })
    } catch (error) {
        
    }
}

module.exports = ctrlTask;