import Image from 'next/image';

export default function Test() {
    return (
        <>
            <Image
                src={'/loading.svg'}
                width={100}
                height={100}
                alt={'...loading'}
                className={'loading_container'}
            />
        </>
    );
}
