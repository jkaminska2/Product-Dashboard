process.env.INSTANCE_ID = 'test-instance';

const request = require('supertest');
const app = require('../server');

describe('Backend endpoints', () => {
  it('should return health status with uptime and requestCount', async () => {
    const response = await request(app).get('/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: 'ok',
        uptime: expect.any(Number),
        requestCount: expect.any(Number),
      })
    );
    expect(response.body.uptime).toBeGreaterThanOrEqual(0);
    expect(response.body.requestCount).toBeGreaterThanOrEqual(1);
  });

  it('should return stats with instanceId, uptime, requestCount and serverTime', async () => {
    const response = await request(app).get('/stats');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        totalItems: expect.any(Number),
        instanceId: 'test-instance',
        uptime: expect.any(Number),
        requestCount: expect.any(Number),
        serverTime: expect.any(String),
      })
    );
    expect(response.body.totalItems).toBe(0);
    expect(new Date(response.body.serverTime).toString()).not.toBe('Invalid Date');
  });
});
