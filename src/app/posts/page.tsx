import { getPostList } from '@/server_action/posts';
import { Props } from '@/types/posts/type';
import PostPagination from '@/components/posts/pagination';
import { Metadata } from 'next';
import PostListComponent from '@/components/posts/list';

export const metadata: Metadata = {
    title: '게시글 목록',
};

export default async function PostList({ params, searchParams }: Props) {
    const { page = 1, take = 10, search = '' } = searchParams;
    const { postList, postCount } = await getPostList(
        Number(page),
        Number(take),
        String(search),
    );

    return (
        <>
            <PostListComponent postList={postList} search={String(search)} />
            {postList.length > 0 && (
                <PostPagination
                    page={Number(page)}
                    take={Number(take)}
                    count={Number(postCount)}
                    search={String(search)}
                />
            )}
        </>
    );
}
