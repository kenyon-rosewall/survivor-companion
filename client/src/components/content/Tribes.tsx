import React from 'react'
import TribeForm from '../forms/tribe'
import { Block } from 'react-bulma-components'

type TribesProps = {
  seasonId: number,
  tribeId: number
}

const Tribes: React.FC<TribesProps> = ({ seasonId, tribeId }) => {
  const handleFormSubmit = () => {
    // TODO: update tribe in state
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
      />
    </Block>
  )
}

export default Tribes