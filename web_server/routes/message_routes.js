const express = require('express');

const router = express.Router();
router.use(express.json());

router.get('/send', (req, res) => {
    console.log("Send the message to my target pls");
});

module.exports = router;