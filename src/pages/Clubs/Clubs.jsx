import React, { useEffect, useState } from 'react'
import './Clubs.css'

function Clubs() {
    const [clubsList, setClubsList] = useState([])
    const [filterClubsList, setFilterClubsList] = useState([])

    useEffect(() => {
        const handleGetVideogames = async () => {
            const videogames = await getAllVideogames();
    
            if (videogames.length > 0) {
                setVideoGamesList(videogames);
                setFilterVideogamesList(videogames)
            }
        };
    
        handleGetVideogames();
    }, []);
    

   const handleFilter = (value) => {
    const filteredGames = videogamesList.filter(game =>
        game.titulo.toLowerCase().includes(value.toLowerCase())
    );

    setFilterVideogamesList(filteredGames)
   } 

  return (
    <div className='videogames__container'>
        <div className='videogames__header'>
            <p>Videogames</p>
            <div className='search_bar_wrapper'>
                <CiSearch size={24} color='#3A9E57'/>
                <input placeholder='search for a videogame...' className='search_bar' onChange={(e) => handleFilter(e.target.value)}/>
            </div>

        </div>
        <div className='videogames__list'>
            {filterVideogamesList.length > 0 && filterVideogamesList.map((videogame, index)=> (
                <VideogameCard key={index} videogame={videogame}/>
            ))}
        </div>
    </div>
  )
}

export default Clubs