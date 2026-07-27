import { createClient } from '@supabase/supabase-js'

const BUCKET = 'course-content'

// Supabase admin client (service role — server-side only)
function getStorageClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
    )
}

// ─────────────────────────────────────────────────────────
// Metadata for each digital product slug
// ─────────────────────────────────────────────────────────
export const PRODUCT_META: Record<string, {
    gradient: string;
    accent: string;
    accentBg: string;
    contentFolder: string;
    pdfFile: string | null;
}> = {
    'english-for-interviews': {
        gradient: 'from-[#BC248C] to-[#D66FA3]',
        accent: 'text-[#BC248C]',
        accentBg: 'bg-[#BC248C]',
        contentFolder: 'interviews',
        pdfFile: null,
    },
    'english-for-travel': {
        gradient: 'from-[#2D93C7] to-[#1DA1D2]',
        accent: 'text-[#2D93C7]',
        accentBg: 'bg-[#2D93C7]',
        contentFolder: 'travel',
        pdfFile: '1Booklet para viajes GRABADO.pdf',
    },
    'english-for-medical-emergency': {
        gradient: 'from-[#e74c3c] to-[#c0392b]',
        accent: 'text-[#e74c3c]',
        accentBg: 'bg-[#e74c3c]',
        contentFolder: 'medical',
        pdfFile: null,
    },
}

// ─────────────────────────────────────────────────────────
// Build the public URL for a file in Supabase Storage
// ─────────────────────────────────────────────────────────
function publicUrl(storagePath: string): string {
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL
    return `${base}/storage/v1/object/public/${BUCKET}/${storagePath}`
}

// ─────────────────────────────────────────────────────────
// List all .mp4 files in a course folder, sorted numerically
// ─────────────────────────────────────────────────────────
export async function getVideos(folder: string): Promise<{ name: string; number: number; path: string }[]> {
    const supabase = getStorageClient()

    const { data, error } = await supabase.storage
        .from(BUCKET)
        .list(folder, { limit: 500, offset: 0 })

    if (error || !data) return []

    return data
        .filter(f => f.name.endsWith('.mp4'))
        .map(f => {
            const num = parseInt(f.name.replace('.mp4', ''), 10)
            return {
                name: f.name,
                number: isNaN(num) ? 0 : num,
                path: publicUrl(`${folder}/${f.name}`),
            }
        })
        .sort((a, b) => a.number - b.number)
}

// ─────────────────────────────────────────────────────────
// Get the PDF file URL from a course folder (if any)
// ─────────────────────────────────────────────────────────
export async function getPdf(folder: string): Promise<string | null> {
    const supabase = getStorageClient()

    const { data, error } = await supabase.storage
        .from(BUCKET)
        .list(folder, { limit: 500, offset: 0 })

    if (error || !data) return null

    const pdf = data.find(f => f.name.toLowerCase().endsWith('.pdf'))
    if (!pdf) return null

    return publicUrl(`${folder}/${pdf.name}`)
}
