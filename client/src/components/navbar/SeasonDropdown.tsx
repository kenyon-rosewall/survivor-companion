import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { readSeasons } from '../../api'
import { 
  setSelectedSeason, setSelectedEpisode, 
  setSelectedPlayer, setSelectedAdvantage,
  setSelectedTribe 
} from '../../actions/seasons'
import { Form } from 'react-bulma-components'

const SeasonDropdown: React.FC = () => {
  const dispatch = useDispatch()
  const [seasons, setSeasons] = useState<any[]>([])
  const selectedSeason: number = useSelector((state: any) => state.season.selectedSeason)

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

  const renderDropdownItems = () => {
    return seasons.map((season, index) => (
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
