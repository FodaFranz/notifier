const express = require('express');
const register_controller = require('./../controller/register_controller');

const router = express.Router();

router.use(express.json());

router.post('/connect/:target_id', (req, res) => {
    const target_id = req.params.target_id;
    const host_id = req.body.host_id;

    register_controller.register(target_id, host_id);

    res.send("Register ist working man");
});

router.post('/disconnect', (req, res) => {
    res.send("Disconnected my man");
});

module.exports = router;