import http from 'k6/http';
import { sleep } from 'k6';

export const options = { 
    iterations: 10, // Run the default function for 10 times
    thresholds: {
        http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
      },
};

// The default exported function is gonna be picked up by k6 as the entry point for the test script. It will be executed repeatedly in "iterations" for the whole duration of the test.
export default function () {
    // Make a GET request to the target URL
    http.get('https://quickpizza.grafana.com');
  
    // Sleep for 1 second to simulate real-world usage
    sleep(1);
  }

