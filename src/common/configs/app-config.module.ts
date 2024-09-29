import { Global, Module } from '@nestjs/common'
import { APP_PIPE } from '@nestjs/core'
import { PrismaModule } from 'nestjs-prisma'

import { CustomZodValidationPipe } from '@/common/pipes/custom-zod-validation-pipe'

import { NestConfigModule } from './config.module'

@Global()
@Module({
  imports: [
    NestConfigModule,

    PrismaModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: CustomZodValidationPipe,
    },
  ],
})
export class AppConfigModule {}
