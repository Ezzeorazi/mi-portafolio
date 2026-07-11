-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "SerpJobStatus" AS ENUM ('PENDING', 'RUNNING', 'DONE', 'FAILED');

-- CreateTable
CREATE TABLE "SerpAnalysisJob" (
    "id" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "region" TEXT NOT NULL DEFAULT 'mx-es',
    "status" "SerpJobStatus" NOT NULL DEFAULT 'PENDING',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "result" JSONB,

    CONSTRAINT "SerpAnalysisJob_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SerpDomainProfile" (
    "domain" TEXT NOT NULL,
    "registeredAt" TIMESTAMP(3),
    "registrar" TEXT,
    "whoisPrivate" BOOLEAN,
    "ip" TEXT,
    "asn" TEXT,
    "org" TEXT,
    "sitemapUrls" INTEGER,
    "postsPerDay" DOUBLE PRECISION,
    "hasAuthor" BOOLEAN,
    "hasAbout" BOOLEAN,
    "hasContact" BOOLEAN,
    "domSignature" TEXT,
    "fetchedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "raw" JSONB,

    CONSTRAINT "SerpDomainProfile_pkey" PRIMARY KEY ("domain")
);

-- CreateIndex
CREATE INDEX "SerpAnalysisJob_status_createdAt_idx" ON "SerpAnalysisJob"("status", "createdAt");

-- CreateIndex
CREATE INDEX "SerpDomainProfile_fetchedAt_idx" ON "SerpDomainProfile"("fetchedAt");

