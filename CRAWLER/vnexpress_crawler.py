import requests
from bs4 import BeautifulSoup
import json
import os

# Crawler mẫu thu thập thông tin điểm chuẩn từ VnExpress
def crawl_vnexpress_universities():
    url = "https://diemthi.vnexpress.net/diem-chuan"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }
    
    print(f"Đang gửi request tới {url}...")
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Tìm danh sách các trường đại học (Ví dụ)
        # Note: HTML selector cần điều chỉnh theo đúng cấu trúc thực tế của VnExpress
        universities = []
        
        # Đây là ví dụ cấu trúc dữ liệu JSON cần lấy ra
        sample_data = {
            "code": "QSB",
            "name": "Đại học Bách Khoa - ĐHQG TP.HCM",
            "programs": [
                {
                    "name": "Khoa học máy tính",
                    "code": "7480101",
                    "admissionRequirements": [
                        {
                            "method": "THPT_EXAM",
                            "blocks": ["A00", "A01"],
                            "minScore": 27.5,
                            "year": 2024
                        }
                    ]
                }
            ]
        }
        
        universities.append(sample_data)
        
        # Lưu ra file JSON
        os.makedirs('data', exist_ok=True)
        with open('data/universities_data.json', 'w', encoding='utf-8') as f:
            json.dump(universities, f, ensure_ascii=False, indent=4)
            
        print("Đã lưu dữ liệu vào CRAWLER/data/universities_data.json")
    else:
        print(f"Lỗi khi truy cập: {response.status_code}")

if __name__ == "__main__":
    crawl_vnexpress_universities()
