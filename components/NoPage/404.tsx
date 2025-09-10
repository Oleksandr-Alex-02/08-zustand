'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page404() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => router.push('/'), 3000);
        return () => clearTimeout(timer);
    }, [router]);

    return null;
}