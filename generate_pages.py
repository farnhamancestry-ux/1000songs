import os
from bs4 import BeautifulSoup

# Read master blog file
with open("blog.html", "r", encoding="utf-8") as f:
    soup = BeautifulSoup(f, "html.parser")

# Isolate the style and header tags
style_element = soup.find("style")
header_element = soup.find("header")

# Convert to strings, defaulting to empty strings if missing
style_html = str(style_element) if style_element else ""
header_html = str(header_element) if header_element else ""

os.makedirs("journal", exist_ok=True)

# Find all <article> tags that have an 'id' attribute
for article in soup.find_all("article", id=True):
    art_id = article.get("id")
    
    # Extract the ENTIRE article tag to preserve classes and IDs
    art_html = str(article)

    html = f"""<!DOCTYPE html>
<html>
<head>
    <title>{art_id.replace('-', ' ').title()} - 1000 Songs</title>
    {style_html}
</head>
<body>
    {header_html}
    {art_html}
</body>
</html>"""

    # Generate individual HTML files
    with open(f"journal/{art_id}.html", "w", encoding="utf-8") as f:
        f.write(html)
