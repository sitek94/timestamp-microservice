import request from 'supertest';
import app from './app';

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/');

    expect(res.status).toBe(200);
  });
});

describe('GET /api/timestamp (an empty date parameter)', () => {
  it('returns the current time in a JSON object with a unix key', async () => {
    const res = await request(app).get('/api/timestamp');

    const unixDifference = res.body.unix - new Date().getTime();

    expect(unixDifference).toBeLessThan(10);
  });

  it('returns the current time in a JSON object with a utc key', async () => {
    const res = await request(app).get('/api/timestamp');

    expect(res.body.utc).toEqual(new Date().toUTCString());
  });
});

describe('GET /api/timestamp/invalid-date (invalid date parameter)', () => {
  it('handles invalid dates', async () => {
    const res = await request(app).get('/api/timestamp/invalid-date');

    expect(res.body.error).toMatch(/invalid date/i);
  });
});

describe('GET /api/timestamp/:date_string (valid date)', () => {
  it('handles dates that can be successfully parsed by new Date(date_string)', async () => {
    const res = await request(app).get('/api/timestamp/05 October 2011');

    // This is to ensure that the tests run correctly when running them
    // locally in different timezones.
    const date = new Date('05 October 2011');
    const unix = date.getTime();
    const utc = date.toUTCString();

    expect(res.body.unix).toBe(unix);
    expect(res.body.utc).toBe(utc);
  });

  it('handles timestamp format', async () => {
    const res = await request(app).get('/api/timestamp/1451001600000');

    expect(res.body.unix).toBe(1451001600000);
    expect(res.body.utc).toBe('Fri, 25 Dec 2015 00:00:00 GMT');
  });
});

describe(`GET /ned-stark-in-2nd-season (doesn't exist)`, () => {
  it('should return 404', async () => {
    const res = await request(app).get('/ned-stark-in-2nd-season');

    expect(res.status).toBe(404);
  });
});
