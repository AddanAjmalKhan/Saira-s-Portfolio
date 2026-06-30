-- CreateTable
CREATE TABLE "CountryVisit" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CountryVisit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VisitorWidget" (
    "id" TEXT NOT NULL DEFAULT 'visitor',
    "enabled" TEXT NOT NULL DEFAULT 'on',
    "heading" TEXT NOT NULL DEFAULT 'Viewed from around the world',

    CONSTRAINT "VisitorWidget_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CountryVisit_country_key" ON "CountryVisit"("country");
