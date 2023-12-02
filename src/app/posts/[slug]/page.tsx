import { ResolvingMetadata } from 'next';
import { Props } from '@/types/posts/type';
import { redirect } from 'next/navigation';
import { getPost, setViews } from '@/server_action/posts';

// 동적 메타 데이터 설정
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata,
) {
    const { slug } = params;
    if (!/^\d*$/g.test(String(slug))) {
        return {};
    }

    const post = await getPost(slug);

    return {
        title: post?.title,
    };
}

export default async function PostDetail({
    params,
}: {
    params: { slug: string };
}) {
    const { slug } = params;
    if (!/^\d*$/g.test(String(slug))) {
        return redirect('/posts');
    }

    const post = await getPost(slug);
    await setViews(slug);

    if (!post) {
        return redirect('/posts');
    }

    return (
        <>
            <h1>{slug} 번 게시글</h1>
            <div key={post?.idx}>
                번호: {post?.idx} | 작성자: {post?.author} | 제목: {post?.title}{' '}
                | 내용: {post?.content}
            </div>
        </>
    );
}
