import React, { useState } from 'react'
import { Button, Form } from 'react-bulma-components'
import { IPlayerInEpisode, IVote, VoteCategoryEnum } from '../../models'

type VoteFormProps = {
  tribalCouncilId: number
  playersInEpisode: IPlayerInEpisode[]
  handleFormSubmit: (voteData: any) => void
}

type VoteCategory = {
  label: string
  value: VoteCategoryEnum
}

const VoteForm: React.FC<VoteFormProps> = ({
  tribalCouncilId, playersInEpisode, handleFormSubmit
}) => {
  // TODO: Shot in the Dark should be hidden on seasons below 41
  const voteCategories: VoteCategory[] = [
    { label: 'Vote', value: VoteCategoryEnum.Vote }, 
    { label: 'Shot in the Dark', value: VoteCategoryEnum.ShotInTheDark },
    { label: 'Extra Vote', value: VoteCategoryEnum.ExtraVote},
    { label: 'Revote', value: VoteCategoryEnum.Revote },
  ]
  const [voteData, setVoteData] = useState<IVote>({
    id: 0,
    tribalCouncilId: tribalCouncilId,
    voterId: 0,
    votedForId: 0,
    category: VoteCategoryEnum.Vote,
    doesNotCount: false,
    didNotVote: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVoteData({ ...voteData, [e.target.name]: e.target.value })
  }

  const renderCategories = (): React.ReactNode => {
    return voteCategories.map((category: VoteCategory, index: number) => (
      <option key={index} value={category.value}>{category.label}</option>
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
            {playersInEpisode.map((player: IPlayerInEpisode) => (
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
            {playersInEpisode.map((player: IPlayerInEpisode) => (
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