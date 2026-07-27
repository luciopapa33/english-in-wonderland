/**
 * Script para crear usuario ADMIN en Supabase Auth + Prisma
 * 
 * Uso: node prisma/create-admin.js
 */

require('dotenv').config({ path: '.env' });

const { createClient } = require('@supabase/supabase-js');
const { PrismaClient } = require('../generated/prisma');

const prisma = new PrismaClient();

// ──────────────────────────────────────────────
//  CONFIGURACIÓN DEL ADMIN – Cambiá estos valores
// ──────────────────────────────────────────────
const ADMIN_EMAIL    = 'admin@englishinwonderland.com';
const ADMIN_PASSWORD = 'Admin@EIW2025!';
const ADMIN_NAME     = 'Administrador';
// ──────────────────────────────────────────────

async function main() {
    const supabaseUrl         = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceRole) {
        throw new Error('Faltan variables NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env');
    }

    // Cliente con Service Role (bypass RLS)
    const supabase = createClient(supabaseUrl, supabaseServiceRole, {
        auth: { autoRefreshToken: false, persistSession: false },
    });

    console.log('\n🔐 Creando usuario admin en Supabase Auth...');
    console.log(`   Email   : ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}\n`);

    // 1. Crear usuario en Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        email_confirm: true,       // Confirmar email automáticamente
        user_metadata: { name: ADMIN_NAME },
    });

    if (authError) {
        // Si ya existe, buscar el ID existente
        if (authError.message?.includes('already been registered') || authError.status === 422) {
            console.log('⚠️  El usuario ya existe en Supabase Auth. Buscando ID...');
            const { data: listData, error: listError } = await supabase.auth.admin.listUsers();
            if (listError) throw listError;

            const existing = listData.users.find(u => u.email === ADMIN_EMAIL);
            if (!existing) throw new Error('No se encontró el usuario en Supabase Auth');

            console.log(`   ID Supabase: ${existing.id}`);
            await syncPrisma(existing.id);
        } else {
            throw authError;
        }
    } else {
        const userId = authData.user.id;
        console.log(`✅ Usuario creado en Supabase Auth`);
        console.log(`   ID Supabase: ${userId}`);
        await syncPrisma(userId);
    }

    console.log('\n🎉 ¡Admin listo! Podés iniciar sesión en /campus con:');
    console.log(`   Email   : ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}\n`);
}

async function syncPrisma(supabaseId) {
    console.log('\n🗄️  Sincronizando en base de datos Prisma...');

    const user = await prisma.user.upsert({
        where: { id: supabaseId },
        update: {
            email: ADMIN_EMAIL,
            name:  ADMIN_NAME,
            role:  'ADMIN',
        },
        create: {
            id:    supabaseId,
            email: ADMIN_EMAIL,
            name:  ADMIN_NAME,
            role:  'ADMIN',
        },
    });

    console.log(`✅ Usuario en Prisma DB:`);
    console.log(`   ID   : ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Rol  : ${user.role}`);

    // Enroll admin in ALL existing courses
    await enrollAdminInAllCourses(user.id);
}

async function enrollAdminInAllCourses(adminId) {
    console.log('\n📚 Enrolando admin en todos los cursos...');

    const allCourses = await prisma.course.findMany({
        select: { id: true, title: true },
    });

    if (allCourses.length === 0) {
        console.log('   ⚠️  No hay cursos en la base de datos todavía.');
        return;
    }

    let enrolled = 0;
    let skipped  = 0;

    for (const course of allCourses) {
        try {
            await prisma.enrollment.upsert({
                where: {
                    userId_courseId: { userId: adminId, courseId: course.id },
                },
                update: {},   // Already enrolled – nothing to change
                create: {
                    userId:   adminId,
                    courseId: course.id,
                    progress: 0,
                },
            });
            console.log(`   ✅ ${course.title}`);
            enrolled++;
        } catch (e) {
            console.log(`   ⏭️  ${course.title} (ya enrolado)`);
            skipped++;
        }
    }

    console.log(`\n   📊 Resultado: ${enrolled} enrolados, ${skipped} ya existían`);
    console.log(`   Total cursos en plataforma: ${allCourses.length}`);
}

main()
    .catch(e => { console.error('❌ Error:', e.message); process.exit(1); })
    .finally(() => prisma.$disconnect());
