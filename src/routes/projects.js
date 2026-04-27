const express = require('express');
const { Project, User, Ticket } = require('../models');
const buildCrudController = require('../controllers/crudControllerFactory');

const router = express.Router();
const controller = buildCrudController(Project, {
  include: [
    { model: User, as: 'owner' },
    { model: Ticket, as: 'tickets' },
  ],
});

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
