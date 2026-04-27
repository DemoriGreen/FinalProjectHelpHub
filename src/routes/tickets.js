onst express = require('express');
const { Ticket, User, Project } = require('../models');
const buildCrudController = require('../controllers/crudControllerFactory');

const router = express.Router();
const controller = buildCrudController(Ticket, {
  include: [
    { model: User, as: 'assignee' },
    { model: Project, as: 'project' },
  ],
});

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
