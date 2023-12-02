import { z } from 'zod';

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

const PaginationTypes = z.object({
    page: z.number(),
    take: z.number(),
    count: z.number(),
    search: z.string(),
});

type PaginationTypes = z.infer<typeof PaginationTypes>;

const SearchTypes = z.object({
    search: z.string(),
});

type SearchTypes = z.infer<typeof SearchTypes>;
