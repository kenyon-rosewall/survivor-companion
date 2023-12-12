-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vote" (
    "tribalCouncilId" INTEGER NOT NULL,
    "voterId" INTEGER NOT NULL,
    "votedForId" INTEGER,
    "doesNotCount" BOOLEAN NOT NULL,
    "didNotVote" BOOLEAN NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'vote',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("tribalCouncilId", "voterId"),
    CONSTRAINT "Vote_tribalCouncilId_fkey" FOREIGN KEY ("tribalCouncilId") REFERENCES "TribalCouncil" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "PlayerInEpisode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_votedForId_fkey" FOREIGN KEY ("votedForId") REFERENCES "PlayerInEpisode" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Vote" ("category", "createdAt", "didNotVote", "doesNotCount", "tribalCouncilId", "updatedAt", "votedForId", "voterId") SELECT "category", "createdAt", "didNotVote", "doesNotCount", "tribalCouncilId", "updatedAt", "votedForId", "voterId" FROM "Vote";
DROP TABLE "Vote";
ALTER TABLE "new_Vote" RENAME TO "Vote";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
