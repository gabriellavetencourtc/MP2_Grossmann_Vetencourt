import React, { useEffect, useState } from 'react'
import './Club.css'
import { GiGriffinShield } from 'react-icons/gi'
import { FaChevronLeft } from "react-icons/fa";
import { addNewMembership, removeMembership } from '../../controllers/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../context/user';
import { getClubById } from '../../controllers/clubs';
import { getVideogameById } from '../../controllers/videogames';
import VideogameCard from '../../components/VideogameCard/VideogameCard';

function Club() {

    const [club, setClub] = useState(null)
    const [clubGames, setClubGames] = useState([])

    const { user } = useUser();

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {

        const handleGetClubById = async(clubId) => {
            const currentClub = await getClubById(clubId);
            if(currentClub){
                setClub(currentClub)
                handleGetVideoGamesForClub(currentClub)
            }
        }

        if(!user){
            navigate('/login')
        }else{
            handleGetClubById(id)
        }
    }, [user]);

    const handleSubscribeToClub = async (clubId) => {
        if(user && clubId){
            const result = await addNewMembership(user.uid, clubId)
            if(result){
                alert('Successfully subscribed!!')
            }else{
                console.log('Error in subscription')
            }
        }
    }
    const handleUnsubscribeToClub = async (clubId) => {
        if(user && clubId){
            const result = await removeMembership(user.uid, clubId)
            if(result){
                console.log('Unsubscribed')
            }else{
                console.log('Error in subscription')
            }
        }
    }
    
    const findSubscription = (clubId) => {
        if(user){
            const found = user.membresias.find((membresia) => membresia == clubId);
    
            if(found){
                return true
            }else{
                return false
            }
        }
    }

    const handleGetVideoGamesForClub = async (club) => {
        let games = [];
        await Promise.all(
            club.videojuegos.map(async (gameId) => {
                const videogame = await getVideogameById(gameId);
                if (videogame) {
                    games.push(videogame);
                }
            })
        );
        setClubGames(games);
    }

    const handleGoBack = () => {
        navigate('/clubs', {replace: true})
    }

  return (
    <div className="club__container">
        <div className="club__wrapper">
            <div className='club__content'>
                <div className='club__clubcard__banner'>
                    <GiGriffinShield size={120} color='#3A9E57'/>
                    <div className='club__header'>
                        <FaChevronLeft size={30} color='#FFF' onClick={handleGoBack}/>
                    </div>
                </div>
                <div className='club__clubcard__info'>
                    <div className='flex-space-between pb-10'>
                        <p className='modal__game__title'>
                            {club?.nombre}
                        </p>
                        {findSubscription(club?.Id) ? (
                            <button className='btn__unsubscribe' onClick={() => handleUnsubscribeToClub(club?.Id)}>Unsubscribe</button>
                        ): (
                            <button className='btn__subscribe' onClick={() => handleSubscribeToClub(club?.Id)}>Subscribe</button>
                        )}
                    </div>
                    <p className='modal__game__description'>{club?.descripcion}</p>
                    <p>Videogames in the club</p>
                    <div className='clubs__list'>
                        {clubGames.length > 0 && clubGames.map((clubGame, index)=> (
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