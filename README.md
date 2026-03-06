# K6 Performance Testing Project
Version 1: Readability & Explanation
2. Cloud Run (Grafana Visualization)
To stream results to your :

Step A: Login (First time only)

Step B: Execute with Cloud Output

📊 Thresholds & Goals
We aim for the following Service Level Objectives (SLOs):

Success Rate: > 99% of requests must pass (http_req_failed < 0.01).

Latency: 95% of requests must complete under 500ms (p(95) < 500).

🧪 Best Practices
Always include sleep(): Avoid hitting public APIs too fast to prevent IP blocking (403 Forbidden).

Use Stages: Ramp up Virtual Users (VUs) gradually to see where the server starts to struggle.

Check the Dashboard: Look for the "Analysis" tab in Grafana to find performance bottlenecks.