import { NextAuth } from 'next-auth';
import { Provider } from '@prisma/client';

declare module 'next-auth' {
    interface Session {
        user: {
            username: string;
            name: string;
            password: string;
            provider: Provider;
            avatar: string;
            login_level: number;
        };
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        username: string;
        name: string;
        password: string;
        provider: Provider;
        avatar: string;
        login_level: number;
    }
}
