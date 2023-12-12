-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Elimination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "playerInEpisodeId" INTEGER NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'votedOut',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Elimination_playerInEpisodeId_fkey" FOREIGN KEY ("playerInEpisodeId") REFERENCES "PlayerInEpisode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Elimination" ("category", "createdAt", "id", "notes", "playerInEpisodeId", "updatedAt") SELECT "category", "createdAt", "id", "notes", "playerInEpisodeId", "updatedAt" FROM "Elimination";
DROP TABLE "Elimination";
ALTER TABLE "new_Elimination" RENAME TO "Elimination";
CREATE UNIQUE INDEX "Elimination_playerInEpisodeId_key" ON "Elimination"("playerInEpisodeId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
