import requests
import json
import sys

def upload_data():
    url = "http://localhost:8080/api/v1/admin/crawler/upload"
    try:
        with open("CRAWLER/data/universities_data.json", "r", encoding="utf-8") as f:
            data = json.load(f)
        
        response = requests.post(url, json=data)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    upload_data()
