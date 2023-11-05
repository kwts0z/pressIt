import prisma from '@/app/lib/prisma';
import { Prisma } from '@prisma/client';

interface PlayerData {
  name: string;
  score: number;
}

export async function POST(req: Request) {
  const data = await req.json();
  let player: Prisma.leaderboardCreateInput
  player = {

    name: data.name,
    score: data.score,
  }

  const newPlayer = await prisma.leaderboard.create({
    data: player
  })
  return new Response(undefined, { status: 200 });
}
