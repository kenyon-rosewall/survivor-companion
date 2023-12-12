import React, { useEffect, useState } from 'react'
import { Block, Columns, Form, Button } from 'react-bulma-components'
import { readSeasonPlayer, createSeasonPlayer, updateSeasonPlayer } from '../../api'
import DatePicker from 'react-datepicker'
import { fixDate } from '../../dateUtils'
import PlayerSearch from '../common/playerSearch'

type PlayerFormProps = {
  formType: string
  seasonId: number
  playerOnSeasonId?: number
  onSubmitComplete: (season: any) => void
}

const PlayerForm: React.FC<PlayerFormProps> = ({
  formType, seasonId, playerOnSeasonId, 
  onSubmitComplete
}) => {
  const [formData, setFormData] = useState<any>({
    playerId: 0,
    name: '',
    nickname: '',
    birthday: fixDate(""),
    headshot: 'images/players/default.jpg',
    occupation: '',
    bornLocation: '',
    residenceLocation: '',
    playerNotes: '',
    playerOnSeasonNotes: ''
  })
  const [disableAjax, setDisableAjax] = useState<boolean>(false)

  const updatePlayerInformation = (data: any) => {
    setFormData({
      ...data,
      name: data.player.name,
      nickname: data.player.nickname ? data.player.nickname : "",
      birthday: data.player.birthday ? data.player.birthday : "",
      playerNotes: data.player.notes ? data.player.notes : ""
    })
  }

  useEffect(() => {
    if (formType === 'update' && playerOnSeasonId) {
      readSeasonPlayer(seasonId, playerOnSeasonId, updatePlayerInformation)
    }
  }, [seasonId, formType, playerOnSeasonId])

  const handleInputChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileUpload = (e: any) => {
    // TODO: upload file to server
  }

  const formSubmitCallback = (data: any) => {
    onSubmitComplete(data)
    setDisableAjax(false)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (disableAjax === true) return
    setDisableAjax(true)

    if (formType === 'update' && playerOnSeasonId) {
      updateSeasonPlayer(seasonId, playerOnSeasonId, formData, formSubmitCallback)
    } else {
      createSeasonPlayer(seasonId, formData, formSubmitCallback)
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
  }

  return (
    <form 
      onSubmit={handleFormSubmit}
    >
      <Columns>
        <Columns.Column>
          <PlayerSearch
            handleSelectPlayer={selectPlayer}
          />
        </Columns.Column>
      </Columns>

      <Columns>
        <Columns.Column 
          size={6}
        >
          {formType === 'add' && (
            <Form.Field>
              <Form.Label>
                Name
              </Form.Label>
              <Form.Control>
                <Form.Input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </Form.Control>
            </Form.Field>
          )}
          {formType === 'update' && (
            <Block>
              <Form.Label>
                Name
              </Form.Label>
              {formData.name}
            </Block>
          )}
        </Columns.Column>

        <Columns.Column>
          {formType === 'add' && (
            <Form.Field>
              <Form.Label>
                Nickname
              </Form.Label>
              <Form.Control>
                <Form.Input
                  name="nickname"
                  value={formData.nickname}
                  onChange={handleInputChange}
                />
              </Form.Control>
            </Form.Field>
          )}
          {formType === 'update' && (
            <Block>
              <Form.Label>
                Nickname
              </Form.Label>
              {formData.nickname}
            </Block>
          )}
        </Columns.Column>
      </Columns>

      <Columns>
        <Columns.Column 
          size={6}
        >
          <Form.Field>
            <Form.Label>
              Headshot
            </Form.Label>
            <Form.InputFile
                filename={formData.headshot}
                onChange={handleFileUpload}
              />
          </Form.Field>
        </Columns.Column>

        <Columns.Column>
          {formType === 'add' && (
            <Form.Field>
              <Form.Label>
                Birthday
              </Form.Label>
              <Form.Control>
                <DatePicker
                  dateFormat={'yyyy-MM-dd'}
                  selected={new Date(formData.birthday)}
                  onChange={(date) => setFormData({ ...formData, birthday: date })}
                  showIcon
                />
              </Form.Control>
            </Form.Field>
          )}
          {formType === 'update' && (
            <Block>
              <Form.Label>
                Birthday
              </Form.Label>
              {fixDate(formData.birthday)}
            </Block>
          )}
        </Columns.Column>
      </Columns>

      <Columns>
        <Columns.Column 
          size={6}
        >
          <Form.Field>
            <Form.Label>
              Birth Location
            </Form.Label>
            <Form.Control>
              <Form.Input
                name="bornLocation"
                value={formData.bornLocation}
                onChange={handleInputChange}
              />
            </Form.Control>
          </Form.Field>
        </Columns.Column>

        <Columns.Column>
          <Form.Field>
            <Form.Label>
              Current Residence
            </Form.Label>
            <Form.Control>
              <Form.Input
                name="residenceLocation"
                value={formData.residenceLocation}
                onChange={handleInputChange}
              />
            </Form.Control>
          </Form.Field>
        </Columns.Column>
      </Columns>

      <Columns>
        <Columns.Column 
          size={6}
        >
          <Form.Field>
            <Form.Label>
              Occupation
            </Form.Label>
            <Form.Control>
              <Form.Input
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
              />
            </Form.Control>
          </Form.Field>
        </Columns.Column>
      </Columns>

      {formType === 'add' && (
        <Form.Field>
          <Form.Label>
            Player Notes
          </Form.Label>
          <Form.Control>
            <Form.Textarea
              name="playerNotes"
              value={formData.playerNotes}
              onChange={handleInputChange}
            />
          </Form.Control>
        </Form.Field>
      )}
      {formType === 'update' && (
        <Block>
          <Form.Label>
            Player Notes
          </Form.Label>
          {formData.playerNotes}
        </Block>
      )}

      <Form.Field>
        <Form.Label>
          Notes
        </Form.Label>
        <Form.Control>
          <Form.Textarea
            name="playerOnSeasonNotes"
            value={formData.playerOnSeasonNotes}
            onChange={handleInputChange}
          />
        </Form.Control>
      </Form.Field>

      <Button
        color="primary"
        type="submit"
        disabled={disableAjax}
      >
        { formType === "update" ? "Update Player" : "Add Player" }
      </Button>
    </form>
  )
}

export default PlayerForm