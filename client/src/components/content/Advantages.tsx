import React from 'react'
import AdvantageForm from '../forms/advantage'

type AdvantagesProps = {
  advantageId: number
}

const Advantages: React.FC<AdvantagesProps> = ({ advantageId }) => {
  const handleFormSubmit = (advantage: any) => {
    // TODO: update advantage in state
  }

  return (
    <>
      <AdvantageForm
        formType='update'
        advantageId={advantageId}
        onSubmitComplete={handleFormSubmit}
      />
    </>
  )
}

export default Advantages