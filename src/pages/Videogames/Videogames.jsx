import React, { useEffect, useState } from 'react'
import './Videogames.css'
import { CiSearch } from "react-icons/ci";
import { getAllVideogames } from '../../controllers/videogames';
import VideogameCard from '../../components/VideogameCard/VideogameCard';
import { useUser } from '../../context/user';
import { useNavigate } from 'react-router-dom';

function Videogames() {

    const [videogamesList, setVideoGamesList] = useState([])
    const [filterVideogamesList, setFilterVideogamesList] = useState([])

    const { user } = useUser();

    const navigate = useNavigate();

    useEffect(() => {
        const handleGetVideogames = async () => {
            if(!user){
                navigate('/')
            }
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

export default Videogames