import React, { useEffect, useState } from 'react'
import './Clubs.css'
import { getAllClubs } from '../../controllers/clubs';
import ClubCard from '../../components/ClubCard/ClubCard';
import { CiSearch } from 'react-icons/ci';
import { IoMdClose } from "react-icons/io";
import { GiGriffinShield } from 'react-icons/gi';


function Clubs() {
    const [clubsList, setClubsList] = useState([])
    const [filterClubsList, setFilterClubsList] = useState([])

    const [showModal, setShowModal] = useState(false);
    const [selectedClub, setSelectedClub] = useState(null);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const handleGetClubs = async () => {
            const clubs = await getAllClubs();
    
            if (clubs.length > 0) {
                setClubsList(clubs);
                setFilterClubsList(clubs)
            }
        };
    
        handleGetClubs();
    }, []);
    

   const handleFilter = (value) => {
    const filteredClubs = clubsList.filter(club =>
        club.nombre.toLowerCase().includes(value.toLowerCase())
    );

    setFilterClubsList(filteredClubs)
   } 

  return (
    <div className='clubs__container'>
        <div className='clubs__header'>
            <p>Videogames</p>
            <div className='search_bar_wrapper'>
                <CiSearch size={24} color='#3A9E57'/>
                <input placeholder='search for a club...' className='search_bar' onChange={(e) => handleFilter(e.target.value)}/>
            </div>

        </div>
        <div className='clubs__list'>
            {filterClubsList.length > 0 && filterClubsList.map((club, index)=> (
                <ClubCard key={index} club={club} setShowModal={setShowModal} setSelectedClub={setSelectedClub}/>
            ))}
        </div>

        {showModal && (
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
                                <button className='modal__subscribe'>Subscribe</button>
                            </div>
                            <p className='modal__game__description'>{selectedClub?.descripcion}</p>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </div>
  )
}

export default Clubs