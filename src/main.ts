import { NestFactory } from '@nestjs/core'
import * as express from 'express'
import { existsSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Create uploads directory if it doesn't exist
  join(__dirname, 'uploads')
  const uploadDir = join(process.cwd(), 'uploads')
  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir)
  }
  app.use('/uploads', express.static(join(process.cwd(), 'uploads')))
  app.use(express.json({ limit: '50mb' }))
  app.use(express.urlencoded({ extended: true, limit: '50mb' }))

  const PORT = process.env.PORT || 3000
  await app.listen(PORT)
}
bootstrap()
