-- CreateTable
CREATE TABLE "ProjectLogo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "url" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProjectLogo_pkey" PRIMARY KEY ("id")
);
