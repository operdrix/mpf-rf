import { performanceSchema, performanceUpdateSchema } from "@/lib/validations/performance";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const performances = await prisma.performance.findMany({
    include: {
      competitor: true,
      event: true,
    },
    orderBy: [{ date: "desc" }],
  });
  return NextResponse.json(performances);
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const validatedData = performanceSchema.parse({
      ...data,
      time: Number(data.time),
      competitorId: Number(data.competitorId),
      eventId: Number(data.eventId),
    });

    const perf = await prisma.performance.create({
      data: validatedData,
    });
    return NextResponse.json(perf, { status: 201 });
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
    const validatedData = performanceUpdateSchema.parse({
      ...data,
      time: Number(data.time),
      competitorId: Number(data.competitorId),
      eventId: Number(data.eventId),
    });

    const perf = await prisma.performance.update({
      where: { id: validatedData.id },
      data: validatedData,
    });
    return NextResponse.json(perf);
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
    await prisma.performance.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: "Une erreur est survenue" }, { status: 500 });
  }
} 