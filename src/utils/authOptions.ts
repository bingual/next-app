import CredentialsProvider from 'next-auth/providers/credentials';
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import db from '@/utils/db';
import bcrypt from 'bcrypt';
import { StringArg } from '@/types/type';
import { Provider } from '@prisma/client';

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
                const exUser = await db.user.findFirst({
                    select: {
                        username: true,
                        password: true,
                        name: true,
                        provider: true,
                        avatar: true,
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
                        name: exUser?.name,
                        provider: exUser?.provider,
                        avatar: exUser?.avatar,
                        login_level: exUser?.login_level,
                    } as any;
                }

                return null; // status == 401 권한에러
            },
        }),
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID!,
            clientSecret: process.env.KAKAO_CLIENT_SECRET!,
        }),
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID!,
            clientSecret: process.env.NAVER_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        async jwt({ token, account, admin, profile, user }: any) {
            if (account?.provider === 'kakao') {
                const {
                    email,
                    name,
                    picture,
                }: { email: StringArg; name: StringArg; picture: StringArg } =
                    token;

                const exUser = await db.user.findFirst({
                    select: {
                        username: true,
                        name: true,
                        provider: true,
                        avatar: true,
                        login_level: true,
                    },
                    where: {
                        username: token?.email,
                        provider: Provider.kakao,
                    },
                });

                if (!exUser) {
                    await db.user.create({
                        data: {
                            username: email,
                            name: name,
                            password: '',
                            provider: Provider.kakao,
                            avatar: picture,
                        },
                    });
                }

                token = { ...exUser };

                return token;
            }

            if (account?.provider === 'naver') {
                const {
                    email,
                    name,
                    picture,
                }: { email: StringArg; name: StringArg; picture: StringArg } =
                    token;

                const exUser = await db.user.findFirst({
                    select: {
                        username: true,
                        name: true,
                        provider: true,
                        avatar: true,
                        login_level: true,
                    },
                    where: {
                        username: token?.email,
                        provider: Provider.naver,
                    },
                });

                if (!exUser) {
                    await db.user.create({
                        data: {
                            username: email,
                            name: name,
                            password: '',
                            provider: Provider.naver,
                            avatar: picture,
                        },
                    });
                }

                token = { ...exUser };

                return token;
            }

            if (user) {
                token = { ...token, ...user };
            }

            const exUser = await db.user.findFirst({
                select: {
                    username: true,
                    name: true,
                    provider: true,
                    avatar: true,
                    login_level: true,
                },
                where: {
                    username: token?.username,
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
