import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);
let token: string;

describe('Test endpoint response', () => {
  it('should get users register/create endpoint', async () => {
    const response = await request.post('/users/register').send({
      first_name: 'first Dummy',
      last_name: 'last Dummy',
      username: 'test',
      password: 'password1424'
    });
    expect(response.status).toBe(200);
    token = response.body;
  });

  it('should get users index endpoint', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('should get users show endpoint', async () => {
    const response = await request
      .get('/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  it('should get users authencicate endpoint', async () => {
    const response = await request
      .post('/users/register')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
