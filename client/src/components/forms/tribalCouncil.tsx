import React, { useState, useEffect } from 'react'
import { Button, Columns, Modal, Table, Tag } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  getTribalCouncil, getPlayersInTribalCouncil, 
  addTribeToTribalCouncil, removeTribeFromTribalCouncil,
  addVoteToTribalCouncil, removeVoteFromTribalCouncil
} from '../../api'
import Subtitle from '../common/subtitle'
import TribeSelect from '../common/tribeSelect'
import ModalForm from '../common/modalForm'
import VoteForm from './vote'

type TribalCouncilFormProps = {
  tribalCouncilId: any
  tribes: any[]
}

const TribalCouncilForm: React.FC<TribalCouncilFormProps> = ({ 
  tribalCouncilId, tribes 
}) => {
  const [tribalCouncil, setTribalCouncil] = useState<any>({})
  const [players, setPlayers] = useState<any[]>([])
  const [isTribeModalOpen, setIsTribeModalOpen] = useState<boolean>(false)
  const [isVoteModalOpen, setIsVoteModalOpen] = useState<boolean>(false)
  const [disableAjax, setDisableAjax] = useState<boolean>(false)
  const [tribeData, setTribeData] = useState<any>({
    tribalCouncilId: tribalCouncilId,
    tribeId: 0,
  })

  useEffect(() => {
    if (tribalCouncilId === 0) return

    getTribalCouncil(tribalCouncilId, setTribalCouncil)
    getPlayersInTribalCouncil(tribalCouncilId, setPlayers)
  }, [tribalCouncilId, getTribalCouncil, getPlayersInTribalCouncil])

  const changeCallback = (d: any) => {
    setDisableAjax(false)
    setIsTribeModalOpen(false)
    getTribalCouncil(tribalCouncilId, setTribalCouncil)
    getPlayersInTribalCouncil(tribalCouncilId, setPlayers)
  }

  const addTribe = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    if (disableAjax === true || tribeData.tribeId === 0) return
    setDisableAjax(true)

    addTribeToTribalCouncil(tribeData, changeCallback)
  }

  const removeTribe = (tribeId: number) => {
    if (disableAjax === true) return
    setDisableAjax(true)

    removeTribeFromTribalCouncil(tribalCouncilId, tribeId, changeCallback)
  }

  const addVote = (voteData: any) => {
    if (disableAjax === true) return
    setDisableAjax(true)

    addVoteToTribalCouncil(tribalCouncilId, voteData, changeCallback)
  }

  const removeVote = (voteId: number) => {
    if (disableAjax === true) return
    setDisableAjax(true)

    removeVoteFromTribalCouncil(tribalCouncilId, voteId, changeCallback)
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

  const renderHeader = () => {
    return (
      <thead>
        <tr>
          <th>Vote</th>
          <th>Counts</th>
          <th></th>
        </tr>
      </thead>
    )
  }

  const renderTribes = () => {
    return (
      <>
        {tribalCouncil.tribes?.map((tribe: any) => (
          <Tag
            key={tribe.id}
            size={'large'}
            style={{ 
              backgroundColor: tribe.color, 
              color: 'white' 
            }}
          >
            {tribe.name}
            <Button 
              remove 
              size={'small'} 
              onClick={() => removeTribe(tribe.id)} 
            />
          </Tag>
        ))}
      </>
    )
  }

  const renderVotes = () => {
    return (
      <tbody>
        {tribalCouncil.votes?.map((vote: any) => (
          <tr 
            key={vote.id}
          >
            <td>
              {formatVote(vote)}
            </td>
            <td 
              width={2} 
              align='center'
            >
              <FontAwesomeIcon 
                icon={["fas", vote.doesNotCount ? "square-xmark" : "square-check" ]} 
              />
            </td>
            <td 
              width={2}
            >
              <Button 
                remove 
                size={'small'} 
                onClick={() => removeVote(vote.id)} 
              />
            </td>
          </tr>
        ))}
      </tbody>
    )
  }

  const handleTribeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTribeData({ ...tribeData, tribeId: parseInt(e.target.value) })
  }

  return (
    <Columns>
      <Columns.Column 
        size={3}
      >
        <Button 
          className='is-pulled-right' 
          onClick={() => setIsTribeModalOpen(true)}
        >
          Add Tribe
        </Button>

        <Subtitle>Tribes</Subtitle>
        <Tag.Group>
          {renderTribes()}
        </Tag.Group>

        <ModalForm
          title='Add Tribe to Tribal Council'
          isModalOpen={isTribeModalOpen}
          toggleModal={() => setIsTribeModalOpen(false)}
        >
          <TribeSelect
            tribes={tribes}
            selectedTribeId={tribeData.tribeId}
            handleTribeChange={handleTribeChange}
          />

          <Button onClick={addTribe}>Add Tribe</Button>
        </ModalForm>
        
      </Columns.Column>

      <Columns.Column 
        size={9}
      >
        <Button 
          className='is-pulled-right' 
          onClick={() => setIsVoteModalOpen(true)}
        >
          Add Vote
        </Button>

        <Subtitle>Votes</Subtitle>
        <Table 
          bordered 
          size='fullwidth'
        >
          {renderHeader()}
          {renderVotes()}
        </Table>

        <ModalForm
          title='Add Vote to Tribal Council'
          isModalOpen={isVoteModalOpen}
          toggleModal={() => setIsVoteModalOpen(false)}
        >
          <VoteForm
            tribalCouncilId={tribalCouncilId}
            players={players}
            handleFormSubmit={addVote}
          />
        </ModalForm>

      </Columns.Column>
    </Columns>
  )
}

export default TribalCouncilForm