import React, { useEffect, useState } from 'react'
import { Columns, Table } from 'react-bulma-components'
import { readSeasonEliminations } from '../../api'
import { extractAlliances } from '../../utils'
import {
  IPlayerOnSeason, IAlliance, IElimination, IPlayerInEpisode,
  IVote,
  EliminationCategoryEnum,
  IAdvantageEvent,
  AdvantageEventCategoryEnum
} from '../../models'

type StatsProps = {
  playerOnSeason?: IPlayerOnSeason
}

const Stats: React.FC<StatsProps> = ({ playerOnSeason }) => {
  const [alliances, setAlliances] = useState<IAlliance[]>([])
  const [eliminations, setEliminations] = useState<IElimination[]>([])

  useEffect(() => {
    if (!playerOnSeason?.playerInEpisodes || !playerOnSeason.seasonId) return

    setAlliances(extractAlliances(playerOnSeason.playerInEpisodes))
    readSeasonEliminations(playerOnSeason.seasonId, setEliminations)
  }, [playerOnSeason])

  const episodeCount = (): number => {
    if (!playerOnSeason?.playerInEpisodes) return 0

    return playerOnSeason.playerInEpisodes
      .filter((p: IPlayerInEpisode) => p.status === 'playing')
      .length + 1
  }

  const totalDays = (): string => {
    return "unknown"
  }

  const castVotes = (): number => {
    if (!playerOnSeason?.playerInEpisodes) return 0

    return playerOnSeason.playerInEpisodes
      .flatMap((pie: IPlayerInEpisode) => pie.castVotes ?? [])
      .length
  }

  const correctlyCastVotes = (): number => {
    if (!playerOnSeason?.playerInEpisodes) return 0

    const playersVotedOut: number[] = eliminations
      .filter((e: IElimination) => e.category === EliminationCategoryEnum.VotedOut)
      .map((e: IElimination) => e.playerInEpisodeId)

    return playerOnSeason.playerInEpisodes
      .flatMap((pie: IPlayerInEpisode) => pie.castVotes ?? [])
      .reduce((count: number, castVote: IVote) => {
        if (!castVote.doesNotCount && playersVotedOut.includes(castVote.votedForId)) {
          return count++
        }
        return count
      }, 0)
  }

  const incorrectlyCastVotes = (): number => {
    if (!playerOnSeason?.playerInEpisodes) return 0

    const playersVotedOut: number[] = eliminations
      .filter((e: IElimination) => e.category === EliminationCategoryEnum.VotedOut)
      .map((e: IElimination) => e.playerInEpisodeId)

    return playerOnSeason.playerInEpisodes
      .flatMap((pie: IPlayerInEpisode) => pie.castVotes ?? [])
      .reduce((count: number, castVote: IVote) => {
        if (!castVote.doesNotCount && !playersVotedOut.includes(castVote.votedForId)) {
          return count++
        }
        return count
      }, 0)
  }

  const receivedVotes = (): number => {
    if (!playerOnSeason?.playerInEpisodes) return 0

    return playerOnSeason.playerInEpisodes
      .flatMap((pie: IPlayerInEpisode) => pie.receivedVotes ?? [])
      .length
  }

  const receivedVotesNotCounted = (): number => {
    if (!playerOnSeason?.playerInEpisodes) return 0

    return playerOnSeason.playerInEpisodes
      .flatMap((pie: IPlayerInEpisode) => pie.receivedVotes ?? [])
      .filter((rv: IVote) => rv.doesNotCount === true)
      .length
  }

  const receivedVotesCounted = (): number => {
    return receivedVotes() - receivedVotesNotCounted()
  }

  const advantagesObtained = (): number => {
    if (!playerOnSeason?.playerInEpisodes) return 0

    return playerOnSeason.playerInEpisodes
      .flatMap((pie: IPlayerInEpisode) => pie.advantagePlays ?? [])
      .filter((ae: IAdvantageEvent) => ae.category === AdvantageEventCategoryEnum.Obtained)
      .length
  }

  const advantagesPlayed = (): number => {
    if (!playerOnSeason?.playerInEpisodes) return 0

    return playerOnSeason.playerInEpisodes
      .flatMap((pie: IPlayerInEpisode) => pie.advantagePlays ?? [])
      .filter((ae: IAdvantageEvent) => ae.category === AdvantageEventCategoryEnum.Played)
      .length
  }

  const longestAlliance = (): string => {
    if (!playerOnSeason?.playerInEpisodes) return "Unknown"

    const allianceCounts: Record<string, number> = playerOnSeason.playerInEpisodes
      .flatMap((pie: IPlayerInEpisode) => pie.alliances ?? [])
      .reduce<Record<string, number>>((acc: Record<string, number>, alliance: IAlliance) => {
        acc[alliance.name] = (acc[alliance.name] || 0) + 1
        return acc
      }, {})

    const sortedAlliances = Object.entries(allianceCounts)
      .sort(([, countA], [, countB]) => countB - countA)

    return sortedAlliances.length > 0 ? sortedAlliances[0][0] : "Unknown"
  }

  const tribalCouncilsCount = (): number => {
    if (!playerOnSeason?.playerInEpisodes) return 0

    return playerOnSeason.playerInEpisodes
      .flatMap((pie: IPlayerInEpisode) => pie.castVotes ?? [])
      .reduce((count: number, castVote: IVote) => {
        if (!castVote.doesNotCount) return count++
        return count
      }, 0)
  }

  return (
    <Columns>
      <Columns.Column size={2}></Columns.Column>
      <Columns.Column size={8}>
        <Table bordered size='fullwidth'>
          <tbody>
            <tr>
              <td>Episode Count</td>
              <td>{episodeCount()}</td>
              <td>Total Days</td>
              <td>{totalDays()}</td>
            </tr>
            <tr>
              <td>Cast Votes</td>
              <td>{castVotes()}</td>
              <td>Received Votes</td>
              <td>{receivedVotes()}</td>
            </tr>
            <tr>
              <td>Received Votes Counted</td>
              <td>{receivedVotesCounted()}</td>
              <td>Received Votes Not Counted</td>
              <td>{receivedVotesNotCounted()}</td>
            </tr>
            <tr>
              <td>Correctly Cast Votes</td>
              <td>{correctlyCastVotes()}</td>
              <td>Incorrectly Cast Votes</td>
              <td>{incorrectlyCastVotes()}</td>
            </tr>
            <tr>
              <td>Advantages Obtained</td>
              <td>{advantagesObtained()}</td>
              <td>Advantages Played</td>
              <td>{advantagesPlayed()}</td>
            </tr>
            <tr>
              <td>Alliances Joined</td>
              <td>{alliances.length}</td>
              <td>Longest Alliance</td>
              <td>{longestAlliance()}</td>
            </tr>
            <tr>
              <td>Tribal Councils Attended</td>
              <td>{tribalCouncilsCount()}</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </Columns.Column>
      <Columns.Column></Columns.Column>
    </Columns>
  )
}

export default Stats