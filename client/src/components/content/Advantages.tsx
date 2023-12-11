import React from 'react'
import AdvantageForm from '../forms/advantage'
import { Block } from 'react-bulma-components'

type AdvantagesProps = {
  advantageId: number
}

const Advantages: React.FC<AdvantagesProps> = ({ advantageId }) => {
  const handleFormSubmit = (advantage: any) => {
    // TODO: update advantage in state
  }

  return (
    <Block
      className={ advantageId === 0 ? 'is-hidden' : '' }
    >
      <AdvantageForm
        formType='update'
        advantageId={advantageId}
        onSubmitComplete={handleFormSubmit}
      />
    </Block>
  )
}

export default Advantages