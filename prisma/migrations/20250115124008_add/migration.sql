-- CreateTable
CREATE TABLE "TrackingData" (
    "id" SERIAL NOT NULL,
    "userAgent" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,
    "temp" TEXT NOT NULL,

    CONSTRAINT "TrackingData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrackingData_messageId_key" ON "TrackingData"("messageId");
