const router = require('express').Router();

const {
    getUser,
    postUser,
    updateUser,
    deleteUser
} = require("../controllers/user.controllers");
const validarJWT = require('../middlewares/validar-jwt');

router.get("/user", getUser)
router.post("/user", postUser)
router.put("/user/:id", [validarJWT], updateUser)
router.delete("/user/:id", [validarJWT], deleteUser)

module.exports = router;