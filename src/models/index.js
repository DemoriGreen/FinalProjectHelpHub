const sequelize = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const Ticket = require('./Ticket');

User.hasMany(Project, { foreignKey: 'ownerId', as: 'ownedProjects', onDelete: 'CASCADE' });
Project.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });

Project.hasMany(Ticket, { foreignKey: 'projectId', as: 'tickets', onDelete: 'CASCADE' });
Ticket.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

User.hasMany(Ticket, { foreignKey: 'assigneeId', as: 'assignedTickets' });
Ticket.belongsTo(User, { foreignKey: 'assigneeId', as: 'assignee' });

module.exports = {
  sequelize,
  User,
  Project,
  Ticket,
};
