const fs = require('fs');

const path = 'c:/Users/Siddhant Patra/OneDrive - Columbia Business School/Documents/Antigravity_tool/mbatriprank/triprank/data/trip-templates.ts';
let content = fs.readFileSync(path, 'utf8');

const folderMap = {
    'Argentina': 'argentina',
    'Australia': 'australia',
    'Germany': 'berlin',
    'China': 'china',
    'Colombia': 'colombia',
    'Costa Rica': 'costarica',
    'Croatia': 'croatia',
    'Egypt': 'egypt',
    'Greece': 'greece',
    'Spain': 'ibiza',
    'Iceland': 'iceland',
    'India': 'india',
    'Japan': 'japan',
    'Jordan': 'jordan',
    'Kenya': 'kenya',
    'Mexico': 'mexico',
    'Morocco': 'morocco',
    'Chile': 'patagonia',
    'Peru': 'peru',
    'Philippines': 'philippines',
    'Portugal': 'portugal',
    'United Kingdom': 'scotland',
    'South Africa': 'south-africa',
    'South Korea': 'southkorea',
    'Taiwan': 'taiwan',
    'Tanzania': 'tanzania',
    'Turkey': 'turkey',
    'United Arab Emirates': 'uae',
    'Vietnam': 'vietnam',
    'Italy': 'berlin', // Placeholder if not found
    'France': 'berlin',
    'Singapore': 'taiwan',
    'Thailand': 'philippines',
    'Austria': 'berlin',
    'Brazil': 'argentina',
    'Netherlands': 'berlin',
    'Czech Republic': 'berlin'
};

const tripTemplatesRegex = /"primaryDestinationCountry": "([^"]+)"/g;
let match;
const countriesFound = new Set();
while ((match = tripTemplatesRegex.exec(content)) !== null) {
    countriesFound.add(match[1]);
}

countriesFound.forEach(country => {
    const folder = folderMap[country] || country.toLowerCase().replace(/\s+/g, '-');
    const oldPath = new RegExp(`"/trips/${country.toLowerCase().replace(/\s+/g, '-')}/hero\\.png"`, 'g');
    content = content.replace(oldPath, `"/trips/${folder}/hero.png"`);
});

fs.writeFileSync(path, content);
console.log('Fixed image paths');
