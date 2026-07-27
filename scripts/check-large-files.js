const fs = require('fs');
const path = require('path');

const LIMIT = 50 * 1024 * 1024; // 50 MB
const folders = ['interviews', 'travel', 'medical'];

console.log('Files OVER 50 MB (will fail on Supabase free tier):');
console.log('─'.repeat(50));

let count = 0;
for (const f of folders) {
    const dir = path.join('public', 'content', f);
    const files = fs.readdirSync(dir).filter(x => x.endsWith('.mp4'));
    for (const file of files) {
        const size = fs.statSync(path.join(dir, file)).size;
        if (size > LIMIT) {
            console.log(`  ${f}/${file}  →  ${(size / 1024 / 1024).toFixed(1)} MB`);
            count++;
        }
    }
}
console.log('─'.repeat(50));
console.log(`Total: ${count} files exceed 50 MB`);
