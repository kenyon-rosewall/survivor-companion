/*
  Warnings:

  - The primary key for the `Vote` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `id` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tribalCouncilId" INTEGER NOT NULL,
    "voterId" INTEGER NOT NULL,
    "votedForId" INTEGER,
    "doesNotCount" BOOLEAN NOT NULL,
    "didNotVote" BOOLEAN NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'vote',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Vote_tribalCouncilId_fkey" FOREIGN KEY ("tribalCouncilId") REFERENCES "TribalCouncil" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "PlayerInEpisode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_votedForId_fkey" FOREIGN KEY ("votedForId") REFERENCES "PlayerInEpisode" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Vote" ("category", "createdAt", "didNotVote", "doesNotCount", "tribalCouncilId", "updatedAt", "votedForId", "voterId") SELECT "category", "createdAt", "didNotVote", "doesNotCount", "tribalCouncilId", "updatedAt", "votedForId", "voterId" FROM "Vote";
DROP TABLE "Vote";
ALTER TABLE "new_Vote" RENAME TO "Vote";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
