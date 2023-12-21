const express = require('express');
const router = express.Router();
const messagesService = require('./service');

router.get('/api/messages/received', messagesService.getReceived);
router.get('/api/messages/sent', messagesService.getSent);
router.post('/api/messages/sendNew', messagesService.addMessage);
router.post('/api/messages/delete', messagesService.deleteMessage);

module.exports = router;

