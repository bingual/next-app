import { z } from 'zod';
import { Comment } from '@prisma/client';

const Props = z.object({
    params: z.object({
        slug: z.string(),
    }),
    searchParams: z.record(
        z.union([z.string(), z.array(z.string())]).or(z.undefined()),
    ),
});

type Props = z.infer<typeof Props>;

const PostFormTypes = z.object({
    title: z.string(),
    content: z.string(),
});

type PostFormTypes = z.infer<typeof PostFormTypes>;

const PostModifyFormTypes = z.object({
    idx: z.number(),
    title: z.string(),
    content: z.string(),
});

type PostModifyFormTypes = z.infer<typeof PostModifyFormTypes>;

const PaginationPropsTypes = z.object({
    page: z.number(),
    take: z.number(),
    count: z.number(),
    search: z.string(),
});

type PaginationPropsTypes = z.infer<typeof PaginationPropsTypes>;

const SearchFormTypes = z.object({
    search: z.string(),
});

type SearchFormTypes = z.infer<typeof SearchFormTypes>;

const CommentFormTypes = z.object({
    post_id: z.number(),
    content: z.string(),
});

type CommentFormTypes = z.infer<typeof CommentFormTypes>;

type CommentPropsTypes = {
    page: number;
    take: number;
    commentList: Comment[];
    commentCount: number;
};
