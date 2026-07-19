const fs = require('fs');

// Load your specific JSON file
const newsData = require('./news.json');

const SITE_URL = 'https://1000songs.co.uk';

// Helper function to fix the mixed date formats ("14th July 2026" vs "2026-05-15")
function parseDate(dateStr) {
  // This removes 'st', 'nd', 'rd', 'th' so JavaScript can properly format it
  const cleanDateStr = dateStr.replace(/\b(\d+)(st|nd|rd|th)\b/g, '$1');
  const d = new Date(cleanDateStr);
  return d.toUTCString(); // Converts to the strict RFC 822 format RSS needs
}

let rssItems = '';

newsData.forEach(item => {
  // Since you don't have individual pages for each news item, 
  // we generate a unique ID (guid) using the title and date.
  const uniqueSlug = item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const guid = `${SITE_URL}/#${uniqueSlug}-${item.date.replace(/\s+/g, '-')}`;

  // We wrap the content in CDATA so your book and Hacker News links remain clickable!
  rssItems += `
    <item>
      <title><![CDATA[${item.title}]]></title>
      <link>${SITE_URL}</link>
      <guid isPermaLink="false">${guid}</guid>
      <pubDate>${parseDate(item.date)}</pubDate>
      <description><![CDATA[<b>${item.author} (${item.type}):</b> <br><br> ${item.content}]]></description>
    </item>`;
});

// The main RSS wrapper
const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2002/Atom">
  <channel>
    <title>1000 Songs - Sonic Archive Updates</title>
    <link>${SITE_URL}</link>
    <description>Latest updates, news, and community comments from the 1000 Songs archive.</description>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${rssItems}
  </channel>
</rss>`;

// This saves the new file directly into your folder
fs.writeFileSync('./feed.xml', rssFeed.trim());
console.log('⚡ Success! feed.xml has been created.');
