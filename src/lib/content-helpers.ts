import fs from 'fs'
import path from 'path'

// Metadata for each digital product slug
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

export function getVideos(folder: string): { name: string; number: number; path: string }[] {
    const dirPath = path.join(process.cwd(), 'public', 'content', folder)
    try {
        const files = fs.readdirSync(dirPath)
        return files
            .filter(f => f.endsWith('.mp4'))
            .map(f => ({
                name: f,
                number: parseInt(f.replace('.mp4', '')),
                path: `/content/${folder}/${f}`,
            }))
            .sort((a, b) => a.number - b.number)
    } catch {
        return []
    }
}

export function getPdf(folder: string): string | null {
    const dirPath = path.join(process.cwd(), 'public', 'content', folder)
    try {
        const files = fs.readdirSync(dirPath)
        const pdf = files.find(f => f.toLowerCase().endsWith('.pdf'))
        if (pdf) return `/content/${folder}/${pdf}`
        return null
    } catch {
        return null
    }
}
