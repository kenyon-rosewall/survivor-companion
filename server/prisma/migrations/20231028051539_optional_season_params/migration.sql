-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Season" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "name" TEXT,
    "episodeCount" INTEGER NOT NULL DEFAULT 0,
    "filmingStart" DATETIME,
    "filmingEnd" DATETIME,
    "airingStart" DATETIME,
    "airingEnd" DATETIME,
    "rating" TEXT,
    "notes" TEXT,
    "hasFireTokens" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Season" ("airingEnd", "airingStart", "createdAt", "episodeCount", "filmingEnd", "filmingStart", "hasFireTokens", "id", "name", "notes", "order", "rating", "updatedAt") SELECT "airingEnd", "airingStart", "createdAt", "episodeCount", "filmingEnd", "filmingStart", "hasFireTokens", "id", "name", "notes", "order", "rating", "updatedAt" FROM "Season";
DROP TABLE "Season";
ALTER TABLE "new_Season" RENAME TO "Season";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
