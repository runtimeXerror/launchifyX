import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/analytics/overview — dashboard summary stats
export async function GET() {
  const [
    totalRequests,
    pendingRequests,
    completedRequests,
    totalServices,
    recentRequests,
    grouped,
  ] = await Promise.all([
    prisma.clientRequest.count(),
    prisma.clientRequest.count({ where: { status: 'pending' } }),
    prisma.clientRequest.count({ where: { status: 'completed' } }),
    prisma.service.count({ where: { active: true } }),
    prisma.clientRequest.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.clientRequest.groupBy({ by: ['status'], _count: { status: true } }),
  ]);

  const requestsByStatus = grouped.map((g) => ({
    status: g.status,
    count: g._count.status,
  }));

  return NextResponse.json({
    totalRequests,
    pendingRequests,
    completedRequests,
    totalServices,
    requestsByStatus,
    recentRequests,
  });
}
