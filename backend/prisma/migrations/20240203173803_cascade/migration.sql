-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Document" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "transcription" TEXT NOT NULL,
    "audio_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Document_audio_id_fkey" FOREIGN KEY ("audio_id") REFERENCES "Audio" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Document" ("audio_id", "created_at", "id", "title", "transcription") SELECT "audio_id", "created_at", "id", "title", "transcription" FROM "Document";
DROP TABLE "Document";
ALTER TABLE "new_Document" RENAME TO "Document";
CREATE UNIQUE INDEX "Document_id_key" ON "Document"("id");
CREATE UNIQUE INDEX "Document_audio_id_key" ON "Document"("audio_id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
