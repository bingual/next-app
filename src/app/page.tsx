'use client';

import { useSession } from 'next-auth/react';

export default function Home() {
    const { data: session, status } = useSession();
    return (
        <>
            <h1>메인 페이지</h1>
            {status === 'authenticated' && (
                <h3>{session?.user.username} 님 환영합니다.</h3>
            )}
        </>
    );
}
