import { Module } from '@nestjs/common'

import { AppController } from './app/app.controller'
import { AppService } from './app/app.service'
import { MeasurementsService } from './measurements/measurements.service'

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, MeasurementsService],
  exports: [AppService, MeasurementsService],
})
export class ModulesModule {}
