-- AlterTable
ALTER TABLE "Player" ADD COLUMN "hometown" TEXT;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Elimination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "onDay" INTEGER NOT NULL DEFAULT 0,
    "playerInEpisodeId" INTEGER NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'votedOut',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Elimination_playerInEpisodeId_fkey" FOREIGN KEY ("playerInEpisodeId") REFERENCES "PlayerInEpisode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Elimination" ("category", "createdAt", "id", "notes", "order", "playerInEpisodeId", "updatedAt") SELECT "category", "createdAt", "id", "notes", "order", "playerInEpisodeId", "updatedAt" FROM "Elimination";
DROP TABLE "Elimination";
ALTER TABLE "new_Elimination" RENAME TO "Elimination";
CREATE UNIQUE INDEX "Elimination_playerInEpisodeId_key" ON "Elimination"("playerInEpisodeId");
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
    "totalDays" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Season" ("airingEnd", "airingStart", "createdAt", "episodeCount", "filmingEnd", "filmingStart", "hasFireTokens", "id", "name", "notes", "order", "rating", "updatedAt") SELECT "airingEnd", "airingStart", "createdAt", "episodeCount", "filmingEnd", "filmingStart", "hasFireTokens", "id", "name", "notes", "order", "rating", "updatedAt" FROM "Season";
DROP TABLE "Season";
ALTER TABLE "new_Season" RENAME TO "Season";
CREATE TABLE "new_Episode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seasonId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "name" TEXT,
    "airingDate" DATETIME NOT NULL,
    "days" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "premiere" BOOLEAN NOT NULL,
    "merge" BOOLEAN NOT NULL,
    "final" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Episode" ("airingDate", "createdAt", "final", "id", "merge", "name", "notes", "order", "premiere", "seasonId", "updatedAt") SELECT "airingDate", "createdAt", "final", "id", "merge", "name", "notes", "order", "premiere", "seasonId", "updatedAt" FROM "Episode";
DROP TABLE "Episode";
ALTER TABLE "new_Episode" RENAME TO "Episode";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
