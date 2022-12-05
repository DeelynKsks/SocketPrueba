const { login } = require('../controllers/auth.controllers');

const router = require('express').Router();

router.post('/login', login )

module.exports = router;