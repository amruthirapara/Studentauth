const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers.js');

router.post('/register', userControllers.userRegistration);
router.post('/login', userControllers.userLogin);
router.get('/get', userControllers.userGet);
router.get('/get/:id', userControllers.userGetById);
router.patch('/update/:id', userControllers.userUpdate);
router.delete('/delete/:id', userControllers.userDelete);

module.exports = router;
