import { Module } from '@nestjs/common'

import { AppConfigModule } from '@/common/configs/app-config.module'
import { ModulesModule } from '@/modules/modules.module'

@Module({
  imports: [AppConfigModule, ModulesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
