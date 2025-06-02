import { competitorSchema, competitorUpdateSchema } from "@/lib/validations/competitor";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const competiteurs = await prisma.competitor.findMany({
    include: {
      club: true,
    },
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
  });
  return NextResponse.json(competiteurs);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = competitorSchema.parse({
      ...data,
      clubId: Number(data.clubId),
    });

    const competiteur = await prisma.competitor.create({
      data: validatedData,
    });
    return NextResponse.json(competiteur, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = Number(searchParams.get("id"));
    if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    await prisma.competitor.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();
    const validatedData = competitorUpdateSchema.parse({
      ...data,
      clubId: Number(data.clubId),
    });

    const competiteur = await prisma.competitor.update({
      where: { id: validatedData.id },
      data: validatedData,
    });
    return NextResponse.json(competiteur);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 });
  }
}
