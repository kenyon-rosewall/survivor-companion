import React from 'react'
import { Button, Form } from 'react-bulma-components'

type PlayerTableFilterProps = {
  filter: any
  tribes: any[]
  alliances: any[]
  callback: (o: any) => void
}

const PlayerTableFilter: React.FC<PlayerTableFilterProps> = ({ 
  filter, tribes, alliances, callback 
}) => {
  const renderTribes = () => {
    if (!tribes) return
    return tribes.map((tribe: any, index: number) => (
      <option
        key={index} 
        value={tribe.id}
      >
        {tribe.name}
      </option>
    ))
  }

  const renderAlliances = () => {
    if (!alliances) return
    return alliances.map((alliance: any, index: number) => (
      <option 
        key={index} 
        value={alliance.id}
      >
        {alliance.name}
      </option>
    ))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name
    let value = null
    switch (name) {
      case 'hasAdvantage':
        value = e.target.value
        break
      default:
        value = Number(e.target.value)
        break
    }
      
    callback({ ...filter, [name]: value })
  }

  return (
    <Form.Field kind='group' align='right'>
      <Form.Control>
        <Form.Field horizontal>
          <Form.Field.Label>
            <Form.Label size={'small'}>Tribe</Form.Label>
          </Form.Field.Label>
          <Form.Field.Body>
            <Form.Field>
              <Form.Control>
                <Form.Select
                  size={'small'}
                  name='tribe'
                  value={filter.tribe}
                  onChange={handleSelectChange}
                >
                  <option value=''></option>
                  {renderTribes()}
                </Form.Select>
              </Form.Control>
            </Form.Field>
          </Form.Field.Body>
        </Form.Field>
      </Form.Control>

      <Form.Control>
        <Form.Field horizontal>
          <Form.Field.Label>
            <Form.Label size={'small'}>Advantage</Form.Label>
          </Form.Field.Label>
          <Form.Field.Body>
            <Form.Control>
              <Form.Select
                size={'small'}
                name='hasAdvantage'
                value={filter.hasAdvantage}
                onChange={handleSelectChange}
              >
                <option value=''></option>
                <option value='yes'>Yes</option>
                <option value='no'>No</option>
              </Form.Select>
            </Form.Control>
          </Form.Field.Body>
        </Form.Field>
      </Form.Control>

      <Form.Control>
        <Form.Field horizontal>
          <Form.Field.Label>
            <Form.Label size={'small'}>Alliance</Form.Label>
          </Form.Field.Label>
          <Form.Field.Body>
            <Form.Control>
              <Form.Select
                size={'small'}
                name='alliance'
                value={filter.alliance}
                onChange={handleSelectChange}
              >
                <option value=''></option>
                {renderAlliances()}
              </Form.Select>
            </Form.Control>
          </Form.Field.Body>
        </Form.Field>
      </Form.Control>

      <Button
        size={'small'}
        color='primary'
        onClick={() => callback({ tribe: 0, hasAdvantage: '', alliance: 0 })}
      >
        Clear
      </Button>
    </Form.Field>
  )
}

export default PlayerTableFilter