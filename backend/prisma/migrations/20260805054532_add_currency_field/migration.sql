-- CreateEnum
CREATE TYPE "Currency" AS ENUM ('USD', 'EUR', 'GBP', 'INR', 'CAD', 'AUD', 'JPY', 'CNY', 'CHF', 'SEK', 'NOK', 'DKK', 'SGD', 'HKD', 'NZD', 'MXN', 'BRL', 'KRW', 'TRY', 'ZAR');

-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "currency" "Currency" NOT NULL DEFAULT 'USD';
