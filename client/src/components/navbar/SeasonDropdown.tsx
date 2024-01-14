import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { readSeasons } from '../../api'
import { 
  setSelectedSeason, setSelectedEpisode, 
  setSelectedPlayer, setSelectedAdvantage,
  setSelectedTribe 
} from '../../actions/seasons'
import { Form } from 'react-bulma-components'
import { ISeason } from '../../models'
import { RootState } from '../../reducers'

const SeasonDropdown: React.FC = () => {
  const dispatch = useDispatch()
  const [seasons, setSeasons] = useState<ISeason[]>([])
  const selectedSeason: number = useSelector((state: RootState) => state.season.selectedSeason)

  useEffect(() => {
    readSeasons(setSeasons)
  }, [])

  const handleSeasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSeason = Number(e.target.value)
    dispatch(setSelectedSeason(selectedSeason))
    dispatch(setSelectedEpisode(0))
    dispatch(setSelectedPlayer(0))
    dispatch(setSelectedAdvantage(0))
    dispatch(setSelectedTribe(0))
  }

  const renderDropdownItems = (): React.ReactNode => {
    return seasons.map((season: ISeason) => (
      <option key={season.id} value={season.id}>
        Season {season.order}: {season.name}
      </option>
    ))
  }

  return (
    <Form.Select
      onChange={handleSeasonChange}
      value={selectedSeason}
    >
      <option value="0">Choose a season...</option>
      {renderDropdownItems()}
    </Form.Select>
  )
}

export default SeasonDropdown
