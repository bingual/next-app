'use server';
import 'server-only';
import db from '@/utils/db';
import { PostFormTypes } from '@/types/posts/type';
import * as process from 'process';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

// 게시글 조회
export const getPostList = async (page: number, take: number) => {
    const [postList, postCount] = await Promise.all([
        db.post.findMany({
            take: take,
            skip: take * (page - 1),
            orderBy: { idx: 'desc' },
        }),
        db.post.count(),
    ]);

    return { postList, postCount };
};

// 게시글 상세
export const getPost = async (slug: string) => {
    return db.post.findUnique({
        where: {
            idx: Number(slug),
        },
    });
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
    revalidatePath(`/posts/${res.idx}`);
    revalidatePath(`/posts`);
    redirect('/posts');
};
