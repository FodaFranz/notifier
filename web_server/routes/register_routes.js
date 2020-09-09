const express = require('express');
const register_controller = require('./../controller/register_controller');

const router = express.Router();

router.use(express.json());

router.post('/connect/:target_id', (req, res) => {
    const target_id = req.params.target_id;
    const host_id = req.body.host_id;

    register_controller.register(host_id, target_id);

    res.send("Register ist working man");
});

router.post('/disconnect/:target_id', (req, res) => {
    const target_id = req.params.target_id;
    const host_id = req.body.host_id;

    register_controller.disconnect(host_id, target_id);
    res.send("Delet man");
});

module.exports = router;