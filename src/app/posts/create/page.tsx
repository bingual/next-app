'use client';
import { newPostHook } from '@/server_action/posts';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { PostFormTypes } from '@/types/posts/type';
import { useRouter } from 'next/navigation';

export default function PostCreate() {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm<PostFormTypes>();

    const onValid: SubmitHandler<PostFormTypes> = async (formData) => {
        await newPostHook(formData);
    };

    const onInValid: SubmitErrorHandler<PostFormTypes> = (e) => {
        e.title && alert(e.title?.message);
        e.content && alert(e.content?.message);
    };

    return (
        <>
            <h1>게시글 생성</h1>
            <form onSubmit={handleSubmit(onValid, onInValid)}>
                제목 :{' '}
                <input
                    {...register('title', {
                        required: {
                            value: true,
                            message: '제목은 필수 입력 사항입니다.',
                        },
                    })}
                    type="text"
                />
                내용 :{' '}
                <textarea
                    {...register('content', {
                        required: {
                            value: true,
                            message: '내용은 필수 입력 사항입니다.',
                        },
                    })}
                />
                <button type={'submit'}>작성</button>
            </form>
        </>
    );
}
