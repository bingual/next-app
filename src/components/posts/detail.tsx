'use client';
import moment from 'moment-timezone';
import Link from 'next/link';
import { Post } from '@prisma/client';
import { useSession } from 'next-auth/react';
import { deletePost } from '@/server_action/posts';

export default function PostDetailComponent({ post }: { post: Post }) {
    const { data: session, status } = useSession();

    const {
        idx,
        author,
        title,
        content,
        recommended,
        created_at,
        views,
        state,
    } = post!;

    return (
        <>
            <div className={'pb-8 lg:pb-16'}>
                <div className={'flex justify-between'}>
                    <div className={'flex justify-start'}>
                        <p className="ms-5 font-light text-gray-500 sm:text-sm dark:text-gray-400">
                            {`말머리 ${
                                state === 0 ? '공지' : '일반'
                            } | 작성자 ${author} | 작성일 ${moment(created_at)
                                .tz('Asia/Seoul')
                                .utc()
                                .format('YYYY/MM/DD HH:mm')}`}
                        </p>
                    </div>
                    <div className={'flex justify-end'}>
                        <p className="me-5 font-light text-gray-500 sm:text-sm dark:text-gray-400">
                            {`조회 ${views} | 추천 ${recommended}`} |{' '}
                            {session?.user.username === author && (
                                <>
                                    <Link href={`/posts/${idx}/modify`}>
                                        수정
                                    </Link>{' '}
                                    |{' '}
                                    <button
                                        className={'text-red-500'}
                                        onClick={async () => {
                                            const valid =
                                                confirm(
                                                    '게시글을 정말 삭제 하시겠습니까?',
                                                );
                                            valid &&
                                                (await deletePost(Number(idx)));
                                        }}
                                    >
                                        삭제
                                    </button>
                                </>
                            )}
                        </p>
                    </div>
                </div>
                <div className="mx-auto max-w-screen-sm text-center ">
                    <h2 className="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                        {title}
                    </h2>
                    <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                        {content}
                    </p>
                </div>
            </div>
        </>
    );
}
