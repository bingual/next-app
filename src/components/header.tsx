'use client';
import Link from 'next/link';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Header() {
    const { data: session, status } = useSession();

    return (
        <>
            {status === 'authenticated' ? (
                <button
                    onClick={async () => {
                        await signOut();
                    }}
                >
                    로그아웃
                </button>
            ) : (
                <>
                    <button
                        onClick={async () => {
                            await signIn();
                        }}
                    >
                        로그인
                    </button>{' '}
                    <button>
                        <Link href={'/auth/signup'}>회원가입</Link>
                    </button>
                </>
            )}
            <ul>
                <li>
                    <Link href={'/'}>메인</Link>
                </li>
                <li>
                    <Link href={'/posts'}>게시글 목록</Link>
                </li>
                {session && (
                    <li>
                        <Link href={'/posts/create'}>게시글 생성</Link>
                    </li>
                )}
            </ul>
        </>
    );
}
