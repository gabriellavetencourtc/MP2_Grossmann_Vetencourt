import React, { useEffect, useState } from 'react'
import './Clubs.css'
import { getAllClubs } from '../../controllers/clubs';
import ClubCard from '../../components/ClubCard/ClubCard';
import { CiSearch } from 'react-icons/ci';
import { useUser } from '../../context/user';
import { useNavigate } from 'react-router-dom';


function Clubs() {
    const [clubsList, setClubsList] = useState([])
    const [filterClubsList, setFilterClubsList] = useState([])

    const { user } = useUser();

    const navigate = useNavigate();

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if(!user){
            navigate('/login')
        }
        const handleGetClubs = async () => {
            const clubs = await getAllClubs();
    
            if (clubs.length > 0) {
                setClubsList(clubs);
                setFilterClubsList(clubs)
            }
        };
    
        handleGetClubs();
    }, [user]);
    

   const handleFilter = (value) => {
    const filteredClubs = clubsList.filter(club =>
        club.nombre.toLowerCase().includes(value.toLowerCase())
    );

    setFilterClubsList(filteredClubs)
   } 

  return (
    <div className='clubs__container'>
        <div className='clubs__header'>
            <p>Clubs</p>
            <div className='search_bar_wrapper'>
                <CiSearch size={24} color='#3A9E57'/>
                <input placeholder='search for a club...' className='search_bar' onChange={(e) => handleFilter(e.target.value)}/>
            </div>

        </div>
        <div className='clubs__list'>
            {filterClubsList?.length > 0 && filterClubsList?.map((club, index)=> (
                <ClubCard key={index} club={club} />
            ))}
        </div>
    </div>
  )
}

export default Clubs