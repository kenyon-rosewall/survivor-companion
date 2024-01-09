import React, { useState, useEffect } from 'react'
import { Block, Columns, Form, Button } from 'react-bulma-components'
import { createSeasonPlayer, updateSeasonPlayer, readSeason } from '../../api'
import DatePicker from 'react-datepicker'
import { fixDate, calculateAge } from '../../utils'
import PlayerSearch from '../common/playerSearch'

type PlayerFormProps = {
  formType: string
  seasonId: number
  playerOnSeason?: any
  onSubmitComplete: (season: any) => void
}

const PlayerForm: React.FC<PlayerFormProps> = ({
  formType, seasonId, playerOnSeason, 
  onSubmitComplete
}) => {
  const [formData, setFormData] = useState<any>({
    playerId: 0,
    name: '',
    nickname: '',
    birthday: fixDate(""),
    headshot: 'images/players/default.jpg',
    occupation: '',
    hometown: '',
    residenceLocation: '',
    playerNotes: '',
    playerOnSeasonNotes: ''
  })
  const [disableAjax, setDisableAjax] = useState<boolean>(false)
  const [season, setSeason] = useState<any>({})

  useEffect(() => {
    if (playerOnSeason && playerOnSeason.player) {
      setFormData({
        playerId: playerOnSeason.playerId,
        headshot: playerOnSeason.headshot,
        occupation: playerOnSeason.occupation,
        residenceLocation: playerOnSeason.residenceLocation,
        playerOnSeasonNotes: playerOnSeason.notes,
        name: playerOnSeason.player.name,
        nickname: playerOnSeason.player.nickname,
        playerNotes: playerOnSeason.player.notes,
        hometown: playerOnSeason.player.hometown,
        birthday: fixDate(playerOnSeason.player.birthday)
      })
    }

    if (seasonId > 0) {
      readSeason(seasonId, setSeason)
    }
  }, [playerOnSeason])

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

    if (formType === 'update' && playerOnSeason) {
      updateSeasonPlayer(seasonId, playerOnSeason.id, formData, formSubmitCallback)
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
      hometown: player.hometown ? player.hometown : "",
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
        <Columns.Column>
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
              <br />
              ({calculateAge(formData.birthday, season.airingStart)} years old)
            </Block>
          )}
        </Columns.Column>

        <Columns.Column>
          {formType === 'add' && (
            <Form.Field>
              <Form.Label>
                Hometown
              </Form.Label>
              <Form.Control>
                <Form.Input
                  name="hometown"
                  value={formData.hometown}
                  onChange={handleInputChange}
                />
              </Form.Control>
            </Form.Field>
          )}
          {formType === 'update' && (
            <Block>
              <Form.Label>
                Hometown
              </Form.Label>
              {formData.hometown}
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

        <Columns.Column>
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