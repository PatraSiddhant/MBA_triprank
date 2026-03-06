const fs = require('fs');
const content = fs.readFileSync('data/trip-templates.ts', 'utf8');

const titleRegex = /"title":\s*"([^"]+)"/g;
let match;
const titles = [];
while ((match = titleRegex.exec(content)) !== null) {
    titles.push(match[1]);
}

const counts = {};
titles.forEach(t => {
    counts[t] = (counts[t] || 0) + 1;
});

const duplicates = Object.keys(counts).filter(t => counts[t] > 1);
console.log("Duplicate titles:", duplicates);
