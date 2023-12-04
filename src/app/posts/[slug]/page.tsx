import { ResolvingMetadata } from 'next';
import { Props } from '@/types/posts/type';
import { redirect } from 'next/navigation';
import { getCommentList, getPost } from '@/server_action/posts';
import PostComment from '@/components/posts/comment';
import PostDetailComponent from '@/components/posts/detail';

// 동적 메타 데이터 설정
export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata,
) {
    const { slug } = params;
    if (!/^\d*$/g.test(String(slug))) {
        return {};
    }

    const post = await getPost(Number(slug));

    return {
        title: post?.title,
    };
}

export default async function PostDetail({ params, searchParams }: Props) {
    const { page = 1, take = 10, search = '' } = searchParams;
    const { slug } = params;

    if (!/^\d*$/g.test(String(slug))) {
        return redirect('/posts');
    }

    const post = await getPost(Number(slug));
    const { commentList, commentCount } = await getCommentList(
        Number(slug),
        Number(page),
        Number(take),
    );

    if (!post) {
        return redirect('/posts');
    }

    return (
        <>
            <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
                <PostDetailComponent post={post} />
                <PostComment
                    page={Number(page)}
                    take={Number(take)}
                    commentList={commentList}
                    commentCount={commentCount}
                />
            </section>
        </>
    );
}
