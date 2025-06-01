import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const epreuves = await prisma.event.findMany({ orderBy: [{ name: "asc" }] });
  return NextResponse.json(epreuves);
}

export async function POST(request: Request) {
  const data = await request.json();
  const epreuve = await prisma.event.create({
    data: {
      name: data.name,
      poolLength: Number(data.poolLength),
      category: data.category,
    },
  });
  return NextResponse.json(epreuve, { status: 201 });
}

export async function PUT(request: Request) {
  const data = await request.json();
  if (!data.id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  const epreuve = await prisma.event.update({
    where: { id: data.id },
    data: {
      name: data.name,
      poolLength: Number(data.poolLength),
      category: data.category,
    },
  });
  return NextResponse.json(epreuve);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 