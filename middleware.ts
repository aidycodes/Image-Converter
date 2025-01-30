import { NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Initialize the rate limiter
const redis = new Redis({
  url: process.env.REDIS_UPSTASH_URL!,
  token: process.env.REDIS_UPSTASH_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(5, '10 s'), // Allow 5 requests per 10 seconds
});

export async function middleware(request: Request) {
  // Use the client's IP address for rate limiting
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { success, limit, reset, remaining } = await ratelimit.limit(ip);

  console.log(`Rate limit: ${remaining}/${limit} requests remaining. Reset in ${reset} seconds.`);

  if (!success) {
    // If the rate limit is exceeded, return a 429 response
    return new NextResponse('Rate limit exceeded. Please try again later.', {
      status: 429,
      headers: {
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': reset.toString(),
      },
    });
  }

  // If the rate limit is not exceeded, proceed with the request
  return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/api/v1/:path*',
}