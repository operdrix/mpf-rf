import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const competiteurs = await prisma.competitor.findMany({
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
  });
  return NextResponse.json(competiteurs);
}

export async function POST(request: Request) {
  const data = await request.json();
  const competiteur = await prisma.competitor.create({
    data: {
      license: data.license,
      lastName: data.lastName,
      firstName: data.firstName,
      club: data.club,
      birthDate: new Date(data.birthDate),
    },
  });
  return NextResponse.json(competiteur, { status: 201 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  await prisma.competitor.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

export async function PUT(request: Request) {
  const data = await request.json();
  if (!data.id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  const competiteur = await prisma.competitor.update({
    where: { id: data.id },
    data: {
      license: data.license,
      lastName: data.lastName,
      firstName: data.firstName,
      club: data.club,
      birthDate: new Date(data.birthDate),
    },
  });
  return NextResponse.json(competiteur);
}

// (PUT pour édition à venir) 