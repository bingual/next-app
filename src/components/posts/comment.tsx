'use client';

import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { CommentFormTypes, CommentPropsTypes } from '@/types/posts/type';
import moment from 'moment-timezone';
import Link from 'next/link';
import PostPagination from '@/components/posts/pagination';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { newComment } from '@/server_action/posts';

export default async function PostComment({
    page,
    take,
    commentList,
    commentCount,
}: CommentPropsTypes) {
    const { register, handleSubmit, reset } = useForm<CommentFormTypes>();
    const { slug } = useParams();
    const { data: session, status } = useSession();

    const onValid: SubmitHandler<CommentFormTypes> = async (formData) => {
        formData.post_id = Number(slug);
        await newComment(formData);
        reset();
    };

    const onInValid: SubmitErrorHandler<CommentFormTypes> = (e) => {
        const [content] = [e?.content];
        if (content) return alert(content.message);
    };

    return (
        <>
            <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                        댓글 ({commentCount})
                    </h2>
                </div>
                <form
                    onSubmit={handleSubmit(onValid, onInValid)}
                    className="mb-6"
                >
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                        <label htmlFor="comment" className="sr-only">
                            Your comment
                        </label>
                        <textarea
                            {...register('content', {
                                required: {
                                    value: true,
                                    message: '내용은 필수 입력 사항 입니다.',
                                },
                                minLength: {
                                    value: 3,
                                    message: '내용은 3글자 이상 입력 해주세요.',
                                },
                                pattern: {
                                    value: /\S/g,
                                    message: '공백만은 허용 되지 않습니다.',
                                },
                            })}
                            id="comment"
                            rows={6}
                            className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                            placeholder="댓글 내용을 입력하세요..."
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                    >
                        댓글 작성
                    </button>
                </form>
                {commentList.map((res) => {
                    return (
                        <article
                            key={res.idx}
                            className="p-6 mb-3 text-base bg-white border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                        >
                            <footer className="flex justify-between items-center mb-2">
                                <div className="flex items-center">
                                    <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                                        {/*<img*/}
                                        {/*    className="mr-2 w-6 h-6 rounded-full"*/}
                                        {/*    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"*/}
                                        {/*    alt="Michael Gough"*/}
                                        {/*/>*/}
                                        {res.author}
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {moment(res.created_at)
                                            .tz('Asia/Seoul')
                                            .utc()
                                            .format('YYYY/MM/DD HH:mm')}
                                    </p>
                                </div>
                                {session?.user.username === res.author && (
                                    <button
                                        id="dropdownComment1Button"
                                        data-dropdown-toggle={`dropdownComment${res.idx}`}
                                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                        type="button"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="currentColor"
                                            viewBox="0 0 16 3"
                                        >
                                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                        </svg>
                                        <span className="sr-only">
                                            Comment settings
                                        </span>
                                    </button>
                                )}

                                {/*Dropdown menu*/}
                                {}
                                <div
                                    id={`dropdownComment${res.idx}`}
                                    className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                                >
                                    <ul
                                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                        aria-labelledby="dropdownMenuIconHorizontalButton"
                                    >
                                        <li>
                                            <Link
                                                href="#"
                                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                수정
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="#"
                                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                삭제
                                            </Link>
                                        </li>

                                        {/*<li>*/}
                                        {/*    <Link*/}
                                        {/*        href="#"*/}
                                        {/*        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"*/}
                                        {/*    >*/}
                                        {/*        Report*/}
                                        {/*    </Link>*/}
                                        {/*</li>*/}
                                    </ul>
                                </div>
                            </footer>
                            <p className="text-gray-500 dark:text-gray-400">
                                {res.content}
                            </p>
                            <div className="flex items-center mt-4 space-x-4">
                                <button
                                    type="button"
                                    className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                                >
                                    <svg
                                        className="mr-1.5 w-3.5 h-3.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 18"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                                        />
                                    </svg>
                                    Reply
                                </button>
                            </div>
                        </article>
                    );
                })}

                {/*<article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">*/}
                {/*    <footer className="flex justify-between items-center mb-2">*/}
                {/*        <div className="flex items-center">*/}
                {/*            <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">*/}
                {/*                <img*/}
                {/*                    className="mr-2 w-6 h-6 rounded-full"*/}
                {/*                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"*/}
                {/*                    alt="Jese Leos"*/}
                {/*                />*/}
                {/*                Jese Leos*/}
                {/*            </p>*/}
                {/*            <p className="text-sm text-gray-600 dark:text-gray-400">*/}
                {/*                <time*/}
                {/*                    dateTime="2022-02-12"*/}
                {/*                    title="February 12th, 2022"*/}
                {/*                >*/}
                {/*                    Feb. 12, 2022*/}
                {/*                </time>*/}
                {/*            </p>*/}
                {/*        </div>*/}
                {/*        <button*/}
                {/*            id="dropdownComment2Button"*/}
                {/*            data-dropdown-toggle="dropdownComment2"*/}
                {/*            className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-40 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"*/}
                {/*            type="button"*/}
                {/*        >*/}
                {/*            <svg*/}
                {/*                className="w-4 h-4"*/}
                {/*                aria-hidden="true"*/}
                {/*                xmlns="http://www.w3.org/2000/svg"*/}
                {/*                fill="currentColor"*/}
                {/*                viewBox="0 0 16 3"*/}
                {/*            >*/}
                {/*                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />*/}
                {/*            </svg>*/}
                {/*            <span className="sr-only">*/}
                {/*                Comment settings*/}
                {/*            </span>*/}
                {/*        </button>*/}
                {/*Dropdown menu*/}
                {/*        <div*/}
                {/*            id="dropdownComment2"*/}
                {/*            className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"*/}
                {/*        >*/}
                {/*            <ul*/}
                {/*                className="py-1 text-sm text-gray-700 dark:text-gray-200"*/}
                {/*                aria-labelledby="dropdownMenuIconHorizontalButton"*/}
                {/*            >*/}
                {/*                <li>*/}
                {/*                    <Link*/}
                {/*                        href="#"*/}
                {/*                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"*/}
                {/*                    >*/}
                {/*                        Edit*/}
                {/*                    </Link>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <Link*/}
                {/*                        href="#"*/}
                {/*                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"*/}
                {/*                    >*/}
                {/*                        Remove*/}
                {/*                    </Link>*/}
                {/*                </li>*/}
                {/*                <li>*/}
                {/*                    <Link*/}
                {/*                        href="#"*/}
                {/*                        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"*/}
                {/*                    >*/}
                {/*                        Report*/}
                {/*                    </Link>*/}
                {/*                </li>*/}
                {/*            </ul>*/}
                {/*        </div>*/}
                {/*    </footer>*/}
                {/*    <p className="text-gray-500 dark:text-gray-400">*/}
                {/*        Much appreciated! Glad you liked it ☺️*/}
                {/*    </p>*/}
                {/*    <div className="flex items-center mt-4 space-x-4">*/}
                {/*        <button*/}
                {/*            type="button"*/}
                {/*            className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"*/}
                {/*        >*/}
                {/*            <svg*/}
                {/*                className="mr-1.5 w-3.5 h-3.5"*/}
                {/*                aria-hidden="true"*/}
                {/*                xmlns="http://www.w3.org/2000/svg"*/}
                {/*                fill="none"*/}
                {/*                viewBox="0 0 20 18"*/}
                {/*            >*/}
                {/*                <path*/}
                {/*                    stroke="currentColor"*/}
                {/*                    strokeLinecap="round"*/}
                {/*                    strokeLinejoin="round"*/}
                {/*                    strokeWidth="2"*/}
                {/*                    d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"*/}
                {/*                />*/}
                {/*            </svg>*/}
                {/*            Reply*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*</article>*/}
            </div>

            {commentList.length > 0 && (
                <PostPagination
                    page={page}
                    take={take}
                    count={commentCount}
                    search={''}
                />
            )}
        </>
    );
}
