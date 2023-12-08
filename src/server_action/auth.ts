'use server';
import 'server-only';
import process from 'process';
import { SignupFormTypes } from '@/types/auth/type';
import { db_accelerate } from '@/utils/db_accelerate';
import bcrypt from 'bcrypt';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export const signup = async (formData: SignupFormTypes) => {
    const { username, password, confirmPassword } = formData;

    const exUser = !!(await db_accelerate.user.findUnique({
        select: {
            username: true,
        },
        where: {
            username: username,
        },
    }));

    if (exUser || password !== confirmPassword) {
        const UQ_user = exUser ? '이미 존재하는 아이디입니다.' : null;
        const EQ_password =
            password !== confirmPassword
                ? '비밀번호와 비밀번호 확인이 일치 하지않습니다.'
                : null;
        return { UQ_user, EQ_password };
    }
    // 패스워드
    const saltRound = 10; // 패스워드 자리수
    const salt = await bcrypt.genSalt(saltRound); // 패스워드 생성
    const hashedPassword = await bcrypt.hash(password.trim(), salt); // 패스워드 패턴

    return db_accelerate.user.create({
        data: {
            username: username,
            password: hashedPassword,
        },
    });
};
