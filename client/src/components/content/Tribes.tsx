import React from 'react'
import TribeForm from '../forms/tribe'

type TribesProps = {
  seasonId: number,
  tribeId: number
}

const Tribes: React.FC<TribesProps> = ({ seasonId, tribeId }) => {
  const handleFormSubmit = (tribe: any) => {
    // TODO: update tribe in state
  }

  return (
    <>
      <TribeForm
        formType='update'
        seasonId={seasonId}
        tribeId={tribeId}
        onSubmitComplete={handleFormSubmit}
      />
    </>
  )
}

export default Tribes