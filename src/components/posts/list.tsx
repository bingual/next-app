'use client';
import PostSearch from '@/components/posts/search';
import Link from 'next/link';
import moment from 'moment-timezone';
import { Post } from '@prisma/client';
import { StringArg } from '@/types/type';
import { setViews } from '@/server_action/posts';
import { useSession } from 'next-auth/react';

export default function PostListComponent({
    postList,
    search,
}: {
    postList: Post[];
    search: StringArg;
}) {
    const { data: session, status } = useSession();

    return (
        <>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                    <div>
                        <button
                            id="dropdownRadioButton"
                            data-dropdown-toggle="dropdownRadio"
                            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                        >
                            <svg
                                className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                            </svg>
                            Last 30 days
                            <svg
                                className="w-2.5 h-2.5 ms-2.5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 10 6"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 4 4 4-4"
                                />
                            </svg>
                        </button>
                        {/*Dropdown menu*/}
                        <div
                            id="dropdownRadio"
                            className="dropdown_radio z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                            data-popper-reference-hidden=""
                            data-popper-escaped=""
                            data-popper-placement="top"
                        >
                            <ul
                                className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownRadioButton"
                            >
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input
                                            id="filter-radio-example-1"
                                            type="radio"
                                            value=""
                                            name="filter-radio"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="filter-radio-example-1"
                                            className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                        >
                                            Last day
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input
                                            defaultChecked={false}
                                            id="filter-radio-example-2"
                                            type="radio"
                                            value=""
                                            name="filter-radio"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="filter-radio-example-2"
                                            className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                        >
                                            Last 7 days
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input
                                            id="filter-radio-example-3"
                                            type="radio"
                                            value=""
                                            name="filter-radio"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="filter-radio-example-3"
                                            className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                        >
                                            Last 30 days
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input
                                            id="filter-radio-example-4"
                                            type="radio"
                                            value=""
                                            name="filter-radio"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="filter-radio-example-4"
                                            className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                        >
                                            Last month
                                        </label>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input
                                            id="filter-radio-example-5"
                                            type="radio"
                                            value=""
                                            name="filter-radio"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label
                                            htmlFor="filter-radio-example-5"
                                            className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                        >
                                            Last year
                                        </label>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <PostSearch search={String(search)} />
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input
                                        id="checkbox-all-search"
                                        type="checkbox"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="checkbox-all-search"
                                        className="sr-only"
                                    >
                                        checkbox
                                    </label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                번호
                            </th>
                            <th scope="col" className="px-6 py-3">
                                말머리
                            </th>
                            <th scope="col" className="px-6 py-3">
                                제목
                            </th>
                            <th scope="col" className="px-6 py-3">
                                글쓴이
                            </th>
                            <th scope="col" className="px-6 py-3">
                                작성일
                            </th>
                            <th scope="col" className="px-6 py-3">
                                조회
                            </th>
                            <th scope="col" className="px-6 py-3">
                                추천
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {postList.map((res, idx) => {
                            return (
                                <tr
                                    key={res.idx}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input
                                                id="checkbox-table-search-1"
                                                type="checkbox"
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                htmlFor="checkbox-table-search-1"
                                                className="sr-only"
                                            >
                                                checkbox
                                            </label>
                                        </div>
                                    </td>
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        {res.idx}
                                    </th>
                                    <td className="px-6 py-4">
                                        {res.state === 0 ? '공지' : '일반'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link
                                            onClick={async () => {
                                                await setViews(Number(res.idx));
                                            }}
                                            href={`/posts/${res.idx}`}
                                        >
                                            {res.title}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4">{res.author}</td>
                                    <td className="px-6 py-4">
                                        {moment(res.created_at)
                                            .tz('Asia/Seoul')
                                            .utc()
                                            .format('YYYY/MM/DD HH:mm')}
                                    </td>
                                    <td className="px-6 py-4">{res.views}</td>
                                    <td className="px-6 py-4">
                                        {res.recommended}
                                    </td>
                                    {/*<td className="px-6 py-4">*/}
                                    {/*    <a*/}
                                    {/*        href="#"*/}
                                    {/*        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"*/}
                                    {/*    >*/}
                                    {/*        Edit*/}
                                    {/*    </a>*/}
                                    {/*</td>*/}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {session && (
                <div className={'mt-3 flex justify-end'}>
                    <Link
                        href={'/posts/create'}
                        className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                    >
                        글쓰기
                    </Link>
                </div>
            )}
        </>
    );
}
