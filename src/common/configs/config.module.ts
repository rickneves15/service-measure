import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/.env`],
      cache: true,
      isGlobal: true,
    }),
  ],
})
export class NestConfigModule {}
