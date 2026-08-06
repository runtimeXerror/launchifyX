import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/clients — list all client requests (newest first)
export async function GET() {
  const clients = await prisma.clientRequest.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(clients);
}

// POST /api/clients — create a new client request (from the contact form)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, service, budget, timeline, source, message, notes } = body ?? {};

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 },
      );
    }

    const client = await prisma.clientRequest.create({
      data: { name, email, phone, company, service, budget, timeline, source, message, notes },
    });

    return NextResponse.json(client, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
