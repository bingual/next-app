'use client';
import { Inter } from 'next/font/google';
import './globals.scss';
import Header from '@/components/header';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

const inter = Inter({ subsets: ['latin'] });

// export const metadata: Metadata = {
//     title: 'Next-App-Test',
//     description: '앱 라우터 테스트 하는 프로젝트',
// };

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ko">
            <body className={'mx-auto max-w-screen-xl'}>
                <SessionProvider>
                    <ThemeProvider attribute={'class'}>
                        <Header />
                        {children}
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
