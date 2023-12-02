import { getPostList } from '@/server_action/posts';
import Link from 'next/link';
import { Metadata } from 'next';
import { Props } from '@/types/posts/type';
import PostPagination from '@/components/posts/pagination';
import { getServerSession } from 'next-auth/next';
import moment from 'moment-timezone';
import { authOptions } from '@/utils/authOptions';

export const metadata: Metadata = {
    title: '게시글 목록',
};

export default async function PostList({ params, searchParams }: Props) {
    const { page = 1, take = 3 } = searchParams;
    const { postList, postCount } = await getPostList(
        Number(page),
        Number(take),
    );
    const session = await getServerSession(authOptions);

    return (
        <>
            <h1>게시글 목록</h1>
            {postList.length > 0 &&
                postList.map((res) => {
                    return (
                        <div key={res.idx}>
                            번호: {res.idx} | 작성자: {res.author} | 제목:
                            <Link href={`/posts/${res.idx}`}>
                                {res.title}
                            </Link>{' '}
                            | 작성일:{' '}
                            {moment(res.created_at)
                                .tz('Asia/Seoul')
                                .utc()
                                .format('YYYY-MM-DD HH:mm')}
                        </div>
                    );
                })}

            {postList.length > 0 ? (
                <PostPagination
                    page={Number(page)}
                    take={Number(take)}
                    count={Number(postCount)}
                />
            ) : (
                <div>게시글이 존재하지 않습니다.</div>
            )}
        </>
    );
}
