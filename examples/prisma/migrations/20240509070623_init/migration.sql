-- CreateTable
CREATE TABLE "provinces" (
    "code" VARCHAR(2) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "provinces_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "regencies" (
    "code" VARCHAR(5) NOT NULL,
    "province_code" VARCHAR(2) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "regencies_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "districts" (
    "code" VARCHAR(8) NOT NULL,
    "regency_code" VARCHAR(5) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "districts_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "villages" (
    "code" VARCHAR(13) NOT NULL,
    "district_code" VARCHAR(8) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "villages_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "islands" (
    "code" VARCHAR(11) NOT NULL,
    "regency_code" VARCHAR(5),
    "name" TEXT NOT NULL,
    "coordinate" TEXT NOT NULL,
    "is_outermost_small" BOOLEAN NOT NULL,
    "is_populated" BOOLEAN NOT NULL,

    CONSTRAINT "islands_pkey" PRIMARY KEY ("code")
);

-- AddForeignKey
ALTER TABLE "regencies" ADD CONSTRAINT "regencies_province_code_fkey" FOREIGN KEY ("province_code") REFERENCES "provinces"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "districts" ADD CONSTRAINT "districts_regency_code_fkey" FOREIGN KEY ("regency_code") REFERENCES "regencies"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "villages" ADD CONSTRAINT "villages_district_code_fkey" FOREIGN KEY ("district_code") REFERENCES "districts"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "islands" ADD CONSTRAINT "islands_regency_code_fkey" FOREIGN KEY ("regency_code") REFERENCES "regencies"("code") ON DELETE SET NULL ON UPDATE CASCADE;
