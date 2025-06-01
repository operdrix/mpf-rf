import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

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
  const data = await request.json();
  const perf = await prisma.performance.create({
    data: {
      time: Number(data.time),
      type: data.type,
      date: new Date(data.date),
      valid: !!data.valid,
      competitorId: Number(data.competitorId),
      eventId: Number(data.eventId),
      ageCategory: data.ageCategory,
    },
  });
  return NextResponse.json(perf, { status: 201 });
}

export async function PUT(request: Request) {
  const data = await request.json();
  if (!data.id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  const perf = await prisma.performance.update({
    where: { id: data.id },
    data: {
      time: Number(data.time),
      type: data.type,
      date: new Date(data.date),
      valid: !!data.valid,
      competitorId: Number(data.competitorId),
      eventId: Number(data.eventId),
      ageCategory: data.ageCategory,
    },
  });
  return NextResponse.json(perf);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  if (!id) return NextResponse.json({ error: "ID manquant" }, { status: 400 });
  await prisma.performance.delete({ where: { id } });
  return NextResponse.json({ success: true });
} 