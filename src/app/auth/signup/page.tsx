'use client';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { SignupFormTypes } from '@/types/auth/type';
import { signup } from '@/server_action/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthSignup() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        setError,
    } = useForm<SignupFormTypes>();

    const onValid: SubmitHandler<SignupFormTypes> = async (formData) => {
        const res = await signup(formData);

        if ('UQ_user' in res) {
            res.UQ_user &&
                setError('username', {
                    type: 'UQ_user',
                    message: String(res.UQ_user),
                });
            res.EQ_password &&
                setError('confirmPassword', {
                    type: 'EQ_password',
                    message: String(res.EQ_password),
                });
        } else {
            alert('회원가입 완료.');
            router.push('/');
            reset();
        }
    };

    const onInValid: SubmitErrorHandler<SignupFormTypes> = (e) => {
        console.error(e);
    };

    return (
        <>
            <title>회원가입</title>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <Link
                        href={'/'}
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
                                회원가입
                            </h1>
                            <form
                                onSubmit={handleSubmit(onValid, onInValid)}
                                className="space-y-4 md:space-y-6"
                            >
                                <div>
                                    <label
                                        htmlFor="Username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        아이디
                                    </label>
                                    <input
                                        {...register('username', {
                                            required: {
                                                value: true,
                                                message:
                                                    '아이디는 필수 입력 사항 입니다.',
                                            },
                                            minLength: {
                                                value: 4,
                                                message:
                                                    '아이디는 4글자 이상 입력 해주세요.',
                                            },
                                            pattern: {
                                                value: /\S/g,
                                                message:
                                                    '공백은 허용 되지 않습니다.',
                                            },
                                        })}
                                        type="text"
                                        id="Username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="username..."
                                    />
                                    <div className={'my-3 '}>
                                        <span className={'text-red-600'}>
                                            {errors?.username?.message}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        비밀번호
                                    </label>
                                    <input
                                        {...register('password', {
                                            required: {
                                                value: true,
                                                message:
                                                    '패스워드는 필수 입력 사항입니다.',
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{7,14}\S$/g,
                                                message:
                                                    '공백을 제외한 영문 숫자 특수기호 조합 8자리 이상.',
                                            },
                                        })}
                                        type="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    <div className={'my-3 '}>
                                        <span className={'text-red-600'}>
                                            {errors?.password?.message}
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        비밀번호 확인
                                    </label>
                                    <input
                                        {...register('confirmPassword', {
                                            required: {
                                                value: true,
                                                message:
                                                    '패스워드는 필수 입력 사항입니다.',
                                            },
                                            pattern: {
                                                value: /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{7,14}\S$/g,
                                                message:
                                                    '공백을 제외한 영문 숫자 특수기호 조합 8자리 이상.',
                                            },
                                        })}
                                        type="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                    <div className={'my-3 '}>
                                        <span className={'text-red-600'}>
                                            {errors?.confirmPassword?.message}
                                        </span>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    회원가입
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    이미 계정이 있습니까?{' '}
                                    <Link
                                        href={`/auth/login`}
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                    >
                                        로그인
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
