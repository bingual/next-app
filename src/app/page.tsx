'use client';

import { useSession } from 'next-auth/react';

export default function Home() {
    const { data: session, status } = useSession();
    return (
        <>
            <p className={"text-primary-950 font-['Roboto']"}>폰트 테스트</p>
            {status === 'authenticated' && (
                <h3>{session?.user.username} 님 환영 합니다.</h3>
            )}
        </>
    );
}
