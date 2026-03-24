const fs = require('fs');
const path = require('path');

const walk = (dir) => {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('.tsx') || file.endsWith('.ts')) {
                results.push(file);
            }
        }
    });
    return results;
};

const appDir = path.join(__dirname, 'src', 'app');
const files = walk(appDir);

let changed = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let hasChanged = false;

    // Pattern for template string
    if (content.includes('og-api')) {
        // Replace varied dynamic OG API calls with static /og.png
        // Handle images: [{ url: `${SITE_URL}/og-api...` }]
        const patterns = [
            /\$\{SITE_URL\}\/og-api\?[^`"]+/g,
            /\/og-api\?[^'"]+/g
        ];
        
        patterns.forEach(pattern => {
            if (pattern.test(content)) {
                content = content.replace(pattern, '/og.png');
                hasChanged = true;
            }
        });
    }

    if (hasChanged) {
        fs.writeFileSync(file, content, 'utf8');
        console.log('Fixed ' + file);
        changed++;
    }
});

console.log(`Successfully fixed ${changed} files.`);
