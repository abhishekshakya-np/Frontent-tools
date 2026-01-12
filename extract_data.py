"""
Script to extract project, website, and snippet data from index.html
"""
import re
import json
from pathlib import Path
from bs4 import BeautifulSoup
import uuid
from datetime import datetime

def extract_gradient(style_attr):
    """Extract gradient from style attribute"""
    if not style_attr:
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    match = re.search(r'background:\s*(linear-gradient[^;]+)', style_attr)
    if match:
        return match.group(1)
    return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"

def extract_icon(html_content):
    """Extract icon class from HTML"""
    match = re.search(r'<i class="([^"]+)"', html_content)
    if match:
        return match.group(1)
    return "fas fa-folder"

def parse_cards(html_file, section_id):
    """Parse cards from a specific section"""
    with open(html_file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    soup = BeautifulSoup(content, 'html.parser')
    section = soup.find('section', id=section_id)
    
    if not section:
        return []
    
    cards = []
    card_divs = section.find_all('div', class_='project-card')
    
    for idx, card in enumerate(card_divs):
        try:
            # Find parent col div for category
            parent_col = card.find_parent('div', class_=re.compile('col-lg-4'))
            category = parent_col.get('data-category', '') if parent_col else ''
            
            # Extract title
            title_elem = card.find('h3', class_='project-title')
            title = title_elem.text.strip() if title_elem else ''
            
            # Extract description
            desc_elem = card.find('p', class_='project-description')
            description = desc_elem.text.strip() if desc_elem else ''
            
            # Extract URL
            link_elem = card.find('a', class_='project-external-link')
            url = link_elem.get('href', '') if link_elem else ''
            
            # Extract badge
            badge_elem = card.find('span', class_='project-badge')
            badge = badge_elem.text.strip() if badge_elem else ''
            
            # Extract thumbnail
            img_elem = card.find('img', class_='project-thumbnail')
            thumbnail = img_elem.get('src', '') if img_elem else ''
            
            # Extract gradient and icon from project-logo
            logo_elem = card.find('div', class_='project-logo')
            gradient = extract_gradient(logo_elem.get('style', '')) if logo_elem else "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            icon = extract_icon(str(logo_elem)) if logo_elem else "fas fa-folder"
            
            # Extract tags
            category_div = card.find('div', class_='project-category')
            tags = []
            if category_div:
                tag_spans = category_div.find_all('span')
                tags = [span.text.strip() for span in tag_spans if 'dot' not in span.get('class', [])]
            
            card_data = {
                "id": str(uuid.uuid4()),
                "title": title,
                "description": description,
                "category": category,
                "badge": badge,
                "url": url,
                "thumbnail": thumbnail,
                "icon": icon,
                "gradient": gradient,
                "tags": tags,
                "order": idx + 1,
                "visible": True,
                "createdAt": datetime.now().isoformat(),
                "updatedAt": ""
            }
            
            cards.append(card_data)
        except Exception as e:
            print(f"Error parsing card {idx}: {e}")
            continue
    
    return cards

def main():
    html_file = Path('index.html')
    
    if not html_file.exists():
        print("Error: index.html not found")
        return
    
    print("Extracting data from index.html...")
    
    # Extract projects
    print("Extracting projects...")
    projects = parse_cards(html_file, 'projects')
    print(f"Found {len(projects)} projects")
    
    # Extract websites
    print("Extracting websites...")
    websites = parse_cards(html_file, 'website-projects')
    print(f"Found {len(websites)} websites")
    
    # Extract snippets
    print("Extracting snippets...")
    snippets = parse_cards(html_file, 'snippets')
    print(f"Found {len(snippets)} snippets")
    
    # Save to JSON files
    backend_dir = Path('backend/database')
    backend_dir.mkdir(parents=True, exist_ok=True)
    
    with open(backend_dir / 'projects.json', 'w', encoding='utf-8') as f:
        json.dump(projects, f, indent=2, ensure_ascii=False)
    print(f"✅ Saved {len(projects)} projects to backend/database/projects.json")
    
    with open(backend_dir / 'websites.json', 'w', encoding='utf-8') as f:
        json.dump(websites, f, indent=2, ensure_ascii=False)
    print(f"✅ Saved {len(websites)} websites to backend/database/websites.json")
    
    with open(backend_dir / 'snippets.json', 'w', encoding='utf-8') as f:
        json.dump(snippets, f, indent=2, ensure_ascii=False)
    print(f"✅ Saved {len(snippets)} snippets to backend/database/snippets.json")
    
    print("\n✅ Data extraction complete!")

if __name__ == '__main__':
    try:
        from bs4 import BeautifulSoup
    except ImportError:
        print("Installing beautifulsoup4...")
        import subprocess
        subprocess.check_call(['pip', 'install', 'beautifulsoup4'])
        from bs4 import BeautifulSoup
    
    main()
