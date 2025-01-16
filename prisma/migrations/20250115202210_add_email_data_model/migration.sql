-- CreateTable
CREATE TABLE "EmailData" (
    "id" SERIAL NOT NULL,
    "messageId" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "receiver" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "EmailData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailData_messageId_key" ON "EmailData"("messageId");
