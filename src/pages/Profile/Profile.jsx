import React, { useEffect, useState } from 'react'
import './Profile.css'
import { IoPersonCircle } from "react-icons/io5";
import { useUser } from '../../context/user';
import { useNavigate } from 'react-router-dom';
import { addNewMembership, removeMembership, updateUser } from '../../controllers/auth';
import { getClubById } from '../../controllers/clubs';

function Profile() {

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [favVideoGame, setFavVideoGame] = useState('')
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [memberships, setMemberships] = useState([])
    const [membershipsClubData, setMembershipsClubData] = useState([])

    const [enableEdit, setEnableEdit] = useState(true);

    const { user } = useUser();

    const navigate = useNavigate();

    useEffect(() => {
      if(user){
        setName(user.nombre)
        setLastName(user.apellido)
        setFavVideoGame(user.videojuego_preferido)
        setUserName(user.username)
        setEmail(user.email)
        setMemberships(user.membresias)

        const handleGetClubsForMemberships = async (userMemberships) => {
            let memberships = [];
            await Promise.all(
                userMemberships.map(async (membershipId) => {
                    const membership = await getClubById(membershipId);
                    if (membership) {
                        memberships.push(membership);
                    }
                })
            );
            setMembershipsClubData(memberships);
        }

        handleGetClubsForMemberships(user.membresias)

      }else{
        navigate('/login')
      }
    }, [user])
    
    const handleUpdateProfile = async () => {
        const success = await updateUser(user.uid, {
            nombre: name, 
            apellido: lastName,
            videojuego_preferido: favVideoGame,
            username: username,
        })

        if (success) {
            alert('Profile updated successfully')
            setEnableEdit(true)
        }else{
            alert('Error updating profile')
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
    const handleSubscribeToClub = async (clubId) => {
        if(user){
            const result = await addNewMembership(user.uid, clubId)
            if(result){
                alert('Successfully subscribed!!')
            }else{
                console.log('Error in subscription')
            }
        }
    }
    const handleUnsubscribeToClub = async (clubId) => {
        if(user){
            const result = await removeMembership(user.uid, clubId)
            if(result){
                console.log('Unsubscribed')
            }else{
                console.log('Error in subscription')
            }
        }
    }

  return (
    <div className='profile__container'>
        <IoPersonCircle size={160} color='#F9F9F9'/>
        <div className='profile__card'>
            <div className='profile__info'>
                <div className='field__wrapper'>
                    <p className='label'>Email</p>
                    <input placeholder='example@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} disabled={true}/>
                </div>
                <div className='field__wrapper'>
                    <p className='label'>Name</p>
                    <input placeholder='Jane' value={name} onChange={(e) => setName(e.target.value)} disabled={enableEdit}/>
                </div>
                <div className='field__wrapper'>
                    <p className='label'>Last Name</p>
                    <input placeholder='Doe' value={lastName} onChange={(e) => setLastName(e.target.value)} disabled={enableEdit}/>
                </div>
                <div className='field__wrapper'>
                    <p className='label'>Username</p>
                    <input placeholder='janedoe123' value={username} onChange={(e) => setUserName(e.target.value)} disabled={enableEdit}/>
                </div>
                <div className='field__wrapper'>
                    <p className='label'>Favorite Video Game</p>
                    <input placeholder='Call of Duty' value={favVideoGame} onChange={(e) => setFavVideoGame(e.target.value)} disabled={enableEdit}/>
                </div>
                <div className='field__wrapper'>
                    <p className='memberships__title'>Membresias</p>
                    <div className='memberships__list'>
                        {membershipsClubData && membershipsClubData.map((club, index) => (
                            <div key={index} className='membership__item'>
                                <p className='membership__club__name'>{club.nombre}</p>
                                {findSubscription(club.Id) ? (
                                    <button className='modal__unsubscribe' onClick={() => handleUnsubscribeToClub(club.Id)}>Unsubscribe</button>
                                ): (
                                    <button className='modal__subscribe' onClick={() => handleSubscribeToClub(club.Id)}>Subscribe</button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='flex-space-between'>
                <button className='profile__edit__btn' onClick={()=> setEnableEdit(!enableEdit)}>{enableEdit ?  'Edit' : 'Disable'}</button>
                {!enableEdit && (
                    <button className='profile__update__btn' onClick={handleUpdateProfile}>Update</button>
                )}
            </div>
        </div>
    </div>
  )
}

export default Profile