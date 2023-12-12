import React, { useEffect, useState } from 'react'
import { Block, Tag } from 'react-bulma-components'
import { readTribeMembers } from '../../api'
import Subtitle from '../common/subtitle'
import TribeForm from '../forms/tribe'

type TribesProps = {
  seasonId: number,
  tribeId: number
}

const Tribes: React.FC<TribesProps> = ({ seasonId, tribeId }) => {
  const [originalMembers, setOriginalMembers] = useState<any[]>([])
  const [tribeColor, setTribeColor] = useState<string>('')

  useEffect(() => {
    if (tribeId === 0) return

    readTribeMembers(tribeId, setOriginalMembers)
  }, [tribeId])


  const handleFormSubmit = () => {
    // TODO: update tribe in state
  }

  const renderOriginalMembers = () => {
    return originalMembers.map((member: any) => {
      return (
        <Tag 
          key={member.id}
          size={'medium'}
          style={{
            backgroundColor: tribeColor,
            color: 'black'
          }}
        >
          {member.player.name} 
          { member.player.nickname ? `(${member.player.nickname})` : '' }
        </Tag>
      )
    })
  }

  return (
    <Block
      className={ tribeId === 0 ? 'is-hidden' : '' }
    >
      <TribeForm
        formType='update'
        seasonId={seasonId}
        tribeId={tribeId}
        onSubmitComplete={handleFormSubmit}
        setTribeColor={setTribeColor}
      />

      <br /><br />

      <Block>
        <Subtitle>Original Members</Subtitle>
        <Tag.Group>
          {renderOriginalMembers()}
        </Tag.Group>
      </Block>
    </Block>
  )
}

export default Tribes