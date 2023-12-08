'use client';

import { useSession } from 'next-auth/react';

export default function Home() {
    const { data: session, status } = useSession();
    return (
        <>
            {status === 'authenticated' && (
                <>
                    <img
                        src={session?.user.avatar!}
                        alt={'...avatar'}
                        width={100}
                        height={100}
                    />
                    <h3>{session?.user.username} 님 환영 합니다.</h3>
                </>
            )}
        </>
    );
}
