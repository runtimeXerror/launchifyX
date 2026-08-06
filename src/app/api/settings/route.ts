import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const DEFAULTS: Record<string, string> = {
  social_linkedin:  'https://www.linkedin.com/company/launchifyx',
  social_instagram: 'https://www.instagram.com/launchifyx',
  social_twitter:   '',
  social_facebook:  '',
  social_youtube:   '',
  social_whatsapp:  '',
};

export async function GET() {
  try {
    const rows = await prisma.siteSettings.findMany();
    const result = { ...DEFAULTS };
    rows.forEach(r => { result[r.key] = r.value; });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(DEFAULTS);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, string>;
    await Promise.all(
      Object.entries(body).map(([key, value]) =>
        prisma.siteSettings.upsert({
          where:  { key },
          update: { value },
          create: { key, value },
        })
      )
    );
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
