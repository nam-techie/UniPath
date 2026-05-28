import requests
from bs4 import BeautifulSoup
import pandas as pd
import json
import os
import io
import sys

# Đảm bảo console Windows có thể in tiếng Việt
sys.stdout.reconfigure(encoding='utf-8')


def clean_program_name(name):
    # Remove junk strings from Tuyensinh247 table
    if isinstance(name, str):
        if "Tra cứu tại:" in name:
            return None
        return name.strip()
    return None

def extract_university_data(uni_name, uni_url, uni_code=None):
    headers = {'User-Agent': 'Mozilla/5.0'}
    print(f"Đang cào dữ liệu: {uni_name} ({uni_url})")
    
    try:
        r = requests.get(uni_url, headers=headers, timeout=10)
        soup = BeautifulSoup(r.text, 'html.parser')
        
        # Try finding the table
        try:
            tables = pd.read_html(io.StringIO(r.text))
            if not tables:
                return None
            df = tables[0]
        except ValueError:
            return None
            
        programs = []
        for index, row in df.iterrows():
            prog_name = row.get('Tên ngành')
            blocks = row.get('Tổ hợp môn')
            score = row.get('Điểm chuẩn')
            
            prog_name = clean_program_name(prog_name)
            if not prog_name:
                continue
                
            # Parse blocks like "A00; A01; D07"
            parsed_blocks = []
            if isinstance(blocks, str):
                parsed_blocks = [b.strip() for b in blocks.split(';') if b.strip()]
                
            # Parse score
            try:
                min_score = float(str(score).replace(',', '.'))
            except ValueError:
                min_score = 0.0
                
            program = {
                "name": prog_name,
                "admissionRequirements": [
                    {
                        "method": "THPT_EXAM",
                        "blocks": parsed_blocks,
                        "minScore": min_score,
                        "year": 2025 # Current latest benchmark year
                    }
                ]
            }
            programs.append(program)
            
        return {
            "name": uni_name,
            "code": uni_code or "UNKNOWN",
            "websiteUrl": uni_url,
            "programs": programs
        }
        
    except Exception as e:
        print(f"Lỗi khi xử lý {uni_name}: {e}")
        return None

def crawl_main():
    main_url = "https://diemthi.tuyensinh247.com/diem-chuan.html"
    headers = {'User-Agent': 'Mozilla/5.0'}
    
    print("Truy cập trang chủ điểm chuẩn...")
    r = requests.get(main_url, headers=headers)
    soup = BeautifulSoup(r.text, 'html.parser')
    
    target_unis = []
    
    links = soup.find_all('a')
    for l in links:
        href = str(l.get('href'))
        if 'diem-chuan/' in href and '.html' in href:
            full_url = f"https://diemthi.tuyensinh247.com{href}" if href.startswith('/') else href
            name = l.text.strip()
            
            # Extract Uni Code from href if possible (e.g. dai-hoc-bach-khoa-ha-noi-BKA.html -> BKA)
            code = "UNKNOWN"
            if '-' in href:
                parts = href.replace('.html', '').split('-')
                if parts[-1].isupper():
                    code = parts[-1]
            
            # Avoid duplicates
            if not any(u['url'] == full_url for u in target_unis) and len(name) > 5:
                target_unis.append({"name": name, "url": full_url, "code": code})
        
        if len(target_unis) >= 5: # Chỉ lấy 5 trường cho MVP
            break
                
    result_data = []
    for uni in target_unis:
        data = extract_university_data(uni['name'], uni['url'], uni.get('code'))
        if data and data['programs']:
            result_data.append(data)
            
    # Lưu kết quả
    os.makedirs('data', exist_ok=True)
    with open('data/universities_data.json', 'w', encoding='utf-8') as f:
        json.dump(result_data, f, ensure_ascii=False, indent=4)
        
    print(f"\nĐã cào thành công {len(result_data)} trường đại học.")
    print("Dữ liệu được lưu tại CRAWLER/data/universities_data.json")

if __name__ == "__main__":
    crawl_main()
