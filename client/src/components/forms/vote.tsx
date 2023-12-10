import React, { useState } from 'react'
import { Button, Form } from 'react-bulma-components'

type VoteFormProps = {
  tribalCouncilId: number
  players: any[]
  handleFormSubmit: (voteData: any) => void
}

const VoteForm: React.FC<VoteFormProps> = ({ tribalCouncilId, players, handleFormSubmit }) => {
  // TODO: Shot in the Dark should be hidden on seasons below 41
  const voteCategories = [
    { name: 'Vote', value: 'vote' }, 
    { name: 'Shot in the Dark', value: 'shotInTheDark' },
    { name: 'Extra Vote', value: 'extraVote'},
    { name: 'Revote', value: 'revote' },
  ]
  const [voteData, setVoteData] = useState<any>({
    tribalCouncilId: tribalCouncilId,
    voterId: 0,
    votedForId: 0,
    category: 'vote',
    doesNotCount: false,
    didNotVote: false,
  })

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setVoteData({ ...voteData, [name]: value })
  }

  const renderCategories = () => {
    return voteCategories.map((category, index) => (
      <option key={index} value={category.value}>{category.name}</option>
    ))
  }

  return (
    <>
      <Form.Field>
        <Form.Label>Player</Form.Label>
        <Form.Control>
          <Form.Select
            name='voterId'
            value={voteData.voterId}
            onChange={handleInputChange}
          >
            <option value={0}>Select Player</option>
            {players.map(player => (
              <option key={player.id} value={player.id}>{player.player?.name}</option>
            ))}
          </Form.Select>
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>Voted For</Form.Label>
        <Form.Control>
          <Form.Select
            name='votedForId'
            value={voteData.votedForId}
            onChange={handleInputChange}
          >
            <option value={0}>Select Player</option>
            {players.map(player => (
              <option key={player.id} value={player.id}>{player.player?.name}</option>
            ))}
          </Form.Select>
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Label>Category</Form.Label>
        <Form.Control>
          <Form.Select
            name='category'
            value={voteData.category}
            onChange={handleInputChange}
          >
            {renderCategories()}
          </Form.Select>
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Control>
          <Form.Checkbox
            name='doesNotCount'
            checked={voteData.doesNotCount}
            onChange={() => setVoteData({ ...voteData, doesNotCount: !voteData.doesNotCount })}
          >
            Does Not Count
          </Form.Checkbox>
        </Form.Control>
      </Form.Field>

      <Form.Field>
        <Form.Control>
          <Form.Checkbox
            name='didNotVote'
            checked={voteData.didNotVote}
            onChange={() => setVoteData({ ...voteData, didNotVote: !voteData.didNotVote })}
          >
            Did Not Vote
          </Form.Checkbox>
        </Form.Control>
      </Form.Field>

      <Button onClick={() => handleFormSubmit(voteData)}>Add Vote</Button>
    </>
  )
}

export default VoteForm