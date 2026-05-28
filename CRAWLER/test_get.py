import requests
import json

url = "http://localhost:8080/api/v1/universities"
print(f"Fetching data from {url}...")
try:
    response = requests.get(url)
    print(f"Status Code: {response.status_code}")
    if response.status_code == 200:
        data = response.json()
        print(f"Number of universities returned: {len(data)}")
        for uni in data:
            print(f"- {uni.get('code')}: {uni.get('name')} | URL: {uni.get('websiteUrl')}")
    else:
        print(f"Error Response: {response.text}")
except Exception as e:
    print(f"Exception: {e}")
