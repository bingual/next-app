'use server';
import 'server-only';
import process from 'process';
import { SignupFormTypes } from '@/types/auth/type';
import db from '@/utils/db';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export const signup = async (formData: SignupFormTypes) => {
    const { username, password } = formData;

    const exUser = await db.user.findUnique({
        where: {
            username: username,
        },
    });

    if (exUser) {
        return { UQ_user: '이미 존재하는 아이디입니다.' };
    }

    return db.user.create({
        data: {
            username: username,
            password: password,
        },
    });
};
