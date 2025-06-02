import { clubSchema, clubUpdateSchema } from "@/lib/validations/club";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const clubs = await prisma.club.findMany({
    orderBy: [{ name: "asc" }],
  });
  return NextResponse.json(clubs);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = clubSchema.parse(data);

    const club = await prisma.club.create({
      data: validatedData,
    });
    return NextResponse.json(club, { status: 201 });
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
    const validatedData = clubUpdateSchema.parse(data);

    const club = await prisma.club.update({
      where: { id: validatedData.id },
      data: validatedData,
    });
    return NextResponse.json(club);
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
    await prisma.club.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 });
  }
}