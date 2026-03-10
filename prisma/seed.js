// Seed script – Creates the 3 digital product packs
const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
    const products = [
        {
            title: 'English for Interviews',
            slug: 'english-for-interviews',
            description: 'Dominá el inglés que necesitás para brillar en entrevistas laborales. Videos explicativos paso a paso con situaciones reales: cómo presentarte, responder preguntas difíciles, negociar salario y más. Incluye PDFs de apoyo con vocabulario clave, frases imprescindibles y ejercicios prácticos.',
            price: 40000,
            level: 'ALL_LEVELS',
            type: 'DIGITAL_PRODUCT',
        },
        {
            title: 'English for Travel',
            slug: 'english-for-travel',
            description: 'Todo el inglés que necesitás para viajar con confianza. Desde el aeropuerto hasta el hotel, restaurantes, compras y emergencias. Videos con diálogos reales y situaciones cotidianas. Incluye PDFs con frases esenciales organizadas por situación para llevar en tu celular.',
            price: 40000,
            level: 'ALL_LEVELS',
            type: 'DIGITAL_PRODUCT',
        },
        {
            title: 'English for Medical Emergency',
            slug: 'english-for-medical-emergency',
            description: 'Vocabulario y comunicación médica en inglés para situaciones de emergencia. Aprende a describir síntomas, entender indicaciones médicas, comunicarte en hospitales y farmacias. Videos con escenarios reales y PDFs con terminología médica esencial.',
            price: 40000,
            level: 'ALL_LEVELS',
            type: 'DIGITAL_PRODUCT',
        },
    ];

    for (const product of products) {
        const existing = await prisma.course.findFirst({ where: { slug: product.slug } });
        if (existing) {
            console.log(`⏭️  "${product.title}" already exists, updating...`);
            await prisma.course.update({ where: { id: existing.id }, data: product });
        } else {
            await prisma.course.create({ data: product });
            console.log(`✅ Created "${product.title}"`);
        }
    }

    console.log('\n🎉 All 3 digital products seeded!');
}

main()
    .catch(e => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
