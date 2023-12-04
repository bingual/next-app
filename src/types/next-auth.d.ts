import { NextAuth } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            username: string;
            login_level: number;
        };
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        username: string;
        login_level: number;
    }
}
