import {createTRPCProxyClient, httpBatchLink} from '@trpc/client';
import {AppRouter} from '@api/trpc/trpc.router';

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: `${process.env.NEXT_PUBLIC_NESTJS_SERVER}/trpc`,
        }),
    ],
});
