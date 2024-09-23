import {Module} from '@nestjs/common';
import {TrpcService} from './trpc.service';
import {TrpcRouter} from './trpc.router';

@Module({
    imports: [],
    providers: [TrpcService, TrpcRouter],
    controllers: [],
})
export class TrpcModule {
}
