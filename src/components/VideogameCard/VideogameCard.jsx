import React from 'react'
import './VideogameCard.css'

function VideogameCard({videogame, dark}) {
  return (
    <div className={`card__wrapper ${dark ? 'card__wrapper__dark' : ''}`}>
      <p className={`game__title ${dark ? 'game__title__dark' : ''}`}>
        {videogame?.titulo}
      </p>
      <p className={`game__genre ${dark ? 'game__genre__dark' : ''}`}>
        {videogame?.genero}
      </p>
      <p className={`game__description ${dark ? 'game__description__dark' : ''}`}>
        {videogame?.descripcion}
      </p>
    </div>
    
  )
}

export default VideogameCard