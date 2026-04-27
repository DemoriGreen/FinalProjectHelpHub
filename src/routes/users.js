const express = require('express');
const { User } = require('../models');
const buildCrudController = require('../controllers/crudControllerFactory');

const router = express.Router();
const controller = buildCrudController(User);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
