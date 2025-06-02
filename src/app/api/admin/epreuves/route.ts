import { eventSchema, eventUpdateSchema } from "@/lib/validations/event";
import { Event, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const epreuves = await prisma.event.findMany({ orderBy: [{ name: "asc" }] });
  return NextResponse.json(epreuves);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = eventSchema.parse({
      ...data,
      poolLength: Number(data.poolLength),
    });

    const epreuve: Event = await prisma.event.create({
      data: validatedData,
    });
    return NextResponse.json(epreuve, { status: 201 });
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
    const validatedData = eventUpdateSchema.parse({
      ...data,
      poolLength: Number(data.poolLength),
    });

    const epreuve = await prisma.event.update({
      where: { id: validatedData.id },
      data: {
        name: validatedData.name,
        poolLength: validatedData.poolLength,
        category: validatedData.category,
      },
    });
    return NextResponse.json(epreuve);
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
    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 });
  }
} 