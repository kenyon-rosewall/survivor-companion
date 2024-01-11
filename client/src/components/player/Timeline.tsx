import React, { useRef, useState } from 'react'
import { Tag } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import {
  IPlayerOnSeason, IVote, VoteCategoryEnum, IPlayerInEpisode,
  IAdvantageEvent, AdvantageEventCategoryEnum
} from '../../models'

type TimelineProps = {
  playerOnSeason?: IPlayerOnSeason
}

const Timeline: React.FC<TimelineProps> = ({ playerOnSeason }) => {
  const prevTribeIdRef = useRef<number>(0)
  const prevPlayerStatusRef = useRef<string>('')

  const getPlayerName = (): string => {
    return playerOnSeason?.player?.nickname ?? playerOnSeason?.player?.name ?? ''
  }

  const getVoteIcon = (vote: IVote): IconName => {
    if (vote.didNotVote) return "ban"

    switch (vote.category) {
      case VoteCategoryEnum.Vote:
        return "hand-paper"
      case VoteCategoryEnum.ShotInTheDark:
        return "dice"
      case VoteCategoryEnum.ExtraVote:
        return "plus-circle"
      case VoteCategoryEnum.Revote:
        return "redo"
      default:
        return "hand-paper"
    }
  }

  const formatVote = (vote: any): string => {
    const playerName = getPlayerName()
    if (vote.didNotVote) return `${playerName} did not vote`

    const votedFor: string = vote.votedFor?.player?.name
    switch (vote.category) {
      case VoteCategoryEnum.Vote:
        return `${playerName} voted for ${votedFor}${vote.doesNotCount ? ' (did not count)' : ''}`
      case VoteCategoryEnum.ShotInTheDark:
        return `${playerName} played their shot in the dark`
      case VoteCategoryEnum.ExtraVote:
        return `${playerName} cast an extra vote for ${votedFor}`
      case VoteCategoryEnum.Revote:
        return `Revote: ${playerName} voted for ${votedFor}`
      default:
        return ""
    }
  }

  const getTribeEvent = (pie: IPlayerInEpisode): React.ReactNode => {
    if (pie.tribeId === null) return null

    const playerName = getPlayerName()
    const isStarting = prevTribeIdRef.current === 0
    const isSwap = prevTribeIdRef.current !== pie.tribeId
    const isMerge = pie.episode?.merge

    let message: string
    let icon: IconName

    if (isStarting) {
      message = `${playerName} started on ${pie.tribe?.name}`
      icon = 'flag-checkered'
    } else if (isSwap) {
      if (isMerge) {
        message = `${playerName} made the merge and joined ${pie.tribe?.name}`
        icon = 'compress-arrows-alt'
      } else {
        message = `${playerName} got swapped to ${pie.tribe?.name}`
        icon = 'random'
      }
    } else {
      return null
    }

    prevTribeIdRef.current = Number(pie.tribeId)

    return (
      <>
        <div
          className='timeline-marker is-icon'
          style={{ backgroundColor: pie.tribe?.color }}
        >
          <FontAwesomeIcon icon={["fas", icon]} />
        </div>
        <div className='timeline-content'>
          {message}
        </div>
      </>
    )
  }

  const getAdvantageEvents = (play: IAdvantageEvent): React.ReactNode => {
    if (play === undefined) return null

    const playerName = getPlayerName()
    let icon: IconName

    switch (play.category) {
      case AdvantageEventCategoryEnum.Obtained:
        icon = 'trophy'
        break
      case AdvantageEventCategoryEnum.Played:
        icon = 'play-circle'
        break
      case AdvantageEventCategoryEnum.Expired:
        icon = 'hourglass-end'
        break
      case AdvantageEventCategoryEnum.Transferred:
        icon = 'exchange-alt'
        break
      case AdvantageEventCategoryEnum.Lost:
        icon = 'times-circle'
        break
    }

    return (
      <>
        <div className='timeline-marker is-icon'>
          <FontAwesomeIcon icon={["fas", icon]} />
        </div>
        <div className='timeline-content'>
          {playerName} {play.category} the {play.advantage?.name}
        </div>
      </>
    )
  }

  const getElimination = (): React.ReactNode => {
    const playerName = getPlayerName()

    return (
      <>
        <div className='timeline-marker is-icon'>
          <FontAwesomeIcon icon={["fas", "times"]} />
        </div>
        <div className='timeline-content'>
          {playerName} was eliminated
        </div>
      </>
    )
  }

  const getVotes = (pie: IPlayerInEpisode, index: number): React.ReactNode => {
    if (!pie.castVotes?.length) return null

    const playerName = getPlayerName()

    return (
      <>
        <div className='timeline-item' key={`tribalcouncil-${index}`}>
          <div className='timeline-marker is-icon'>
            <FontAwesomeIcon icon={["fas", "gavel"]} />
          </div>
          <div className='timeline-content'>
            {playerName} went to Tribal Council
          </div>
        </div>

        {pie.castVotes?.map((vote: IVote, voteIndex: number) => (
          <div className='timeline-item' key={`vote-${index}-${voteIndex}`}>
            <div className='timeline-marker is-icon'>
              <FontAwesomeIcon icon={["fas", getVoteIcon(vote) as IconName]} />
            </div>
            <div className='timeline-content'>
              {formatVote(vote)}
            </div>
          </div>
        ))}
      </>
    )
  }

  const renderTimeline = (): React.ReactNode => {
    if (playerOnSeason?.playerInEpisodes === undefined) return null

    prevTribeIdRef.current = 0
    prevPlayerStatusRef.current = ''

    return playerOnSeason.playerInEpisodes.map((pie: IPlayerInEpisode, index: number) => {
      if (prevPlayerStatusRef.current === 'eliminated') return null

      prevPlayerStatusRef.current = pie.status

      return (
        <React.Fragment key={index}>
          <header
            className='timeline-header'
            key={`header-${index}`}
          >
            <Tag
              size={'small'}
              color={'primary'}
            >
              Episode {pie.episode?.order}
            </Tag>
          </header>
          <div
            className={`timeline-item ${prevTribeIdRef.current !== pie.tribeId ? '' : 'is-hidden'}`}
            key={`tribe-${index}`}
          >
            {getTribeEvent(pie)}
          </div>
          {pie.advantagePlays?.map((play: any, i: number) => (
            <div
              className={'timeline-item'}
              key={`advantage-${index}-${i}`}
            >
              {getAdvantageEvents(play)}
            </div>
          ))}
          {getVotes(pie, index)}
          <div
            className={`timeline-item is-${pie.tribe?.color} ${prevPlayerStatusRef.current !== 'eliminated' ? 'is-hidden' : ''}`}
            key={`elimination-${index}`}
          >
            {getElimination()}
          </div>
        </React.Fragment>
      )
    })
  }

  return (
    <div className='timeline'>
      {renderTimeline()}
    </div>
  )
}

export default Timeline