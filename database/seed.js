require('dotenv').config();
const { sequelize, User, Project, Ticket } = require('../src/models');

async function seed() {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate([
      { name: 'Ava Johnson', email: 'ava.johnson@example.com' },
      { name: 'Noah Martinez', email: 'noah.martinez@example.com' },
      { name: 'Mia Kim', email: 'mia.kim@example.com' },
    ]);

    const projects = await Project.bulkCreate([
      { title: 'Community Help Portal', status: 'in_progress', ownerId: users[0].id },
      { title: 'Volunteer Coordination API', status: 'planned', ownerId: users[1].id },
      { title: 'Donor Reporting Service', status: 'completed', ownerId: users[2].id },
    ]);

    await Ticket.bulkCreate([
      {
        summary: 'Create initial endpoint list for project resources',
        priority: 'high',
        projectId: projects[0].id,
        assigneeId: users[1].id,
      },
      {
        summary: 'Add validation rules for volunteer signup payloads',
        priority: 'medium',
        projectId: projects[1].id,
        assigneeId: users[2].id,
      },
      {
        summary: 'Generate weekly export for donor impact metrics',
        priority: 'low',
        projectId: projects[2].id,
        assigneeId: users[0].id,
      },
    ]);

    console.log('Database seeded with sample data.');
    process.exit(0);
  } catch (error) {
    console.error('Database seed failed:', error.message);
    process.exit(1);
  }
}

seed();
