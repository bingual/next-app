import * as process from 'process';
import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest, event: NextFetchEvent) {
    // 토큰이 존재 할때 에만 토큰 추출
    const token = await getToken({ req, secret, raw: true });

    const { pathname } = req.nextUrl;

    // 비 로그인 시 게시글 생성 페이지 접근 불가
    if (pathname === '/posts/create' && !token) {
        return NextResponse.redirect(new URL('/posts', req.url));
    }

    // 로그인 시 회원 가입 페이지 접근 불가
    if (pathname === '/auth/signup' && token) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    // 로그인 시 로그인 페이지 접근 불가
    if (pathname === '/auth/login' && token) {
        return NextResponse.redirect(new URL('/', req.url));
    }
}

// 해당 라우트 에서만 미들 웨어 실행
export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico|img).*)',
};
