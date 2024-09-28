import { Global, Module } from '@nestjs/common'
import { PrismaModule } from 'nestjs-prisma'

import { NestConfigModule } from './config.module'

@Global()
@Module({
  imports: [
    NestConfigModule,

    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [],
})
export class AppConfigModule {}
