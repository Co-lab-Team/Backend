-- CreateTable
CREATE TABLE "Verification" (
    "userID" TEXT NOT NULL,
    "verificationCode" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("userID")
);

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("userID") ON DELETE RESTRICT ON UPDATE CASCADE;
