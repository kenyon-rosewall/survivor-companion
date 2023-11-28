import React from 'react'
import AdvantageForm from '../forms/advantage'

type ManageAdvantagesProps = {
  advantageId: number
}

const ManageAdvantages: React.FC<ManageAdvantagesProps> = ({ advantageId }) => {
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

export default ManageAdvantages