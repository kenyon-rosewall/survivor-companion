import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Menu, Modal } from 'react-bulma-components'
import { readSeasons } from '../../api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setSelectedSeason } from '../../actions/seasons'
import ModalForm from '../common/modalForm'
import SeasonForm from '../forms/season'

type SeasonsSidebarProps = {
  seasonId: number
}

const SeasonsSidebar: React.FC<SeasonsSidebarProps> = ({ seasonId }) => {
  const dispatch = useDispatch()
  const [seasons, setSeasons] = useState<any[]>([])
  const [maxOrder, setMaxOrder] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const findMaxOrder = (s: any[]) => {
    return Math.max.apply(Math, s.map((o: any) => { return o.order }))
  }

  const seasonsCallback = (data: any) => {
    setSeasons(data)
    setMaxOrder(findMaxOrder(data))
  }

  useEffect(() => {
    readSeasons(seasonsCallback)
  }, [seasonId])

  const renderSeasons = () => {
    if (Array.isArray(seasons) && seasons.length > 0) {
      return seasons.map((season, index) => (
        <Menu.List.Item
          key={season.id}
          active={seasonId === season.id}
          onClick={() => dispatch(setSelectedSeason(season.id))}
        >
          {season.name}
        </Menu.List.Item>
      ))
    }
  }

  const handleFormSubmit = (season: any) => {
    setIsModalOpen(false)
    dispatch(setSelectedSeason(season.id))
  }

  return (
    <>
      <Menu.List.Item
        onClick={() => setIsModalOpen(true)}
      >
        <FontAwesomeIcon icon={["fas", "plus"]} />
        <span>Add Season</span>
      </Menu.List.Item>

      {renderSeasons()}

      <ModalForm
        title="Add Season"
        isModalOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
      >
        <SeasonForm
          maxOrder={maxOrder}
          onSubmitComplete={handleFormSubmit}
        />
      </ModalForm>
    </>
  )
}

export default SeasonsSidebar