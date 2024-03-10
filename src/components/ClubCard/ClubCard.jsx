import React from 'react'
import './ClubCard.css'
import { GiGriffinShield } from "react-icons/gi";
function ClubCard({club, setShowModal, setSelectedClub, handleGetVideoGamesForClub}) {

  const handleClick = () => {
    setSelectedClub(club)
    setShowModal(true)
    handleGetVideoGamesForClub(club)
  }

  return (
    <div className='clubcard__wrapper' onClick={() => handleClick()}>
        <div className='clubcard__banner'>
            <GiGriffinShield size={60} color='#3A9E57'/>
        </div>
        <div className='clubcard__info'>
            <p className='game__title'>
                {club?.nombre}
            </p>
            <p className='game__description'>{club?.descripcion}</p>
        </div>
    </div>
  )
}

export default ClubCard