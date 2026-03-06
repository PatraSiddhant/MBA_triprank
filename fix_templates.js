const fs = require('fs');
let content = fs.readFileSync('data/trip-templates.ts', 'utf8');

// The colon could be after the country (e.g. "Costa Rica: ...")
// We replace 'title: "Something: Tagline"' or '"title": "Something: Tagline"'
// Note: Some templates might have the tagline separated by dashes or colons.
content = content.replace(/\"title\":\s*\"([^\"]+):\s*[^\"]+\"/g, '"title": "$1"');
content = content.replace(/title:\s*\"([^\"]+):\s*[^\"]+\"/g, 'title: "$1"');

// And remove specific occurrences of "The iconic MBA trip" just in case they are not behind a colon
content = content.replace(/: The iconic MBA trip/g, '');
content = content.replace(/ \- The iconic MBA trip/g, '');

fs.writeFileSync('data/trip-templates.ts', content);
console.log('Fixed titles');
