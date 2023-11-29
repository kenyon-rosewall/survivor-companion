import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Button, Columns, Modal, Table, Tag } from 'react-bulma-components'
import TribeSelect from '../common/tribeSelect'
import VoteForm from './vote'
import { IconName } from '@fortawesome/fontawesome-svg-core'

type TribalCouncilFormProps = {
  tribalCouncilId: any
  tribes: any[]
}

const TribalCouncilForm: React.FC<TribalCouncilFormProps> = ({ tribalCouncilId, tribes }) => {
  const [tribalCouncil, setTribalCouncil] = useState<any>({})
  const [players, setPlayers] = useState<any[]>([])
  const [refreshTribalCouncil, setRefreshTribalCouncil] = useState<boolean>(false)
  const [isTribeModalOpen, setIsTribeModalOpen] = useState<boolean>(false)
  const [isVoteModalOpen, setIsVoteModalOpen] = useState<boolean>(false)
  const [tribeData, setTribeData] = useState<any>({
    tribalCouncilId: tribalCouncilId,
    tribeId: 0,
  })

  useEffect(() => {
    fetch(`http://localhost:5000/tribalCouncils/${tribalCouncilId}`)
    .then(response => response.json())
    .then(data => {
      setTribalCouncil(data.data)
    })
    .catch(err => console.log('Error fetching tribal council:', err))

    fetch(`http://localhost:5000/tribalCouncils/${tribalCouncilId}/players`)
    .then(response => response.json())
    .then(data => {
      if (data.data.length > 0) {
        setPlayers(data.data)
      }
    })
    .catch(err => console.log('Error fetching players:', err))
  }, [tribalCouncilId, refreshTribalCouncil])

  const addTribe = () => {
    const tribeId: number = tribeData.tribeId;
    if (tribeId > 0) {
      fetch(`http://localhost:5000/tribalCouncils/${tribalCouncilId}/tribes/${tribeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tribeData)
      })
      .then(response => {
        setRefreshTribalCouncil(!refreshTribalCouncil)
        setIsTribeModalOpen(false)
      })
      .catch(err => console.log('Error adding tribe:', err))
    }
  }

  const removeTribe = (index: number) => {
    const tribeId = tribalCouncil.tribes[index].id
    fetch(`http://localhost:5000/tribalCouncils/${tribalCouncilId}/tribes/${tribeId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' } })
    .then(response => {
      setRefreshTribalCouncil(!refreshTribalCouncil)
    })
    .catch(err => console.log('Error removing tribe:', err))
  }

  const renderTribes = () => {
    return (
      <>
        {tribalCouncil.tribes?.map((tribe: any, index: number) => (
          <Tag
            key={index}
            size={'large'}
            style={{ backgroundColor: tribe.color, color: 'white' }}
          >
              {tribe.name}
              <Button remove size={'small'} onClick={() => removeTribe(index)} />
          </Tag>
        ))}
      </>
    )
  }

  const addVote = (voteData: any) => {
    fetch(`http://localhost:5000/tribalCouncils/${tribalCouncilId}/votes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(voteData)
    })
    .then(response => {
      setIsVoteModalOpen(false)
      setRefreshTribalCouncil(!refreshTribalCouncil)
    })
    .catch(err => console.log('Error adding vote:', err))
  }

  const removeVote = (index: number) => {
    const voterId = tribalCouncil.votes[index].voterId
    fetch(`http://localhost:5000/tribalCouncils/${tribalCouncil.id}/votes/${voterId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}) })
    .then(response => {
      setRefreshTribalCouncil(!refreshTribalCouncil)
    })
    .catch(err => console.log('Error removing vote:', err))
  }

  const formatVote = (vote: any) => {
    if (vote.didNotVote) {
      return `${vote.voter?.player?.name} did not vote`
    }

    switch (vote.category) {
      case 'vote':
        return `${vote.voter?.player?.name} voted for ${vote.votedFor?.player?.name}`
      case 'shotInTheDark':
        return `${vote.voter?.player?.name} played their shot in the dark`
      case 'extraVote':
        return `${vote.voter?.player?.name} cast an extra vote for ${vote.votedFor?.player?.name}`
      case 'revote':
        return `Revote: ${vote.voter?.player?.name} voted for ${vote.votedFor?.player?.name}`
    }
  }

  const renderVotes = () => {
    return (
      <>
        {tribalCouncil.votes?.map((vote: any, index: number) => (
          <tr key={index}>
            <td>{formatVote(vote)}</td>
            <td width={2}>
              <FontAwesomeIcon 
                icon={["fas", vote.doesNotCount ? "xmark" as IconName : "" as IconName]} 
              />
            </td>
            <td width={2}>
              <Button remove size={'small'} onClick={() => removeVote(index)} />
            </td>
          </tr>
        ))}
      </>
    )
  }

  const handleTribeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTribeData({ ...tribeData, tribeId: parseInt(e.target.value) })
  }

  return (
    <Columns>
      <Columns.Column size={6}>
        <Button className='is-pulled-right' onClick={() => setIsTribeModalOpen(true)}>Add Tribe</Button>
        <h3 className='subtitle'>Tribes</h3>
        <Tag.Group>{renderTribes()}</Tag.Group>
        <Modal show={isTribeModalOpen} onClose={() => setIsTribeModalOpen(false)}>
          <Modal.Card>
            <Modal.Card.Header>
              <Modal.Card.Title>Add Tribe to Tribal Council</Modal.Card.Title>
            </Modal.Card.Header>
            <Modal.Card.Body>
              <TribeSelect
                tribes={tribes}
                selectedTribeId={tribeData.tribeId}
                handleTribeChange={handleTribeChange}
              />
              <Button onClick={addTribe}>Add Tribe</Button>
            </Modal.Card.Body>
          </Modal.Card>
        </Modal>
      </Columns.Column>

      <Columns.Column>
      <Button className='is-pulled-right' onClick={() => setIsVoteModalOpen(true)}>Add Vote</Button>
        <h3 className='subtitle'>Votes</h3>
        <Table bordered size='fullwidth'>
          <tbody>
            {renderVotes()}
          </tbody>
        </Table>
        <Modal show={isVoteModalOpen} onClose={() => setIsVoteModalOpen(false)}>
          <Modal.Card>
            <Modal.Card.Header>
              <Modal.Card.Title>Add Tribe to Tribal Council</Modal.Card.Title>
            </Modal.Card.Header>
            <Modal.Card.Body>
              <VoteForm
                tribalCouncilId={tribalCouncilId}
                players={players}
                handleFormSubmit={addVote}
              />
            </Modal.Card.Body>
          </Modal.Card>
        </Modal>
      </Columns.Column>
    </Columns>
  )
}

export default TribalCouncilForm