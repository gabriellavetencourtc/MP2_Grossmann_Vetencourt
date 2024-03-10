import React from 'react'
import './VideogameCard.css'

function VideogameCard({videogame}) {
  return (
    <div className='card__wrapper'>
        <p className='game__title'>
            {videogame?.titulo}
        </p>
        <p className='game__genre'>
            {videogame?.genero}
        </p>
        <p className='game__description'>{videogame?.descripcion}</p>
    </div>
  )
}

export default VideogameCard