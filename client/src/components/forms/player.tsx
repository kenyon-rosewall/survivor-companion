import React, { useEffect, useState } from 'react'
import { Block, Columns, Dropdown, Form, Button } from 'react-bulma-components'
import DatePicker from 'react-datepicker'
import { fixDates } from '../../dateUtils'
import { render } from '@testing-library/react'

type PlayerFormProps = {
  formType: string,
  seasonId: number,
  playerOnSeasonId?: number,
  onSubmitComplete: (season: any) => void
}

const PlayerForm: React.FC<PlayerFormProps> = (props: PlayerFormProps) => {
  const buttonText = props.formType === 'update' ? 'Update Player' : 'Add Player'
  const formDisabled = props.formType === 'update' && !props.playerOnSeasonId
  const dateOptions: any = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  const [formData, setFormData] = useState<any>({
    playerId: 0,
    name: '',
    nickname: '',
    birthday: new Date().toLocaleDateString('en-US', dateOptions),
    headshot: 'images/players/default.jpg',
    occupation: '',
    bornLocation: '',
    residenceLocation: '',
    playerNotes: '',
    playerOnSeasonNotes: ''
  })
  const [players, setPlayers] = useState<any[]>([])
  const [disableButton, setDisableButton] = useState<boolean>(false)

  useEffect(() => {
    if (props.formType === 'update' && props.playerOnSeasonId) {
      fetch(`http://localhost:5000/seasons/${props.seasonId}/players/${props.playerOnSeasonId}`)
      .then(response => response.json())
      .then(data => {
        setFormData({
          ...data.data,
          name: data.data.player.name,
          nickname: data.data.player.nickname ? data.data.player.nickname : "",
          birthday: data.data.player.birthday ? data.data.player.birthday : "",
        })
      })
      .catch(err => console.error('Error fetching episode:', err))
    }
  }, [props.playerOnSeasonId])

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileUpload = (e: any) => {
    const { name, files } = e.target
    setFormData({ ...formData, [name]: files[0] })
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDisableButton(true)

    let url = `http://localhost:5000/seasons/${props.seasonId}/players`
    let method = 'POST'
    if (props.formType === 'update') {
      url = `http://localhost:5000/seasons/${props.seasonId}/players/${props.playerOnSeasonId}`
      method = 'PUT'
    }

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      props.onSubmitComplete(data.data)
      setDisableButton(false)
    })
    .catch(err => console.error('Error adding player:', err))
  }

  const handleSearch = (e: any) => {
    e.preventDefault()

    const q = e.target.value
    if (q.length > 2) {
      fetch(`http://localhost:5000/players/search/${q}`)
        .then(response => response.json())
        .then(data => {
          setPlayers(data.data)
        })
        .catch(err => console.error('Error fetching players:', err))
    } else {
      setPlayers([])
    }
  }

  const selectPlayer = (player: any) => {
    setFormData({
      ...formData,
      playerId: player.id,
      name: player.name,
      nickname: player.nickname ? player.nickname : "",
      birthday: player.birthday ? player.birthday : "",
      playerNotes: player.notes ? player.notes : ""
    })
    setPlayers([])
    const searchEl = document.getElementById('playerSearch')
    if (searchEl) {
      searchEl.setAttribute("value", "player.name")
    }
  }

  const renderPlayers = () => {
    if (Array.isArray(players) && players.length > 0) {
      return players.map((player, index) => (
        <a className='dropdown-item'
          key={player.item.id}
          onClick={selectPlayer.bind(this, player.item)}
        >
          {player.item.name}
        </a>
      ))
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Columns>
        <Columns.Column>
        <Form.Field>
          <Form.Control>
            <div className="dropdown is-active">
              <div className="dropdown-trigger">
                <Form.Input
                  name="q"
                  id="playerSearch"
                  placeholder="Search existing players..."
                  onChange={handleSearch}
                  disabled={formDisabled}
                />
                <input type='hidden' name='playerId' value={formData.playerId} />
              </div>
              <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  {renderPlayers()}
                </div>
              </div>
            </div>
          </Form.Control>
        </Form.Field>
        </Columns.Column>
      </Columns>

      <Columns>
        <Columns.Column size={6}>
          {props.formType === 'add' && (
            <Form.Field>
              <Form.Label>Name</Form.Label>
              <Form.Control>
                <Form.Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Form.Control>
            </Form.Field>
          )}
          {props.formType === 'update' && (
            <Block>
              <Form.Label>Name</Form.Label>
              {formData.name}
            </Block>
          )}
        </Columns.Column>

        <Columns.Column>
          {props.formType === 'add' && (
            <Form.Field>
              <Form.Label>Nickname</Form.Label>
              <Form.Control>
                <Form.Input
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                />
              </Form.Control>
            </Form.Field>
          )}
          {props.formType === 'update' && (
            <Block>
              <Form.Label>Nickname</Form.Label>
              {formData.nickname}
            </Block>
          )}
        </Columns.Column>
      </Columns>

      <Columns>
        <Columns.Column size={6}>
          <Form.Field>
            <Form.Label>Headshot</Form.Label>
            <Form.InputFile
                filename={formData.headshot}
                onChange={handleFileUpload}
              />
          </Form.Field>
        </Columns.Column>

        <Columns.Column>
          {props.formType === 'add' && (
            <Form.Field>
              <Form.Label>Birthday</Form.Label>
              <Form.Control>
                <DatePicker
                  dateFormat={'yyyy-MM-dd'}
                  selected={new Date(formData.birthday)}
                  onChange={(date) => setFormData({ ...formData, birthday: date })}
                  showIcon
                  disabled={formDisabled}
                />
              </Form.Control>
            </Form.Field>
          )}
          {props.formType === 'update' && (
            <Block>
              <Form.Label>Birthday</Form.Label>
              {new Date(formData.birthday).toLocaleDateString('en-US', dateOptions)}
            </Block>
          )}
        </Columns.Column>
      </Columns>

      <Columns>
        <Columns.Column size={6}>
          <Form.Field>
            <Form.Label>Birth Location</Form.Label>
            <Form.Control>
              <Form.Input
                name="bornLocation"
                value={formData.bornLocation}
                onChange={handleInputChange}
                disabled={formDisabled}
              />
            </Form.Control>
          </Form.Field>
        </Columns.Column>

        <Columns.Column>
          <Form.Field>
            <Form.Label>Current Residence</Form.Label>
            <Form.Control>
              <Form.Input
                name="residenceLocation"
                value={formData.residenceLocation}
                onChange={handleInputChange}
                disabled={formDisabled}
              />
            </Form.Control>
          </Form.Field>
        </Columns.Column>
      </Columns>

      <Columns>
        <Columns.Column size={6}>
          <Form.Field>
            <Form.Label>Occupation</Form.Label>
            <Form.Control>
              <Form.Input
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                disabled={formDisabled}
              />
            </Form.Control>
          </Form.Field>
        </Columns.Column>
      </Columns>

      {props.formType === 'add' && (
        <Form.Field>
          <Form.Label>Player Notes</Form.Label>
          <Form.Control>
            <Form.Textarea
              name="playerNotes"
              onChange={handleInputChange}
              disabled={formDisabled}
            />
          </Form.Control>
        </Form.Field>
      )}
      {props.formType === 'update' && (
        <Block>
          <Form.Label>Player Notes</Form.Label>
          {formData.playerNotes}
        </Block>
      )}

      <Form.Field>
        <Form.Label>Notes</Form.Label>
        <Form.Control>
          <Form.Textarea
            name="playerOnSeasonNotes"
            onChange={handleInputChange}
            disabled={formDisabled}
          />
        </Form.Control>
      </Form.Field>

      <Button
        color="primary"
        type="submit"
        disabled={formDisabled || disableButton}
      >
        {buttonText}
      </Button>
    </form>
  )
}

export default PlayerForm