'use server';
import 'server-only';
import db from '@/utils/db';
import {
    CommentFormTypes,
    PostFormTypes,
    PostModifyFormTypes,
} from '@/types/posts/type';
import * as process from 'process';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NumberArg, StringArg } from '@/types/type';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

// 게시글 조회
export const getPostList = async (
    page: NumberArg,
    take: NumberArg,
    search: StringArg,
) => {
    const [postList, postCount] = await Promise.all([
        db.post.findMany({
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
        db.post.count({
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
    return db.post.findUnique({
        where: {
            idx: idx,
            published: true,
        },
    });
};

// 조회수 증가
export const setViews = async (idx: NumberArg) => {
    const res = await db.post.update({
        where: { idx: idx, published: true },
        data: { views: { increment: 1 } },
    });

    revalidatePath(`/posts`);
    revalidatePath(`/posts/${idx}`);
    return res;
};

// 게시글 생성 (useForm)
export const newPost = async (formData: PostFormTypes) => {
    const session = await getServerSession(authOptions);
    const { title, content } = formData;
    const res = await db.post.create({
        data: {
            author: session?.user.username!,
            title: String(title).trim(),
            content: String(content).trim(),
        },
    });
    revalidatePath(`/posts`);
    revalidatePath(`/posts/${res.idx}`);
    redirect('/posts');
};

// 게시글 수정
export const modifyPost = async (formData: PostModifyFormTypes) => {
    const { idx, title, content } = formData;
    await db.post.update({
        where: {
            idx: idx,
            published: true,
        },
        data: {
            title: String(title).trim(),
            content: String(content).trim(),
        },
    });
    revalidatePath(`/posts`);
    revalidatePath(`/posts/${idx}`);
    redirect(`/posts/${idx}`);
};

// 게시글 삭제
export const deletePost = async (idx: NumberArg) => {
    await db.post.update({
        where: {
            idx: Number(idx),
            published: true,
        },
        data: {
            published: false,
        },
    });
    revalidatePath(`/posts`);
    revalidatePath(`/posts/${idx}`);
    redirect(`/posts`);
};

// 댓글 생성
export const newComment = async (formData: CommentFormTypes) => {
    const session = await getServerSession(authOptions);
    const { post_id, content } = formData;

    await db.comment.create({
        data: {
            post_id: post_id,
            author: session?.user.username!,
            content: content.trim(),
        },
    });
    revalidatePath(`/posts/${post_id}`);
};

// 댓글 목록
export const getCommentList = async (
    post_id: NumberArg,
    page: NumberArg,
    take: NumberArg,
) => {
    const [commentList, commentCount] = await Promise.all([
        db.comment.findMany({
            where: {
                post_id: post_id,
                published: true,
            },
            take: take,
            skip: take * (page - 1),
            orderBy: { idx: 'desc' },
        }),
        db.comment.count({
            where: {
                post_id: post_id,
            },
        }),
    ]);

    return { commentList, commentCount };
};
