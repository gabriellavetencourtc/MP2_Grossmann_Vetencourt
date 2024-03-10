import React from 'react'
import './Club.css'
import { GiGriffinShield } from 'react-icons/gi'
import { IoMdClose } from 'react-icons/io'

function Club() {
  return (
    <div className="modal">
        <div className="modal__wrapper">
            <div className='modal__header'>
                <IoMdClose onClick={closeModal} size={30} color='#FFF'/>
            </div>
            
            <div className='modal__content'>
                <div className='modal__clubcard__banner'>
                    <GiGriffinShield size={60} color='#3A9E57'/>
                </div>
                <div className='modal__clubcard__info'>
                    <div className='flex-space-between pb-10'>
                        <p className='modal__game__title'>
                            {selectedClub?.nombre}
                        </p>
                        {findSubscription(selectedClub.Id) ? (
                            <button className='modal__unsubscribe' onClick={() => handleUnsubscribeToClub(selectedClub.Id)}>Unsubscribe</button>
                        ): (
                            <button className='modal__subscribe' onClick={() => handleSubscribeToClub(selectedClub.Id)}>Subscribe</button>
                        )}
                    </div>
                    <p className='modal__game__description'>{selectedClub?.descripcion}</p>
                    <p>Videogames in the club</p>
                    <div className='clubs__list'>
                        {selectedClubGames.length > 0 && selectedClubGames.map((clubGame, index)=> (
                            <VideogameCard videogame={clubGame} key={index} dark={true}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Club