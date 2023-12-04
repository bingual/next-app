'use client';
import Link from 'next/link';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { LoginFormTypes } from '@/types/auth/type';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function AuthLogin() {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm<LoginFormTypes>();

    const onValid: SubmitHandler<LoginFormTypes> = async (formData) => {
        const { username, password } = formData;
        const res = await signIn('credential', {
            username,
            password,
            redirect: false,
        });

        res?.status === 401 && alert('로그인 정보가 일치 하지 않습니다.');

        if (res?.status === 200) {
            router.push('/');
            reset();
        }
    };

    const onInValid: SubmitErrorHandler<LoginFormTypes> = (e) => {};

    return (
        <>
            <title>로그인</title>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link
                        href="/"
                        className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                    >
                        <img
                            className="w-8 h-8 mr-2"
                            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                            alt="logo"
                        />
                        Adora
                    </Link>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                로그인
                            </h1>
                            <form
                                onSubmit={handleSubmit(onValid, onInValid)}
                                className="space-y-4 md:space-y-6"
                            >
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        아이디
                                    </label>
                                    <input
                                        {...register('username')}
                                        type="username"
                                        id="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="username"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        비밀번호
                                    </label>
                                    <input
                                        {...register('password')}
                                        type="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-start">
                                        <div className="flex items-center h-5">
                                            <input
                                                {...register('remember')}
                                                id="remember"
                                                aria-describedby="remember"
                                                type="checkbox"
                                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm">
                                            <label
                                                htmlFor="remember"
                                                className="text-gray-500 dark:text-gray-300"
                                            >
                                                자동 로그인
                                            </label>
                                        </div>
                                    </div>
                                    <Link
                                        href="#"
                                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        비밀번호 찾기
                                    </Link>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    로그인
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    계정이 없으신가요?{' '}
                                    <Link
                                        href={'/auth/signup'}
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        회원가입
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
