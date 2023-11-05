import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export const fetchCache = 'force-no-store';
export const revalidate=0 ;
export const dynamic = "force-dynamic";

export async function GET() {
    const players = await prisma.leaderboard.findMany({
        orderBy: {
            score: 'desc',
        },
    });
    console.log('backend data', players);
    return new Response(JSON.stringify(players), { status: 200 });
}