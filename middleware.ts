import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.REDIS_UPSTASH_URL!,
  token: process.env.REDIS_UPSTASH_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(1, '20 s'), // Allow 1 request per 20 seconds
});

export async function middleware(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    console.log(`Rate limit: ${remaining}/${limit} requests remaining. Reset in ${reset} seconds.`);

    if (!success) {
      throw new Error('Rate limit exceeded. Please try again later.')
    }

    return NextResponse.next();
  } catch (error: unknown) {
    console.log(error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error : 'Unknown error' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      }
    );
  }
}

export const config = {
  matcher: '/api/v1/:path*',
}