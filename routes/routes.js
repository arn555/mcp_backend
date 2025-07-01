const express = require('express');
const router = express.Router();
const { handleResumeQuestion } = require('../controller/controller');
const { sendEmail } = require('../controller/emailController');

router.get('/question', handleResumeQuestion);
router.post('/send-email', sendEmail); 

module.exports = router;
