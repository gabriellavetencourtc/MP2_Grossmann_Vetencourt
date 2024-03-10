import React from 'react'
import './ClubCard.css'
function ClubCard({club}) {
  return (
    <div className='card__wrapper'>
        <p className='game__title'>
            {club?.nombre}
        </p>
        <p className='game__description'>{club?.descripcion}</p>
    </div>
  )
}

export default ClubCard