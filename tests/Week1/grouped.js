import http from 'k6/http';
import { group, sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 1 }, // Warm up to 20 users
    // { duration: '1m', target: 20 },  // Stay at 20 users
    // { duration: '30s', target: 0 },  // Cool down
  ],
  thresholds: {
    'group_duration{group:::01_Home_Page}': ['p(95)<500'], // Home page must be fast
    'group_duration{group:::02_Login}': ['p(95)<1000'],    // Login can be a bit slower
    http_req_failed: ['rate<0.01'],                        // Overall error rate < 1%
  },
};

export default function () {
  // 1. Visit Home Page
  group('01_Home_Page', function () {
    const res = http.get('https://www.saucedemo.com/');
    check(res, { 'status is 200': (r) => r.status === 200 });
  });

  sleep(1); // Think time

  // 2. Simulate Login Action
  group('02_Login', function () {
    // k6 can handle POST requests with JSON payloads
    const payload = JSON.stringify({ username: 'standard_user', password: 'secret_sauce' });
    const params = { headers: { 'Content-Type': 'application/json' } };
    
    const res = http.post('https://www.saucedemo.com/', payload, params);
    check(res, { 'logged in successfully': (r) => r.status === 200 });
  });

  sleep(2);
}