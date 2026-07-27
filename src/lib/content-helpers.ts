const BUCKET = 'course-content'
const SUPABASE_BASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://bktouvieisdzwkdqczrx.supabase.co'

// Metadata for each digital product slug
export const PRODUCT_META: Record<string, {
    gradient: string;
    accent: string;
    accentBg: string;
    contentFolder: string;
    videoCount: number;
    pdfFile: string | null;
}> = {
    'english-for-interviews': {
        gradient: 'from-[#BC248C] to-[#D66FA3]',
        accent: 'text-[#BC248C]',
        accentBg: 'bg-[#BC248C]',
        contentFolder: 'interviews',
        videoCount: 29,
        pdfFile: '4Booklet entrevistas GRABADO.pdf',
    },
    'english-for-travel': {
        gradient: 'from-[#2D93C7] to-[#1DA1D2]',
        accent: 'text-[#2D93C7]',
        accentBg: 'bg-[#2D93C7]',
        contentFolder: 'travel',
        videoCount: 45,
        pdfFile: '1Booklet para viajes GRABADO.pdf',
    },
    'english-for-medical-emergency': {
        gradient: 'from-[#e74c3c] to-[#c0392b]',
        accent: 'text-[#e74c3c]',
        accentBg: 'bg-[#e74c3c]',
        contentFolder: 'medical',
        videoCount: 12,
        pdfFile: '3Booklet medical GRABADO.pdf',
    },
}

// ─────────────────────────────────────────────────────────
// Build the public URL for a file in Supabase Storage
// ─────────────────────────────────────────────────────────
function publicUrl(storagePath: string): string {
    return `${SUPABASE_BASE_URL}/storage/v1/object/public/${BUCKET}/${encodeURI(storagePath)}`
}

// ─────────────────────────────────────────────────────────
// List all .mp4 files in a course folder instantly
// ─────────────────────────────────────────────────────────
export async function getVideos(folder: string): Promise<{ name: string; number: number; path: string }[]> {
    const meta = Object.values(PRODUCT_META).find(m => m.contentFolder === folder)
    const count = meta?.videoCount || 0

    const videos = []
    for (let i = 1; i <= count; i++) {
        videos.push({
            name: `${i}.mp4`,
            number: i,
            path: publicUrl(`${folder}/${i}.mp4`),
        })
    }
    return videos
}

// ─────────────────────────────────────────────────────────
// Get the PDF file URL from static metadata instantly
// ─────────────────────────────────────────────────────────
export async function getPdf(folder: string): Promise<string | null> {
    const meta = Object.values(PRODUCT_META).find(m => m.contentFolder === folder)
    if (!meta || !meta.pdfFile) return null
    return publicUrl(`${folder}/${meta.pdfFile}`)
}
