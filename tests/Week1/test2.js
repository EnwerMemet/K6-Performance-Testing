import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 50 },  // Ramp up: from 0 to 50 users over 30 seconds
    { duration: '1m',  target: 50 },  // Stay: stay at 50 users for 1 minute (Stay-flat)
    { duration: '30s', target: 0 },   // Ramp down: scale back to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests must be under 500ms
    http_req_failed: ['rate<0.01'],   // Error rate must be less than 1%
  },
};

export default function () {
  // We can use a dynamic URL or add tags to keep things organized
  const res = http.get('https://test.k6.io');
  
  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  // Pacing: prevents VUs from spamming requests too fast
  sleep(1);
}