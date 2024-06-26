'use client';
import Pagination, { ReactJsPaginationProps } from 'react-js-pagination';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { PaginationPropsTypes } from '@/types/posts/type';

export default function PostPagination({
    page,
    take,
    count,
    search,
}: PaginationPropsTypes) {
    const router = useRouter();
    const pathname = usePathname();
    const { slug } = useParams();

    const handleOnChange: ReactJsPaginationProps['onChange'] = async (
        page: number,
    ) => {
        pathname === '/posts'
            ? router.push(`/posts?page=${page}&take=${take}&search=${search}`, {
                  scroll: false,
              })
            : router.push(
                  `/posts/${slug}/?page=${page}&take=${take}&search=${search}`,
                  {
                      scroll: false,
                  },
              );
    };

    return (
        <>
            <Pagination
                activePage={Number(page)} // 현재 페이지
                itemsCountPerPage={Number(take)} // 표시할 목록 개수
                totalItemsCount={count} // 전체 아이템 개수
                pageRangeDisplayed={5} // 페이지 번호를 몇개까지 표시할지
                onChange={handleOnChange} // 체인지 이벤트 발생시 실행할 내용
                prevPageText={'<'}
                nextPageText={'>'}
                firstPageText={'<<'}
                lastPageText={'>>'}
            />
        </>
    );
}
