'use client';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { SignupFormTypes } from '@/types/auth/type';
import { signup } from '@/server_action/auth';
import { useRouter } from 'next/navigation';

export default function PostCreate() {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm<SignupFormTypes>();

    const onValid: SubmitHandler<SignupFormTypes> = async (formData) => {
        const res = await signup(formData);

        if ('UQ_user' in res) {
            alert(res.UQ_user);
        } else {
            alert('회원가입 완료.');
            reset();
            router.push('/');
        }
    };

    const onInValid: SubmitErrorHandler<SignupFormTypes> = (e) => {
        e.username && alert(e.username?.message);
        e.password && alert(e.password?.message);
    };

    return (
        <>
            <h1>회원가입</h1>
            <form onSubmit={handleSubmit(onValid, onInValid)}>
                아이디 :{' '}
                <input
                    {...register('username', {
                        required: {
                            value: true,
                            message: '아이디는 필수 입력 사항입니다.',
                        },
                    })}
                    type="text"
                />
                비밀번호 :{' '}
                <input
                    {...register('password', {
                        required: {
                            value: true,
                            message: '비밀번호는 필수 입력 사항입니다.',
                        },
                    })}
                    type={'password'}
                />
                <button type={'submit'}>회원가입</button>
            </form>
        </>
    );
}
