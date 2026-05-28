import requests
import json
import os

url = "http://localhost:8080/api/v1/admin/crawler/upload"
headers = {
    "Content-Type": "application/json"
}

data_path = os.path.join(os.path.dirname(__file__), "data", "universities_data.json")

print(f"Reading data from {data_path}...")
with open(data_path, "r", encoding="utf-8") as f:
    payload = json.load(f)

print(f"Sending {len(payload)} universities to {url}...")

response = requests.post(url, json=payload, headers=headers)

print(f"Status Code: {response.status_code}")
print(f"Response: {response.text}")
