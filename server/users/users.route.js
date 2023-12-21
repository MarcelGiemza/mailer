const express = require('express');
const router = express.Router();
const usersService = require('./service');

router.get('/api/users', usersService.getUsers);
router.get('/api/emails', usersService.getUserEmails);
router.post('/api/user', usersService.addUser);
router.post('/api/login/admin', usersService.adminLogin);
router.post('/api/login/user', usersService.userLogin);

module.exports = router;

