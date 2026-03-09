const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
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
}

const targetDir = path.join(__dirname, 'src', 'app');
const files = walk(targetDir);

let changed = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('https://free-tools.vercel.app')) {
        let newContent = content.replace(/https:\/\/free-tools\.vercel\.app/g, 'https://free-tools-steel.vercel.app');
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Updated ' + file);
        changed++;
    }
});

console.log('Total files changed: ' + changed);
