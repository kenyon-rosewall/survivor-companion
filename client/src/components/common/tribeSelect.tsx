import React from 'react'
import { Form } from 'react-bulma-components'

type tribeSelectProps = {
  tribes: any[]
  selectedTribeId: number
  handleTribeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const TribeSelect: React.FC<tribeSelectProps> = ({ tribes, selectedTribeId, handleTribeChange }) => {
  const renderTribes = () => {
    return (
      <>
        <option value="0" data-color=""></option>
        {tribes.map(tribe => (
          <option
            key={tribe.id}
            value={tribe.id}
            data-color={tribe.color}
          >
            {tribe.name}
          </option>
        ))}
      </>
    )
  }

  return (
    <Form.Select
      value={selectedTribeId}
      onChange={handleTribeChange}
    >
      {renderTribes()}
    </Form.Select>
  )
}

export default TribeSelect