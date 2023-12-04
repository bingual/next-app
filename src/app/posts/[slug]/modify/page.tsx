import { Props } from '@/types/posts/type';
import { getPost } from '@/server_action/posts';
import PostModifyComponent from '@/components/posts/modify';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: '게시글 수정',
};

export default async function PostModify({ params, searchParams }: Props) {
    const { slug } = params;

    if (!/^\d*$/g.test(String(slug))) {
        return redirect('/posts');
    }

    const post = await getPost(Number(slug));
    const session = await getServerSession(authOptions);

    if (session?.user.username !== post?.author) {
        return redirect('/posts');
    }

    return (
        <>
            <PostModifyComponent post={post} />
        </>
    );
}
