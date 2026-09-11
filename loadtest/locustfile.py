"""
Light Locust smoke load for NoorLink public pages.

Usage (local):
  pip install locust
  locust -f loadtest/locustfile.py --host http://localhost:3000 --headless -u 5 -r 2 -t 30s

Usage (production — keep users low):
  locust -f loadtest/locustfile.py --host https://noorlink.co --headless -u 5 -r 1 -t 20s
"""

from locust import HttpUser, between, task


class NoorLinkVisitor(HttpUser):
    wait_time = between(0.5, 1.5)

    @task(5)
    def home(self):
        self.client.get("/", name="GET /")

    @task(4)
    def destinations(self):
        self.client.get("/destinations", name="GET /destinations")

    @task(3)
    def hajj_umrah(self):
        self.client.get("/hajj-umrah", name="GET /hajj-umrah")

    @task(2)
    def about(self):
        self.client.get("/about", name="GET /about")

    @task(2)
    def faq(self):
        self.client.get("/faq", name="GET /faq")

    @task(1)
    def partners(self):
        self.client.get("/partners", name="GET /partners")

    @task(1)
    def support(self):
        self.client.get("/support", name="GET /support")

    @task(1)
    def saudi_plan(self):
        self.client.get("/plans/saudi-arabia", name="GET /plans/saudi-arabia")
