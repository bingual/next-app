'use server';
import 'server-only';
import { db_accelerate } from '@/utils/db_accelerate';
import {
    CommentFormTypes,
    PostFormTypes,
    PostModifyFormTypes,
} from '@/types/posts/type';
import * as process from 'process';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';
import { NumberArg, StringArg } from '@/types/type';
import { revalidatePath } from 'next/cache';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

// 게시글 조회
export const getPostList = async (
    page: NumberArg,
    take: NumberArg,
    search: StringArg,
) => {
    const [postList, postCount] = await Promise.all([
        db_accelerate.post.findMany({
            where: {
                title: {
                    contains: search,
                },
                published: true,
            },
            take: take,
            skip: take * (page - 1),
            orderBy: { idx: 'desc' },
        }),
        db_accelerate.post.count({
            where: {
                title: {
                    contains: search,
                },
                published: true,
            },
        }),
    ]);

    return { postList, postCount };
};

// 게시글 상세
export const getPost = async (idx: NumberArg) => {
    return db_accelerate.post.findUnique({
        where: {
            idx: idx,
            published: true,
        },
        cacheStrategy: {
            swr: 2,
        },
    });
};

// 조회수 증가
export const setViews = async (idx: NumberArg) => {
    await db_accelerate.post.update({
        where: { idx: idx, published: true },
        data: { views: { increment: 1 } },
    });
    revalidatePath(`/posts`);
    revalidatePath(`/posts/${idx}`);
};

// 게시글 생성 (useForm)
export const newPost = async (formData: PostFormTypes) => {
    const session = await getServerSession(authOptions);
    const { title, content } = formData;
    await db_accelerate.post.create({
        data: {
            author: session?.user.username!,
            title: String(title).trim(),
            content: String(content).trim(),
        },
    });
    revalidatePath(`/posts`);
    redirect('/posts');
};

// 게시글 수정
export const modifyPost = async (formData: PostModifyFormTypes) => {
    const { idx, title, content } = formData;
    await db_accelerate.post.update({
        where: {
            idx: idx,
            published: true,
        },
        data: {
            title: String(title).trim(),
            content: String(content).trim(),
        },
    });
    revalidatePath(`/posts/${idx}`);
    revalidatePath(`/posts/${idx}/modify`);
    redirect(`/posts/${idx}`);
};

// 게시글 삭제
export const deletePost = async (idx: NumberArg) => {
    await db_accelerate.post.update({
        where: {
            idx: Number(idx),
            published: true,
        },
        data: {
            published: false,
        },
    });
    revalidatePath(`/posts`);
    redirect(`/posts`);
};

// 댓글 목록
export const getCommentList = async (
    post_id: NumberArg,
    page: NumberArg,
    take: NumberArg,
) => {
    const [commentList, commentCount] = await Promise.all([
        db_accelerate.comment.findMany({
            where: {
                post_id: post_id,
                published: true,
            },
            take: take,
            skip: take * (page - 1),
            orderBy: { idx: 'desc' },
        }),
        db_accelerate.comment.count({
            where: {
                post_id: post_id,
            },
        }),
    ]);

    return { commentList, commentCount };
};

// 댓글 생성
export const newComment = async (formData: CommentFormTypes) => {
    const session = await getServerSession(authOptions);
    const { post_id, content } = formData;

    await db_accelerate.comment.create({
        data: {
            post_id: post_id,
            author: session?.user.username!,
            content: content.trim(),
        },
    });
    revalidatePath(`/posts/${post_id}`);
};
