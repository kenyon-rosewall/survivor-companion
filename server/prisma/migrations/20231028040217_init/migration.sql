-- CreateTable
CREATE TABLE "Season" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "order" INTEGER NOT NULL,
    "name" TEXT,
    "episodeCount" INTEGER NOT NULL DEFAULT 0,
    "filmingStart" DATETIME NOT NULL,
    "filmingEnd" DATETIME NOT NULL,
    "airingStart" DATETIME NOT NULL,
    "airingEnd" DATETIME NOT NULL,
    "rating" TEXT,
    "notes" TEXT,
    "hasFireTokens" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Episode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "seasonId" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "name" TEXT,
    "airingDate" DATETIME NOT NULL,
    "notes" TEXT,
    "premiere" BOOLEAN NOT NULL,
    "merge" BOOLEAN NOT NULL,
    "final" BOOLEAN NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Episode_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tribe" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Tribe_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TribeEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tribeId" INTEGER NOT NULL,
    "playerInEpisodeId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TribeEvent_tribeId_fkey" FOREIGN KEY ("tribeId") REFERENCES "Tribe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "TribeEvent_playerInEpisodeId_fkey" FOREIGN KEY ("playerInEpisodeId") REFERENCES "PlayerInEpisode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Player" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "nicknames" TEXT,
    "birthday" DATETIME NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "PlayerOnSeason" (
    "playerId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "headshot" TEXT,
    "occupation" TEXT,
    "bornLocation" TEXT,
    "residenceLocation" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("playerId", "seasonId"),
    CONSTRAINT "PlayerOnSeason_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerOnSeason_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TribalCouncil" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "episodeId" INTEGER NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TribalCouncil_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Vote" (
    "tribalCouncilId" INTEGER NOT NULL,
    "voterId" INTEGER NOT NULL,
    "votedForId" INTEGER NOT NULL,
    "doesNotCount" BOOLEAN NOT NULL,
    "didNotVote" BOOLEAN NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'vote',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("tribalCouncilId", "voterId"),
    CONSTRAINT "Vote_tribalCouncilId_fkey" FOREIGN KEY ("tribalCouncilId") REFERENCES "TribalCouncil" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_voterId_fkey" FOREIGN KEY ("voterId") REFERENCES "PlayerInEpisode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Vote_votedForId_fkey" FOREIGN KEY ("votedForId") REFERENCES "PlayerInEpisode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Elimination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerInEpisodeId" INTEGER NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'votedOut',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Elimination_playerInEpisodeId_fkey" FOREIGN KEY ("playerInEpisodeId") REFERENCES "PlayerInEpisode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PlayerInEpisode" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerId" INTEGER NOT NULL,
    "episodeId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'playing',
    "tribeId" INTEGER NOT NULL,
    "shotInTheDark" BOOLEAN NOT NULL,
    "fireTokens" INTEGER NOT NULL DEFAULT 0,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PlayerInEpisode_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerInEpisode_episodeId_fkey" FOREIGN KEY ("episodeId") REFERENCES "Episode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "PlayerInEpisode_tribeId_fkey" FOREIGN KEY ("tribeId") REFERENCES "Tribe" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Advantage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AdvantageEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerInEpisodeId" INTEGER NOT NULL,
    "advantageId" INTEGER NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'played',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AdvantageEvent_playerInEpisodeId_fkey" FOREIGN KEY ("playerInEpisodeId") REFERENCES "PlayerInEpisode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AdvantageEvent_advantageId_fkey" FOREIGN KEY ("advantageId") REFERENCES "Advantage" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Alliance" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AllianceEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "playerInEpisodeId" INTEGER NOT NULL,
    "allianceId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "AllianceEvent_playerInEpisodeId_fkey" FOREIGN KEY ("playerInEpisodeId") REFERENCES "PlayerInEpisode" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "AllianceEvent_allianceId_fkey" FOREIGN KEY ("allianceId") REFERENCES "Alliance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_TribalCouncilToTribe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_TribalCouncilToTribe_A_fkey" FOREIGN KEY ("A") REFERENCES "TribalCouncil" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_TribalCouncilToTribe_B_fkey" FOREIGN KEY ("B") REFERENCES "Tribe" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AdvantageToPlayerInEpisode" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AdvantageToPlayerInEpisode_A_fkey" FOREIGN KEY ("A") REFERENCES "Advantage" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AdvantageToPlayerInEpisode_B_fkey" FOREIGN KEY ("B") REFERENCES "PlayerInEpisode" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_AllianceToPlayerInEpisode" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AllianceToPlayerInEpisode_A_fkey" FOREIGN KEY ("A") REFERENCES "Alliance" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AllianceToPlayerInEpisode_B_fkey" FOREIGN KEY ("B") REFERENCES "PlayerInEpisode" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Elimination_playerInEpisodeId_key" ON "Elimination"("playerInEpisodeId");

-- CreateIndex
CREATE UNIQUE INDEX "_TribalCouncilToTribe_AB_unique" ON "_TribalCouncilToTribe"("A", "B");

-- CreateIndex
CREATE INDEX "_TribalCouncilToTribe_B_index" ON "_TribalCouncilToTribe"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AdvantageToPlayerInEpisode_AB_unique" ON "_AdvantageToPlayerInEpisode"("A", "B");

-- CreateIndex
CREATE INDEX "_AdvantageToPlayerInEpisode_B_index" ON "_AdvantageToPlayerInEpisode"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_AllianceToPlayerInEpisode_AB_unique" ON "_AllianceToPlayerInEpisode"("A", "B");

-- CreateIndex
CREATE INDEX "_AllianceToPlayerInEpisode_B_index" ON "_AllianceToPlayerInEpisode"("B");
