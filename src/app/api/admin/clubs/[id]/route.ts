import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const club = await prisma.club.findUnique({ where: { id: parseInt(id) } });
  return NextResponse.json(club);
}