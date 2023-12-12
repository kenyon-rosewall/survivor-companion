-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PlayerInEpisode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "episodeId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'playing',
    "tribeId" INTEGER,
    "shotInTheDark" BOOLEAN NOT NULL,
    "fireTokens" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PlayerInEpisode_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerInEpisode_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerInEpisode_tribeId_fkey" FOREIGN KEY ("tribeId") REFERENCES "Tribe" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_PlayerInEpisode" ("createdAt", "episodeId", "fireTokens", "id", "notes", "playerId", "shotInTheDark", "status", "tribeId", "updatedAt") SELECT "createdAt", "episodeId", "fireTokens", "id", "notes", "playerId", "shotInTheDark", "status", "tribeId", "updatedAt" FROM "PlayerInEpisode";
DROP TABLE "PlayerInEpisode";
ALTER TABLE "new_PlayerInEpisode" RENAME TO "PlayerInEpisode";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
