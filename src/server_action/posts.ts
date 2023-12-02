'use server';
import 'server-only';
import db from '@/utils/db';
import { PostFormTypes } from '@/types/posts/type';
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
            },
        }),
    ]);

    return { postList, postCount };
};

// 게시글 상세
export const getPost = async (slug: StringArg) => {
    return db.post.findUnique({
        where: {
            idx: Number(slug),
        },
    });
};

// 조회수 증가
export const setViews = async (slug: StringArg) => {
    const res = await db.post.update({
        where: { idx: Number(slug) },
        data: { views: { increment: 1 } },
    });

    revalidatePath('/posts');
    revalidatePath(`/posts/${slug}`);
    return res;
};

// 게시글 생성 (formAction)
// export const newPost = async (form: FormData) => {
//     const session = await getServerSession(authOptions.ts);
//     const [title, content] = [form.get('author'), form.get('title')];
//     const result = await db.post.create({
//         data: {
//             author: session?.user.username!,
//             title: String(title).trim(),
//             content: String(content).trim(),
//         },
//     });
//     return redirect(`${API_HOST}/posts/${result.idx}`);
// };

// 게시글 생성 (useForm)
export const newPostHook = async (formData: PostFormTypes) => {
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
