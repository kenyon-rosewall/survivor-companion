import React, { useEffect, useState } from 'react'
import { Columns, Table } from 'react-bulma-components'
import { readSeasonEliminations } from '../../api'
import { extractAlliances } from '../../utils'

type StatsProps = {
  player: any
}

const Stats: React.FC<StatsProps> = ({ player }) => {
  const [alliances, setAlliances] = useState<any[]>([])
  const [eliminations, setEliminations] = useState<any[]>([])

  useEffect(() => {
    if (player.playerInEpisodes === undefined || !player.seasonId) return

    setAlliances(extractAlliances(player.playerInEpisodes))
    readSeasonEliminations(player.seasonId, setEliminations)
  }, [player])

  const concatStat = (stat: string) => {
    if (player.playerInEpisodes === undefined) return []

    return player.playerInEpisodes.map((pie: any) => pie[stat])
      .reduce((prev: any, curr: any) => prev.concat(curr), [])
  }

  const episodeCount = () => {
    if (player.playerInEpisodes === undefined) return 0

    return player.playerInEpisodes.filter((p: any) => p.status === 'playing').length + 1
  }

  const totalDays = () => {
    return "unknown"
  }

  const castVotes = () => {
    return concatStat('castVotes').length
  }

  const correctlyCastVotes = () => {
    const playersVotedOut = eliminations
      .filter((e: any) => e.category === 'votedOut')
      .map((e: any) => e.playerInEpisodeId)

    let correctlyCastVoteCount: number = 0
    for (const castVote of concatStat('castVotes')) {
      if (castVote.doesNotCount) continue
      if (playersVotedOut.includes(castVote.votedForId)) {
        correctlyCastVoteCount++
      }
    }

    return correctlyCastVoteCount
  }

  const incorrectlyCastVotes = () => {
    const playersVotedOut = eliminations
      .filter((e: any) => e.category === 'votedOut')
      .map((e: any) => e.playerInEpisodeId)

    let incorrectlyCastVoteCount: number = 0
    for (const castVote of concatStat('castVotes')) {
      if (castVote.doesNotCount) continue
      if (!playersVotedOut.includes(castVote.votedForId)) {
        incorrectlyCastVoteCount++
      }
    }

    return incorrectlyCastVoteCount
  }

  const receivedVotes = () => {
    return concatStat('receivedVotes').length
  }

  const receivedVotesNotCounted = () => {
    if (player.playerInEpisodes === undefined) return 0

    const receivedVotes = concatStat('receivedVotes')

    return receivedVotes.filter((rv: any) => rv.doesNotCount === true).length
  }

  const receivedVotesCounted = () => {
    return receivedVotes() - receivedVotesNotCounted()
  }

  const advantagesObtained = () => {
    const advantages = concatStat('advantagePlays')
      .filter((advantage: any) => advantage.category === 'obtained')

    return advantages.length
  }

  const advantagesPlayed = () => {
    const advantages = concatStat('advantagePlays')
      .filter((advantage: any) => advantage.category === 'played')

    return advantages.length
  }

  const longestAlliance = () => {
    if (player.playerInEpisodes === undefined) return "Unknown"

    let allianceCount: any = {}
    for (const pie of player.playerInEpisodes) {
      for (const alliance of pie.alliances) {
        allianceCount[alliance.name] = allianceCount[alliance.name] + 1 || 1
      }
    }

    return Object.keys(allianceCount).sort((a, b) => allianceCount[b] - allianceCount[a])[0]
  }

  const tribalCouncilsCount = () => {
    if (player.playerInEpisodes === undefined) return 0

    const castVotes = concatStat('castVotes')
    let tribalCouncils: number[] = []
    for (const castVote of castVotes) {
      if (!tribalCouncils.includes(castVote.tribalCouncilId))
        tribalCouncils.push(castVote.tribalCouncilId)
    }

    return tribalCouncils.length
  }

  return (
    <Columns>
      <Columns.Column size={2}></Columns.Column>
      <Columns.Column
        size={8}
      >
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