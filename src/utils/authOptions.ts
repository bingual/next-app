import CredentialsProvider from 'next-auth/providers/credentials';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import db from '@/utils/db';

export const authOptions = {
    // pages: {
    //     signIn: '/',
    //     newUser: '/auth.ts/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
    // },
    session: {
        maxAge: 30 * 60,
    },
    jwt: {
        maxAge: 30 * 60,
    },
    providers: [
        CredentialsProvider({
            id: 'credential',
            name: 'credential',
            type: 'credentials',
            credentials: {
                username: {
                    label: 'ID',
                    type: 'text',
                    placeholder: '아이디 입력',
                },
                password: {
                    label: 'PW',
                    type: 'password',
                    placeholder: '패스워드 입력',
                },
            },
            async authorize(credentials, _req) {
                const exUser = await db.user.findUnique({
                    where: {
                        username: credentials?.username!,
                        password: credentials?.password,
                    },
                });

                if (exUser) {
                    return {
                        username: exUser.username,
                    } as any;
                }

                return null; // status == 401 권한에러
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, admin, profile, user }: any) {
            if (user) {
                token = user;
            }

            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            session.user = { username: token.username };
            return session;
        },
    },
};
