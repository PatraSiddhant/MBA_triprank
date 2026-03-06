const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\Siddhant Patra\\.gemini\\antigravity\\brain\\16d9df91-4953-4065-8431-dd60f907e671';
const destBase = 'public\\trips';

// Map of template slugs to the generated prefix
const mappings = {
    'tanzania-trek': 'tanzania',
    'dominican-republic-trek': 'dominican',
    'jamaica-trek': 'jamaica',
    'brazil-trek': 'brazil',
    'costa-rica-trek': 'costarica',
    'chile-trek': 'chile',
    'spain-trek': 'spain',
    'thailand-trek': 'thailand',
    'indonesia-trek': 'indonesia',
    // Fallback singapore to indonesia since we ran out of quota
    'singapore-trek': 'indonesia'
};

// First let's figure out what the actual path is in trip-templates.ts
const tplContent = fs.readFileSync('data/trip-templates.ts', 'utf8');

const files = fs.readdirSync(srcDir);

for (const [slug, prefix] of Object.entries(mappings)) {
    // Find matching photo in src
    const srcPhoto = files.find(f => f.startsWith(prefix + '_hero_') && f.endsWith('.png'));
    if (!srcPhoto) {
        console.log(`Skipping ${prefix}, no image found`);
        continue;
    }

    // Find where the slug's folder is by parsing trip-templates.ts
    // Looking for a block that has 'slug': 'tanzania-trek' ... 'path': '/trips/something/hero.png'
    // It's easier just to extract the path using regex
    const blockRegex = new RegExp(`['"]slug['"]\\s*:\\s*['"]${slug}['"][\\s\\S]*?['"]path['"]\\s*:\\s*['"]\\/trips\\/([^\\/]+)\\/hero\\.png['"]`);
    const match = tplContent.match(blockRegex);
    let folder = prefix;
    if (match && match[1]) {
        folder = match[1];
    } else {
        // Fallback or override specific ones known
        if (slug === 'dominican-republic-trek') folder = 'dominican-republic';
        if (slug === 'costa-rica-trek') folder = 'costarica';
        if (slug === 'tanzania-trek') folder = 'tanzania';
        // and check if they exist anyway
    }

    const fullDestDir = path.join(destBase, folder);
    if (!fs.existsSync(fullDestDir)) {
        fs.mkdirSync(fullDestDir, { recursive: true });
    }

    const fullDestPath = path.join(fullDestDir, 'hero.png');
    const fullSrcPath = path.join(srcDir, srcPhoto);

    fs.copyFileSync(fullSrcPath, fullDestPath);
    console.log(`Copied ${srcPhoto} to ${fullDestPath}`);
}
