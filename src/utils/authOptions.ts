import CredentialsProvider from 'next-auth/providers/credentials';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import db from '@/utils/db';
import bcrypt from 'bcrypt';

export const authOptions = {
    pages: {
        // signIn: '/auth/login',
        newUser: '/auth.ts/new-user', // New users will be directed here on first sign in (leave the property out if not of interest)
    },
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
                    select: {
                        username: true,
                        password: true,
                        login_level: true,
                    },
                    where: {
                        username: String(credentials?.username).trim(),
                    },
                });

                // 패스워드 체크
                const compare_password = await bcrypt.compare(
                    String(credentials?.password!).trim(),
                    exUser?.password!,
                );

                if (compare_password) {
                    return {
                        username: exUser?.username,
                        login_level: exUser?.login_level,
                    } as any;
                }

                return null; // status == 401 권한에러
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, admin, profile, user }: any) {
            if (user) {
                token = { ...token, ...user };
            }

            const exUser = await db.user.findUnique({
                select: {
                    username: true,
                    login_level: true,
                },
                where: {
                    username: token?.username,
                    password: token?.password,
                },
            });

            if (exUser) token = exUser;
            else if (!exUser) token = null;

            return token;
        },
        async session({ session, token }: { session: Session; token: JWT }) {
            session.user = token;
            return session;
        },
    },
};
