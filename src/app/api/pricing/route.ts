import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/pricing — list active pricing plans
export async function GET() {
  const plans = await prisma.pricingPlan.findMany({
    where: { active: true },
    orderBy: { order: 'asc' },
  });
  return NextResponse.json(plans);
}

// POST /api/pricing — create a pricing plan
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const plan = await prisma.pricingPlan.create({ data: body });
    return NextResponse.json(plan, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
