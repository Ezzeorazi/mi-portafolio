-- AlterTable
ALTER TABLE "SerpAnalysisJob" ADD COLUMN     "ipHash" TEXT;

-- CreateIndex
CREATE INDEX "SerpAnalysisJob_email_createdAt_idx" ON "SerpAnalysisJob"("email", "createdAt");

-- CreateIndex
CREATE INDEX "SerpAnalysisJob_ipHash_createdAt_idx" ON "SerpAnalysisJob"("ipHash", "createdAt");

