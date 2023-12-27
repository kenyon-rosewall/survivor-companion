import React, { useRef, useState } from 'react'
import { Tag } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from '@fortawesome/fontawesome-svg-core'

type TimelineProps = {
  player: any
}

const Timeline: React.FC<TimelineProps> = ({ player }) => {
  const prevTribeIdRef = useRef<number>(0)
  const prevPlayerStatusRef = useRef<string>('')

  const playerName = () => {
    if (player === undefined) return ''
    if (player.player.nickname) return player.player.nickname
    return player.player.name
  }

  const voteIcon = (vote: any) => {
    if (vote.didNotVote) {
      return "ban"
    }

    switch (vote.category) {
      case 'vote':
        return "hand-paper"
      case 'shotInTheDark':
        return "dice"
      case 'extraVote':
        return "plus-circle"
      case 'revote':
        return "redo"
    }
  }

  const formatVote = (vote: any) => {
    if (vote.didNotVote) {
      return `${playerName()} did not vote`
    }

    const votedFor: string = vote.votedFor?.player?.name
    switch (vote.category) {
      case 'vote':
        return `${playerName()} voted for ${votedFor}` + (vote.doesNotCount ? ' (did not count)' : '')
      case 'shotInTheDark':
        return `${playerName()} played their shot in the dark`
      case 'extraVote':
        return `${playerName()} cast an extra vote for ${votedFor}`
      case 'revote':
        return `Revote: ${playerName()} voted for ${votedFor}`
    }
  }

  const getTribeEvent = (pie: any) => {
    if (pie.tribeId === null) return null

    let message: string = ''
    let icon: IconName = 'user'
    if (prevTribeIdRef.current === 0) {
      message = `${playerName()} started on ${pie.tribe.name}`
      icon = 'flag-checkered'
    } else if (prevTribeIdRef.current !== pie.tribeId) {
      if (pie.episode.merge) {
        message = `${playerName()} made the merge and joined ${pie.tribe.name}`
        icon = 'compress-arrows-alt'
      } else {
        message = `${playerName()} got swapped to ${pie.tribe.name}`
        icon = 'random'
      }
    }

    prevTribeIdRef.current = pie.tribeId

    if (message === '') return null

    return (
      <>
        <div
          className='timeline-marker is-icon'
          style={{ backgroundColor: pie.tribe.color }}
        >
          <FontAwesomeIcon icon={["fas", icon]} />
        </div>
        <div className='timeline-content'>
          {message}
        </div>
      </>
    )
  }

  const getAdvantageEvents = (play: any) => {
    if (play === undefined) return

    let icon: IconName = 'user'
    switch (play.category) {
      case 'obtained':
        icon = 'trophy'
        break
      case 'played':
        icon = 'play-circle'
        break
      case 'expired':
        icon = 'hourglass-end'
        break
      case 'transferred':
        icon = 'exchange-alt'
        break
      case 'lost':
        icon = 'times-circle'
        break
    }
    return (
      <>
        <div className='timeline-marker is-icon'>
          <FontAwesomeIcon icon={["fas", icon]} />
        </div>
        <div className='timeline-content'>
          {playerName()} {play.category} the {play.advantage.name}
        </div>
      </>
    )
  }

  const getElimination = (pie: any) => {
    return (
      <>
        <div className='timeline-marker is-icon'>
          <FontAwesomeIcon icon={["fas", "times"]} />
        </div>
        <div className='timeline-content'>
          {playerName()} was eliminated
        </div>
      </>
    )
  }

  const getVotes = (pie: any, index: number) => {
    if (pie.castVotes.length === 0) return null

    return (
      <>
        <div className='timeline-item' key={`tribalcouncil-${index}`}>
          <div className='timeline-marker is-icon'>
            <FontAwesomeIcon icon={["fas", "gavel"]} />
          </div>
          <div className='timeline-content'>
            {playerName()} went to Tribal Council
          </div>
        </div>

        {pie.castVotes.map((vote: any, i: number) => (
          <div className='timeline-item' key={`vote-${index}-${i}`}>
            <div className='timeline-marker is-icon'>
              <FontAwesomeIcon icon={["fas", voteIcon(vote) as IconName]} />
            </div>
            <div className='timeline-content'>
              {formatVote(vote)}
            </div>
          </div>
        ))}
      </>
    )
  }

  const renderTimeline = () => {
    if (player.playerInEpisodes === undefined) return null

    prevTribeIdRef.current = 0
    prevPlayerStatusRef.current = ''
    return player.playerInEpisodes.map((pie: any, index: number) => {
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
              Episode {pie.episode.order}
            </Tag>
          </header>
          <div
            className={'timeline-item'+(prevTribeIdRef.current !== pie.tribeId ? '' : ' is-hidden')}
            key={`tribe-${index}`}
          >
            {getTribeEvent(pie)}
          </div>
          {pie.advantagePlays.map((play: any, i: number) => (
            <div
              className={'timeline-item'}
              key={`advantage-${index}-${i}`}
            >
              {getAdvantageEvents(play)}
            </div>
          ))}
          {getVotes(pie, index)}
          <div
            className={'timeline-item is-'+pie.tribe.color+(prevPlayerStatusRef.current !== 'eliminated' ? ' is-hidden' : '')}
            key={`elimination-${index}`}
          >
            {getElimination(pie)}
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