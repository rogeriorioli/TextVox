/*
  Warnings:

  - Added the required column `s3Url` to the `Audio` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Audio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "path" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "s3Url" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Audio" ("created_at", "id", "name", "path") SELECT "created_at", "id", "name", "path" FROM "Audio";
DROP TABLE "Audio";
ALTER TABLE "new_Audio" RENAME TO "Audio";
CREATE UNIQUE INDEX "Audio_id_key" ON "Audio"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
