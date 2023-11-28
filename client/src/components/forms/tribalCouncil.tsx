import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState, useEffect } from 'react'
import { Button, Columns, Modal, Table, Tag } from 'react-bulma-components'
import TribeSelect from '../common/tribeSelect'
import VoteForm from './vote'

type TribalCouncilFormProps = {
  tribalCouncilId: any
  tribes: any[]
}

const TribalCouncilForm: React.FC<TribalCouncilFormProps> = ({ tribalCouncilId, tribes }) => {
  const [tribalCouncil, setTribalCouncil] = useState<any>({})
  const [refreshTribalCouncil, setRefreshTribalCouncil] = useState<boolean>(false)
  const [isTribeModalOpen, setIsTribeModalOpen] = useState<boolean>(false)
  const [isVoteModalOpen, setIsVoteModalOpen] = useState<boolean>(false)

  useEffect(() => {
    fetch(`http://localhost:5000/tribalCouncils/${tribalCouncilId}`)
    .then(response => response.json())
    .then(data => {
      setTribalCouncil(data.data)
    })
    .catch(err => console.log('Error fetching tribal council:', err))
  }, [tribalCouncilId, refreshTribalCouncil])

  const removeTribe = (index: number) => {
    const tribeId = tribalCouncil.tribes[index].id
    fetch(`http://localhost:5000/tribalCouncils/${tribalCouncilId}/tribes/${tribeId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}) })
    .then(response => response.json())
    .then(data => {
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
            style={{ backgroundColor: tribe.color }}
          >
              {tribe.name}
              <Button remove size={'small'} onClick={() => removeTribe(index)} />
          </Tag>
        ))}
      </>
    )
  }

  const removeVote = (index: number) => {
    const voterId = tribalCouncil.votes[index].voterId
    fetch(`http://localhost:5000/tribalCouncils/${tribalCouncil.id}/votes/${voterId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}) })
    .then(response => response.json())
    .then(data => {
      setRefreshTribalCouncil(!refreshTribalCouncil)
    })
    .catch(err => console.log('Error removing vote:', err))
  }

  const formatVote = (vote: any) => {
    if (vote.didNotVote) {
      return `${vote.player.name} did not vote`
    }

    switch (vote.category) {
      case 'vote':
        return `${vote.voter.name} voted for ${vote.votedFor.name}`
        break
      case 'shotInTheDark':
        return `${vote.voter.name} played their shot in the dark`
        break
      case 'extraVote':
        return `${vote.voter.name} cast an extra vote for ${vote.votedFor.name}`
        break
      case 'revote':
        return `Revote: ${vote.voter.name} voted for ${vote.votedFor.name}`
        break
    }
  }

  const renderVotes = () => {
    return (
      <>
        {tribalCouncil.votes?.map((vote: any, index: number) => (
          <tr key={index}>
            <td>{formatVote(vote)}</td>
            <td>
              <FontAwesomeIcon 
                icon={["fas", "xmark"]} 
                visibility={vote.doesNotCount}
              />
            </td>
            <td>
              <Button remove size={'small'} onClick={() => removeVote(index)} />
            </td>
          </tr>
        ))}
      </>
    )
  }

  return (
    <Columns>
      <Columns.Column size={6}>
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
                selectedTribeId={0}
                handleTribeChange={() => {}}
              />
            </Modal.Card.Body>
          </Modal.Card>
        </Modal>
      </Columns.Column>

      <Columns.Column>
        <h3 className='subtitle'>Votes</h3>
        <Table bordered size='fullwidth'>
          {renderVotes()}
        </Table>
        <Modal show={isVoteModalOpen} onClose={() => setIsVoteModalOpen(false)}>
          <Modal.Card>
            <Modal.Card.Header>
              <Modal.Card.Title>Add Tribe to Tribal Council</Modal.Card.Title>
            </Modal.Card.Header>
            <Modal.Card.Body>
              <VoteForm
                tribalCouncilId={tribalCouncilId}
              />
            </Modal.Card.Body>
          </Modal.Card>
        </Modal>
      </Columns.Column>
    </Columns>
  )
}

export default TribalCouncilForm