-- CreateTable
CREATE TABLE "TrackingMapping" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "messageId" TEXT NOT NULL,

    CONSTRAINT "TrackingMapping_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrackingMapping_messageId_key" ON "TrackingMapping"("messageId");
