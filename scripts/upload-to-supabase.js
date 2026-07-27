/**
 * upload-to-supabase.js
 * One-time script: reads all videos + PDFs from public/content/
 * and uploads them to Supabase Storage bucket "course-content".
 *
 * Usage: node scripts/upload-to-supabase.js
 */

require('dotenv').config({ path: '.env' });

const { createClient } = require('@supabase/supabase-js');
const fs   = require('fs');
const path = require('path');

const BUCKET = 'course-content';
const FOLDERS = ['interviews', 'travel', 'medical'];
const CONTENT_DIR = path.join(__dirname, '..', 'public', 'content');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
);

// ─────────────────────────────────────────────────────────
// MIME types
// ─────────────────────────────────────────────────────────
function mimeType(filename) {
    const ext = path.extname(filename).toLowerCase();
    if (ext === '.mp4')  return 'video/mp4';
    if (ext === '.pdf')  return 'application/pdf';
    if (ext === '.webm') return 'video/webm';
    return 'application/octet-stream';
}

// ─────────────────────────────────────────────────────────
// Ensure bucket exists (public)
// ─────────────────────────────────────────────────────────
async function ensureBucket() {
    const { data: buckets } = await supabase.storage.listBuckets();
    const exists = buckets?.some(b => b.name === BUCKET);

    if (!exists) {
        console.log(`🪣  Creating bucket "${BUCKET}"...`);
        const { error } = await supabase.storage.createBucket(BUCKET, {
            public: true,
            allowedMimeTypes: ['video/mp4', 'video/webm', 'application/pdf'],
        });
        if (error) throw new Error(`Failed to create bucket: ${error.message}`);
        console.log(`   ✅ Bucket created\n`);
    } else {
        console.log(`🪣  Bucket "${BUCKET}" already exists\n`);
    }
}

// ─────────────────────────────────────────────────────────
// Upload a single file
// ─────────────────────────────────────────────────────────
async function uploadFile(localPath, storagePath) {
    const fileBuffer = fs.readFileSync(localPath);
    const mime = mimeType(localPath);

    const { error } = await supabase.storage
        .from(BUCKET)
        .upload(storagePath, fileBuffer, {
            contentType: mime,
            upsert: true,   // overwrite if already exists
        });

    if (error) throw new Error(`Upload failed for ${storagePath}: ${error.message}`);
}

// ─────────────────────────────────────────────────────────
// Format bytes
// ─────────────────────────────────────────────────────────
function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

// ─────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────
async function main() {
    console.log('🚀 Supabase Storage Upload Script');
    console.log('='.repeat(50));

    await ensureBucket();

    let totalFiles  = 0;
    let totalBytes  = 0;
    let failedFiles = [];

    for (const folder of FOLDERS) {
        const localDir = path.join(CONTENT_DIR, folder);

        if (!fs.existsSync(localDir)) {
            console.log(`⚠️  Folder not found, skipping: ${localDir}\n`);
            continue;
        }

        const files = fs.readdirSync(localDir).filter(f => {
            const ext = path.extname(f).toLowerCase();
            return ext === '.mp4' || ext === '.pdf' || ext === '.webm';
        });

        console.log(`📁 ${folder}/ — ${files.length} files`);

        for (const file of files) {
            const localPath   = path.join(localDir, file);
            const storagePath = `${folder}/${file}`;
            const sizeBytes   = fs.statSync(localPath).size;

            process.stdout.write(`   ⬆️  ${file} (${formatBytes(sizeBytes)})...`);

            try {
                await uploadFile(localPath, storagePath);
                process.stdout.write(` ✅\n`);
                totalFiles++;
                totalBytes += sizeBytes;
            } catch (err) {
                process.stdout.write(` ❌  ${err.message}\n`);
                failedFiles.push(storagePath);
            }
        }
        console.log();
    }

    // ── Summary ──────────────────────────────────────────
    console.log('='.repeat(50));
    console.log(`✅  Uploaded: ${totalFiles} files (${formatBytes(totalBytes)})`);

    if (failedFiles.length > 0) {
        console.log(`❌  Failed  : ${failedFiles.length}`);
        failedFiles.forEach(f => console.log(`     - ${f}`));
    }

    // ── Print public base URL ─────────────────────────────
    const baseUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET}`;
    console.log(`\n🌐 Public base URL:`);
    console.log(`   ${baseUrl}`);
    console.log(`\n   Example video : ${baseUrl}/interviews/1.mp4`);
    console.log(`   Example PDF   : ${baseUrl}/interviews/4Booklet%20entrevistas%20GRABADO.pdf`);
    console.log('\n🎉 Done! The platform will now serve content from Supabase Storage.\n');
}

main()
    .catch(e => { console.error('\n❌ Fatal error:', e.message); process.exit(1); });
