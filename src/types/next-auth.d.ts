import { NextAuth } from 'next-auth';

declare module 'next-auth' {
    interface Session {
        user: {
            username: string;
        };
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        username: string;
    }
}
