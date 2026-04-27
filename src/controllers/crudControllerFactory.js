const { ValidationError, ForeignKeyConstraintError } = require('sequelize');

const buildCrudController = (Model, options = {}) => {
  const { include = [] } = options;

  return {
    async getAll(req, res, next) {
      try {
        const records = await Model.findAll({ include });
        return res.status(200).json(records);
      } catch (error) {
        return next(error);
      }
    },

    async getById(req, res, next) {
      try {
        const record = await Model.findByPk(req.params.id, { include });
        if (!record) {
          return res.status(404).json({ error: `${Model.name} not found` });
        }
        return res.status(200).json(record);
      } catch (error) {
        return next(error);
      }
    },

    async create(req, res, next) {
      try {
        const record = await Model.create(req.body);
        return res.status(201).json(record);
      } catch (error) {
        if (error instanceof ValidationError || error instanceof ForeignKeyConstraintError) {
          return res.status(400).json({ error: error.message });
        }
        return next(error);
      }
    },

    async update(req, res, next) {
      try {
        const record = await Model.findByPk(req.params.id);
        if (!record) {
          return res.status(404).json({ error: `${Model.name} not found` });
        }

        await record.update(req.body);
        return res.status(200).json(record);
      } catch (error) {
        if (error instanceof ValidationError || error instanceof ForeignKeyConstraintError) {
          return res.status(400).json({ error: error.message });
        }
        return next(error);
      }
    },

    async remove(req, res, next) {
      try {
        const record = await Model.findByPk(req.params.id);
        if (!record) {
          return res.status(404).json({ error: `${Model.name} not found` });
        }

        await record.destroy();
        return res.status(204).send();
      } catch (error) {
        return next(error);
      }
    },
  };
};

module.exports = buildCrudController;
