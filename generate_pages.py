import os
import re

# Read master blog file
with open("blog.html", "r", encoding="utf-8") as f:
    content = f.read()

# Split entries by article or ID tags (adjust regex to match your HTML structure)
articles = re.findall(
    r'<article id="(.*?)">(.*?)</article>', content, re.DOTALL
)

os.makedirs("journal", exist_ok=True)

# Generate individual HTML files
for art_id, art_content in articles:
    html = f"""<!DOCTYPE html>
<html>
<head>
    <title>{art_id.replace('-', ' ').title()} - 1000 Songs</title>
</head>
<body>
    <article>{art_content}</article>
</body>
</html>"""

    with open(f"journal/{art_id}.html", "w", encoding="utf-8") as f:
        f.write(html)
