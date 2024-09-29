import { Test, TestingModule } from '@nestjs/testing'
import { PrismaService } from 'nestjs-prisma'

import { MeasurementsService } from './measurements.service'

describe('MeasurementsService', () => {
  let service: MeasurementsService
  let prisma: PrismaService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MeasurementsService,
        {
          provide: PrismaService,
          useValue: {
            create: jest.fn(),
            findMany: jest.fn(),
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<MeasurementsService>(MeasurementsService)
    prisma = module.get<PrismaService>(PrismaService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
    expect(prisma).toBeDefined()
  })
})
