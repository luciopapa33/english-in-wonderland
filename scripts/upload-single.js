require('dotenv').config({ path: '.env' });
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { autoRefreshToken: false, persistSession: false } }
);

async function main() {
    const localPath    = path.join('public', 'content', 'interviews', '12_compressed.mp4');
    const storagePath  = 'interviews/12.mp4';
    const sizeBytes    = fs.statSync(localPath).size;

    console.log(`⬆️  Uploading ${storagePath} (${(sizeBytes / 1024 / 1024).toFixed(1)} MB)...`);

    const fileBuffer = fs.readFileSync(localPath);
    const { error } = await supabase.storage
        .from('course-content')
        .upload(storagePath, fileBuffer, { contentType: 'video/mp4', upsert: true });

    if (error) throw new Error(error.message);

    console.log('✅ Uploaded successfully!');
    console.log(`🌐 URL: ${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/course-content/${storagePath}`);

    // Clean up temp file
    fs.unlinkSync(localPath);
    console.log('🧹 Cleaned up temporary compressed file.');
}

main().catch(e => { console.error('❌', e.message); process.exit(1); });
