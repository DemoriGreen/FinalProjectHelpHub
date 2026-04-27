process.env.NODE_ENV = 'test';
process.env.DB_PATH = 'database/test.sqlite';

const request = require('supertest');
const app = require('../src/app');
const { sequelize, User, Project, Ticket } = require('../src/models');

describe('HelpHub API MVP', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test('POST /api/users creates a user', async () => {
    const response = await request(app).post('/api/users').send({
      name: 'Test User',
      email: 'test.user@example.com',
    });

    expect(response.status).toBe(201);
    expect(response.body.email).toBe('test.user@example.com');
  });

  test('POST /api/projects creates a project', async () => {
    const owner = await User.create({ name: 'Owner User', email: 'owner@example.com' });
    const response = await request(app).post('/api/projects').send({
      title: 'Test Project',
      status: 'planned',
      ownerId: owner.id,
    });

    expect(response.status).toBe(201);
    expect(response.body.title).toBe('Test Project');
  });

  test('POST /api/tickets creates a ticket', async () => {
    const assignee = await User.create({ name: 'Assigned User', email: 'assigned@example.com' });
    const project = await Project.create({ title: 'Ticket Project', ownerId: assignee.id });

    const response = await request(app).post('/api/tickets').send({
      summary: 'Create one high-priority ticket',
      priority: 'high',
      projectId: project.id,
      assigneeId: assignee.id,
    });

    expect(response.status).toBe(201);
    expect(response.body.priority).toBe('high');
  });

  test('GET /api/users/9999 returns 404 for missing user', async () => {
    const response = await request(app).get('/api/users/9999');
    expect(response.status).toBe(404);
    expect(response.body.error).toMatch(/not found/i);
  });

  test('POST /api/projects validates required fields', async () => {
    const response = await request(app).post('/api/projects').send({ title: 'No owner yet' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });

  test('DELETE /api/tickets/:id deletes a ticket', async () => {
    const owner = await User.create({ name: 'Delete Owner', email: 'delete.owner@example.com' });
    const project = await Project.create({ title: 'Delete Project', ownerId: owner.id });
    const ticket = await Ticket.create({
      summary: 'This ticket will be deleted',
      projectId: project.id,
      assigneeId: owner.id,
    });

    const response = await request(app).delete(`/api/tickets/${ticket.id}`);
    expect(response.status).toBe(204);
  });
});
