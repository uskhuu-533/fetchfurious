import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.redirect(new URL('/sign-in', req.url));
    response.cookies.set('auth_token', '', {
      maxAge: 0, 
    });
    return response;
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
