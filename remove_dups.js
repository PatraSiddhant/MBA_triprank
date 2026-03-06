const fs = require('fs');

const path = 'data/trip-templates.ts';
let content = fs.readFileSync(path, 'utf8');

// Find all occurrences of "title": "Costa Rica"
const occurrences = [];
let re = /"title":\s*"Costa Rica"/g;
let match;
while ((match = re.exec(content)) !== null) {
    occurrences.push(match.index);
}

if (occurrences.length > 1) {
    // The second occurrence is usually further down. Let's find the object bounds for the second one.
    // The object starts with { a few lines before and ends with },
    const secondOccur = occurrences[1];
    let startIdx = content.lastIndexOf('{', secondOccur);
    let endIdx = content.indexOf('},', secondOccur);

    // We should safely find the matching bracket by counting, but since we know the structure:
    let bracketCount = 0;
    for (let i = startIdx; i < content.length; i++) {
        if (content[i] === '{') bracketCount++;
        else if (content[i] === '}') {
            bracketCount--;
            if (bracketCount === 0) {
                endIdx = i;
                break;
            }
        }
    }

    if (endIdx !== -1) {
        // Remove the trailing comma if there is one
        if (content[endIdx + 1] === ',') endIdx++;

        const newContent = content.substring(0, startIdx).trimEnd() + ((content[startIdx - 1] === ',') ? '' : ',') + "\n" + content.substring(endIdx + 1).trimStart();
        // Since we might have messed up commas if it was the last element, we need to be careful.
        // Let's do a simpler regex matching the second costa rica template exactly if possible.
    }
}

// Safer approach: split by `    {` (4 spaces + brace)
const blocks = content.split('\n    {\n');
const newBlocks = blocks.filter((block, idx) => {
    if (idx === 0) return true; // first block contains imports
    // If it's the duplicate Costa Rica lacking an image, it won't have /costarica/hero.png
    if (block.includes('"title": "Costa Rica"')) {
        if (!block.includes('costarica/hero.png') && !block.includes('isHero')) {
            console.log('Found duplicate Costa Rica without image, removing.');
            return false;
        }
    }
    return true;
});

const finalContent = newBlocks.join('\n    {\n');
fs.writeFileSync(path, finalContent, 'utf8');
console.log('Deduplication done.');
