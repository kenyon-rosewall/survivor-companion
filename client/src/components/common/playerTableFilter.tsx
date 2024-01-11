import React from 'react'
import { Button, Form } from 'react-bulma-components'
import { PlayerFilter, ITribe, IAlliance } from '../../models'

type PlayerTableFilterProps = {
  filter: PlayerFilter
  tribes: ITribe[]
  alliances: IAlliance[]
  callback: (o: PlayerFilter) => void
}

const PlayerTableFilter: React.FC<PlayerTableFilterProps> = ({ 
  filter, tribes, alliances, callback 
}) => {
  const renderTribes = (): React.ReactNode => {
    if (!tribes) return

    return tribes.map((tribe: ITribe) => (
      <option
        key={tribe.id} 
        value={tribe.id}
      >
        {tribe.name}
      </option>
    ))
  }

  const renderAlliances = (): React.ReactNode => {
    if (!alliances) return

    return alliances.map((alliance: IAlliance) => (
      <option 
        key={alliance.id} 
        value={alliance.id}
      >
        {alliance.name}
      </option>
    ))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name: string = e.target.name
    let value: string | number
    
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