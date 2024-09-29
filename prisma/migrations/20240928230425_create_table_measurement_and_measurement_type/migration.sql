-- CreateEnum
CREATE TYPE "MeasurementType" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "measurements" (
    "meansure_uuid" TEXT NOT NULL,
    "customer_code" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "measure_type" "MeasurementType" NOT NULL,
    "measure_value" TEXT NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "meansure_datatime" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "measurements_pkey" PRIMARY KEY ("meansure_uuid")
);
